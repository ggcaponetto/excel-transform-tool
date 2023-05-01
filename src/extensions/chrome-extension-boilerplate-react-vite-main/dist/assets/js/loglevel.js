import { c as commonjsGlobal } from "./_commonjsHelpers.js";
var loglevel = { exports: {} };
(function(module) {
  (function(root, definition) {
    if (module.exports) {
      module.exports = definition();
    } else {
      root.log = definition();
    }
  })(commonjsGlobal, function() {
    var noop = function() {
    };
    var undefinedType = "undefined";
    var isIE = typeof window !== undefinedType && typeof window.navigator !== undefinedType && /Trident\/|MSIE /.test(window.navigator.userAgent);
    var logMethods = [
      "trace",
      "debug",
      "info",
      "warn",
      "error"
    ];
    function bindMethod(obj, methodName) {
      var method = obj[methodName];
      if (typeof method.bind === "function") {
        return method.bind(obj);
      } else {
        try {
          return Function.prototype.bind.call(method, obj);
        } catch (e) {
          return function() {
            return Function.prototype.apply.apply(method, [obj, arguments]);
          };
        }
      }
    }
    function traceForIE() {
      if (console.log) {
        if (console.log.apply) {
          console.log.apply(console, arguments);
        } else {
          Function.prototype.apply.apply(console.log, [console, arguments]);
        }
      }
      if (console.trace)
        console.trace();
    }
    function realMethod(methodName) {
      if (methodName === "debug") {
        methodName = "log";
      }
      if (typeof console === undefinedType) {
        return false;
      } else if (methodName === "trace" && isIE) {
        return traceForIE;
      } else if (console[methodName] !== void 0) {
        return bindMethod(console, methodName);
      } else if (console.log !== void 0) {
        return bindMethod(console, "log");
      } else {
        return noop;
      }
    }
    function replaceLoggingMethods(level, loggerName) {
      for (var i = 0; i < logMethods.length; i++) {
        var methodName = logMethods[i];
        this[methodName] = i < level ? noop : this.methodFactory(methodName, level, loggerName);
      }
      this.log = this.debug;
    }
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
      return function() {
        if (typeof console !== undefinedType) {
          replaceLoggingMethods.call(this, level, loggerName);
          this[methodName].apply(this, arguments);
        }
      };
    }
    function defaultMethodFactory(methodName, level, loggerName) {
      return realMethod(methodName) || enableLoggingWhenConsoleArrives.apply(this, arguments);
    }
    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;
      defaultLevel = defaultLevel == null ? "WARN" : defaultLevel;
      var storageKey = "loglevel";
      if (typeof name === "string") {
        storageKey += ":" + name;
      } else if (typeof name === "symbol") {
        storageKey = void 0;
      }
      function persistLevelIfPossible(levelNum) {
        var levelName = (logMethods[levelNum] || "silent").toUpperCase();
        if (typeof window === undefinedType || !storageKey)
          return;
        try {
          window.localStorage[storageKey] = levelName;
          return;
        } catch (ignore) {
        }
        try {
          window.document.cookie = encodeURIComponent(storageKey) + "=" + levelName + ";";
        } catch (ignore) {
        }
      }
      function getPersistedLevel() {
        var storedLevel;
        if (typeof window === undefinedType || !storageKey)
          return;
        try {
          storedLevel = window.localStorage[storageKey];
        } catch (ignore) {
        }
        if (typeof storedLevel === undefinedType) {
          try {
            var cookie = window.document.cookie;
            var location = cookie.indexOf(
              encodeURIComponent(storageKey) + "="
            );
            if (location !== -1) {
              storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
            }
          } catch (ignore) {
          }
        }
        if (self.levels[storedLevel] === void 0) {
          storedLevel = void 0;
        }
        return storedLevel;
      }
      function clearPersistedLevel() {
        if (typeof window === undefinedType || !storageKey)
          return;
        try {
          window.localStorage.removeItem(storageKey);
          return;
        } catch (ignore) {
        }
        try {
          window.document.cookie = encodeURIComponent(storageKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        } catch (ignore) {
        }
      }
      self.name = name;
      self.levels = {
        "TRACE": 0,
        "DEBUG": 1,
        "INFO": 2,
        "WARN": 3,
        "ERROR": 4,
        "SILENT": 5
      };
      self.methodFactory = factory || defaultMethodFactory;
      self.getLevel = function() {
        return currentLevel;
      };
      self.setLevel = function(level, persist) {
        if (typeof level === "string" && self.levels[level.toUpperCase()] !== void 0) {
          level = self.levels[level.toUpperCase()];
        }
        if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
          currentLevel = level;
          if (persist !== false) {
            persistLevelIfPossible(level);
          }
          replaceLoggingMethods.call(self, level, name);
          if (typeof console === undefinedType && level < self.levels.SILENT) {
            return "No console available for logging";
          }
        } else {
          throw "log.setLevel() called with invalid level: " + level;
        }
      };
      self.setDefaultLevel = function(level) {
        defaultLevel = level;
        if (!getPersistedLevel()) {
          self.setLevel(level, false);
        }
      };
      self.resetLevel = function() {
        self.setLevel(defaultLevel, false);
        clearPersistedLevel();
      };
      self.enableAll = function(persist) {
        self.setLevel(self.levels.TRACE, persist);
      };
      self.disableAll = function(persist) {
        self.setLevel(self.levels.SILENT, persist);
      };
      var initialLevel = getPersistedLevel();
      if (initialLevel == null) {
        initialLevel = defaultLevel;
      }
      self.setLevel(initialLevel, false);
    }
    var defaultLogger = new Logger();
    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
      if (typeof name !== "symbol" && typeof name !== "string" || name === "") {
        throw new TypeError("You must supply a name when creating a logger.");
      }
      var logger = _loggersByName[name];
      if (!logger) {
        logger = _loggersByName[name] = new Logger(
          name,
          defaultLogger.getLevel(),
          defaultLogger.methodFactory
        );
      }
      return logger;
    };
    var _log = typeof window !== undefinedType ? window.log : void 0;
    defaultLogger.noConflict = function() {
      if (typeof window !== undefinedType && window.log === defaultLogger) {
        window.log = _log;
      }
      return defaultLogger;
    };
    defaultLogger.getLoggers = function getLoggers() {
      return _loggersByName;
    };
    defaultLogger["default"] = defaultLogger;
    return defaultLogger;
  });
})(loglevel);
export {
  loglevel as l
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nbGV2ZWwuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2dsZXZlbC9saWIvbG9nbGV2ZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiogbG9nbGV2ZWwgLSBodHRwczovL2dpdGh1Yi5jb20vcGltdGVycnkvbG9nbGV2ZWxcbipcbiogQ29weXJpZ2h0IChjKSAyMDEzIFRpbSBQZXJyeVxuKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4qL1xuKGZ1bmN0aW9uIChyb290LCBkZWZpbml0aW9uKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoZGVmaW5pdGlvbik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290LmxvZyA9IGRlZmluaXRpb24oKTtcbiAgICB9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8vIFNsaWdodGx5IGR1YmlvdXMgdHJpY2tzIHRvIGN1dCBkb3duIG1pbmltaXplZCBmaWxlIHNpemVcbiAgICB2YXIgbm9vcCA9IGZ1bmN0aW9uKCkge307XG4gICAgdmFyIHVuZGVmaW5lZFR5cGUgPSBcInVuZGVmaW5lZFwiO1xuICAgIHZhciBpc0lFID0gKHR5cGVvZiB3aW5kb3cgIT09IHVuZGVmaW5lZFR5cGUpICYmICh0eXBlb2Ygd2luZG93Lm5hdmlnYXRvciAhPT0gdW5kZWZpbmVkVHlwZSkgJiYgKFxuICAgICAgICAvVHJpZGVudFxcL3xNU0lFIC8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICApO1xuXG4gICAgdmFyIGxvZ01ldGhvZHMgPSBbXG4gICAgICAgIFwidHJhY2VcIixcbiAgICAgICAgXCJkZWJ1Z1wiLFxuICAgICAgICBcImluZm9cIixcbiAgICAgICAgXCJ3YXJuXCIsXG4gICAgICAgIFwiZXJyb3JcIlxuICAgIF07XG5cbiAgICAvLyBDcm9zcy1icm93c2VyIGJpbmQgZXF1aXZhbGVudCB0aGF0IHdvcmtzIGF0IGxlYXN0IGJhY2sgdG8gSUU2XG4gICAgZnVuY3Rpb24gYmluZE1ldGhvZChvYmosIG1ldGhvZE5hbWUpIHtcbiAgICAgICAgdmFyIG1ldGhvZCA9IG9ialttZXRob2ROYW1lXTtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXRob2QuYmluZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5iaW5kKG9iaik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5jYWxsKG1ldGhvZCwgb2JqKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAvLyBNaXNzaW5nIGJpbmQgc2hpbSBvciBJRTggKyBNb2Rlcm5penIsIGZhbGxiYWNrIHRvIHdyYXBwaW5nXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmFwcGx5KG1ldGhvZCwgW29iaiwgYXJndW1lbnRzXSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRyYWNlKCkgZG9lc24ndCBwcmludCB0aGUgbWVzc2FnZSBpbiBJRSwgc28gZm9yIHRoYXQgY2FzZSB3ZSBuZWVkIHRvIHdyYXAgaXRcbiAgICBmdW5jdGlvbiB0cmFjZUZvcklFKCkge1xuICAgICAgICBpZiAoY29uc29sZS5sb2cpIHtcbiAgICAgICAgICAgIGlmIChjb25zb2xlLmxvZy5hcHBseSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEluIG9sZCBJRSwgbmF0aXZlIGNvbnNvbGUgbWV0aG9kcyB0aGVtc2VsdmVzIGRvbid0IGhhdmUgYXBwbHkoKS5cbiAgICAgICAgICAgICAgICBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuYXBwbHkoY29uc29sZS5sb2csIFtjb25zb2xlLCBhcmd1bWVudHNdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uc29sZS50cmFjZSkgY29uc29sZS50cmFjZSgpO1xuICAgIH1cblxuICAgIC8vIEJ1aWxkIHRoZSBiZXN0IGxvZ2dpbmcgbWV0aG9kIHBvc3NpYmxlIGZvciB0aGlzIGVudlxuICAgIC8vIFdoZXJldmVyIHBvc3NpYmxlIHdlIHdhbnQgdG8gYmluZCwgbm90IHdyYXAsIHRvIHByZXNlcnZlIHN0YWNrIHRyYWNlc1xuICAgIGZ1bmN0aW9uIHJlYWxNZXRob2QobWV0aG9kTmFtZSkge1xuICAgICAgICBpZiAobWV0aG9kTmFtZSA9PT0gJ2RlYnVnJykge1xuICAgICAgICAgICAgbWV0aG9kTmFtZSA9ICdsb2cnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlID09PSB1bmRlZmluZWRUeXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIE5vIG1ldGhvZCBwb3NzaWJsZSwgZm9yIG5vdyAtIGZpeGVkIGxhdGVyIGJ5IGVuYWJsZUxvZ2dpbmdXaGVuQ29uc29sZUFycml2ZXNcbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2ROYW1lID09PSAndHJhY2UnICYmIGlzSUUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cmFjZUZvcklFO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnNvbGVbbWV0aG9kTmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmRNZXRob2QoY29uc29sZSwgbWV0aG9kTmFtZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uc29sZS5sb2cgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmRNZXRob2QoY29uc29sZSwgJ2xvZycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5vb3A7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUaGVzZSBwcml2YXRlIGZ1bmN0aW9ucyBhbHdheXMgbmVlZCBgdGhpc2AgdG8gYmUgc2V0IHByb3Blcmx5XG5cbiAgICBmdW5jdGlvbiByZXBsYWNlTG9nZ2luZ01ldGhvZHMobGV2ZWwsIGxvZ2dlck5hbWUpIHtcbiAgICAgICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2dNZXRob2RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kTmFtZSA9IGxvZ01ldGhvZHNbaV07XG4gICAgICAgICAgICB0aGlzW21ldGhvZE5hbWVdID0gKGkgPCBsZXZlbCkgP1xuICAgICAgICAgICAgICAgIG5vb3AgOlxuICAgICAgICAgICAgICAgIHRoaXMubWV0aG9kRmFjdG9yeShtZXRob2ROYW1lLCBsZXZlbCwgbG9nZ2VyTmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZWZpbmUgbG9nLmxvZyBhcyBhbiBhbGlhcyBmb3IgbG9nLmRlYnVnXG4gICAgICAgIHRoaXMubG9nID0gdGhpcy5kZWJ1ZztcbiAgICB9XG5cbiAgICAvLyBJbiBvbGQgSUUgdmVyc2lvbnMsIHRoZSBjb25zb2xlIGlzbid0IHByZXNlbnQgdW50aWwgeW91IGZpcnN0IG9wZW4gaXQuXG4gICAgLy8gV2UgYnVpbGQgcmVhbE1ldGhvZCgpIHJlcGxhY2VtZW50cyBoZXJlIHRoYXQgcmVnZW5lcmF0ZSBsb2dnaW5nIG1ldGhvZHNcbiAgICBmdW5jdGlvbiBlbmFibGVMb2dnaW5nV2hlbkNvbnNvbGVBcnJpdmVzKG1ldGhvZE5hbWUsIGxldmVsLCBsb2dnZXJOYW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IHVuZGVmaW5lZFR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXBsYWNlTG9nZ2luZ01ldGhvZHMuY2FsbCh0aGlzLCBsZXZlbCwgbG9nZ2VyTmFtZSk7XG4gICAgICAgICAgICAgICAgdGhpc1ttZXRob2ROYW1lXS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIEJ5IGRlZmF1bHQsIHdlIHVzZSBjbG9zZWx5IGJvdW5kIHJlYWwgbWV0aG9kcyB3aGVyZXZlciBwb3NzaWJsZSwgYW5kXG4gICAgLy8gb3RoZXJ3aXNlIHdlIHdhaXQgZm9yIGEgY29uc29sZSB0byBhcHBlYXIsIGFuZCB0aGVuIHRyeSBhZ2Fpbi5cbiAgICBmdW5jdGlvbiBkZWZhdWx0TWV0aG9kRmFjdG9yeShtZXRob2ROYW1lLCBsZXZlbCwgbG9nZ2VyTmFtZSkge1xuICAgICAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICAgICAgICByZXR1cm4gcmVhbE1ldGhvZChtZXRob2ROYW1lKSB8fFxuICAgICAgICAgICAgICAgZW5hYmxlTG9nZ2luZ1doZW5Db25zb2xlQXJyaXZlcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIExvZ2dlcihuYW1lLCBkZWZhdWx0TGV2ZWwsIGZhY3RvcnkpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciBjdXJyZW50TGV2ZWw7XG4gICAgICBkZWZhdWx0TGV2ZWwgPSBkZWZhdWx0TGV2ZWwgPT0gbnVsbCA/IFwiV0FSTlwiIDogZGVmYXVsdExldmVsO1xuXG4gICAgICB2YXIgc3RvcmFnZUtleSA9IFwibG9nbGV2ZWxcIjtcbiAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBzdG9yYWdlS2V5ICs9IFwiOlwiICsgbmFtZTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIHtcbiAgICAgICAgc3RvcmFnZUtleSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcGVyc2lzdExldmVsSWZQb3NzaWJsZShsZXZlbE51bSkge1xuICAgICAgICAgIHZhciBsZXZlbE5hbWUgPSAobG9nTWV0aG9kc1tsZXZlbE51bV0gfHwgJ3NpbGVudCcpLnRvVXBwZXJDYXNlKCk7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gdW5kZWZpbmVkVHlwZSB8fCAhc3RvcmFnZUtleSkgcmV0dXJuO1xuXG4gICAgICAgICAgLy8gVXNlIGxvY2FsU3RvcmFnZSBpZiBhdmFpbGFibGVcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlW3N0b3JhZ2VLZXldID0gbGV2ZWxOYW1lO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfSBjYXRjaCAoaWdub3JlKSB7fVxuXG4gICAgICAgICAgLy8gVXNlIHNlc3Npb24gY29va2llIGFzIGZhbGxiYWNrXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmNvb2tpZSA9XG4gICAgICAgICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHN0b3JhZ2VLZXkpICsgXCI9XCIgKyBsZXZlbE5hbWUgKyBcIjtcIjtcbiAgICAgICAgICB9IGNhdGNoIChpZ25vcmUpIHt9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdldFBlcnNpc3RlZExldmVsKCkge1xuICAgICAgICAgIHZhciBzdG9yZWRMZXZlbDtcblxuICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSB1bmRlZmluZWRUeXBlIHx8ICFzdG9yYWdlS2V5KSByZXR1cm47XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBzdG9yZWRMZXZlbCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2Vbc3RvcmFnZUtleV07XG4gICAgICAgICAgfSBjYXRjaCAoaWdub3JlKSB7fVxuXG4gICAgICAgICAgLy8gRmFsbGJhY2sgdG8gY29va2llcyBpZiBsb2NhbCBzdG9yYWdlIGdpdmVzIHVzIG5vdGhpbmdcbiAgICAgICAgICBpZiAodHlwZW9mIHN0b3JlZExldmVsID09PSB1bmRlZmluZWRUeXBlKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICB2YXIgY29va2llID0gd2luZG93LmRvY3VtZW50LmNvb2tpZTtcbiAgICAgICAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IGNvb2tpZS5pbmRleE9mKFxuICAgICAgICAgICAgICAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzdG9yYWdlS2V5KSArIFwiPVwiKTtcbiAgICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbiAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdG9yZWRMZXZlbCA9IC9eKFteO10rKS8uZXhlYyhjb29raWUuc2xpY2UobG9jYXRpb24pKVsxXTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBjYXRjaCAoaWdub3JlKSB7fVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIElmIHRoZSBzdG9yZWQgbGV2ZWwgaXMgbm90IHZhbGlkLCB0cmVhdCBpdCBhcyBpZiBub3RoaW5nIHdhcyBzdG9yZWQuXG4gICAgICAgICAgaWYgKHNlbGYubGV2ZWxzW3N0b3JlZExldmVsXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHN0b3JlZExldmVsID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBzdG9yZWRMZXZlbDtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY2xlYXJQZXJzaXN0ZWRMZXZlbCgpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gdW5kZWZpbmVkVHlwZSB8fCAhc3RvcmFnZUtleSkgcmV0dXJuO1xuXG4gICAgICAgICAgLy8gVXNlIGxvY2FsU3RvcmFnZSBpZiBhdmFpbGFibGVcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oc3RvcmFnZUtleSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9IGNhdGNoIChpZ25vcmUpIHt9XG5cbiAgICAgICAgICAvLyBVc2Ugc2Vzc2lvbiBjb29raWUgYXMgZmFsbGJhY2tcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuY29va2llID1cbiAgICAgICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoc3RvcmFnZUtleSkgKyBcIj07IGV4cGlyZXM9VGh1LCAwMSBKYW4gMTk3MCAwMDowMDowMCBVVENcIjtcbiAgICAgICAgICB9IGNhdGNoIChpZ25vcmUpIHt9XG4gICAgICB9XG5cbiAgICAgIC8qXG4gICAgICAgKlxuICAgICAgICogUHVibGljIGxvZ2dlciBBUEkgLSBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3BpbXRlcnJ5L2xvZ2xldmVsIGZvciBkZXRhaWxzXG4gICAgICAgKlxuICAgICAgICovXG5cbiAgICAgIHNlbGYubmFtZSA9IG5hbWU7XG5cbiAgICAgIHNlbGYubGV2ZWxzID0geyBcIlRSQUNFXCI6IDAsIFwiREVCVUdcIjogMSwgXCJJTkZPXCI6IDIsIFwiV0FSTlwiOiAzLFxuICAgICAgICAgIFwiRVJST1JcIjogNCwgXCJTSUxFTlRcIjogNX07XG5cbiAgICAgIHNlbGYubWV0aG9kRmFjdG9yeSA9IGZhY3RvcnkgfHwgZGVmYXVsdE1ldGhvZEZhY3Rvcnk7XG5cbiAgICAgIHNlbGYuZ2V0TGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGN1cnJlbnRMZXZlbDtcbiAgICAgIH07XG5cbiAgICAgIHNlbGYuc2V0TGV2ZWwgPSBmdW5jdGlvbiAobGV2ZWwsIHBlcnNpc3QpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGxldmVsID09PSBcInN0cmluZ1wiICYmIHNlbGYubGV2ZWxzW2xldmVsLnRvVXBwZXJDYXNlKCldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgbGV2ZWwgPSBzZWxmLmxldmVsc1tsZXZlbC50b1VwcGVyQ2FzZSgpXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHR5cGVvZiBsZXZlbCA9PT0gXCJudW1iZXJcIiAmJiBsZXZlbCA+PSAwICYmIGxldmVsIDw9IHNlbGYubGV2ZWxzLlNJTEVOVCkge1xuICAgICAgICAgICAgICBjdXJyZW50TGV2ZWwgPSBsZXZlbDtcbiAgICAgICAgICAgICAgaWYgKHBlcnNpc3QgIT09IGZhbHNlKSB7ICAvLyBkZWZhdWx0cyB0byB0cnVlXG4gICAgICAgICAgICAgICAgICBwZXJzaXN0TGV2ZWxJZlBvc3NpYmxlKGxldmVsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXBsYWNlTG9nZ2luZ01ldGhvZHMuY2FsbChzZWxmLCBsZXZlbCwgbmFtZSk7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZSA9PT0gdW5kZWZpbmVkVHlwZSAmJiBsZXZlbCA8IHNlbGYubGV2ZWxzLlNJTEVOVCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTm8gY29uc29sZSBhdmFpbGFibGUgZm9yIGxvZ2dpbmdcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRocm93IFwibG9nLnNldExldmVsKCkgY2FsbGVkIHdpdGggaW52YWxpZCBsZXZlbDogXCIgKyBsZXZlbDtcbiAgICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBzZWxmLnNldERlZmF1bHRMZXZlbCA9IGZ1bmN0aW9uIChsZXZlbCkge1xuICAgICAgICAgIGRlZmF1bHRMZXZlbCA9IGxldmVsO1xuICAgICAgICAgIGlmICghZ2V0UGVyc2lzdGVkTGV2ZWwoKSkge1xuICAgICAgICAgICAgICBzZWxmLnNldExldmVsKGxldmVsLCBmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgc2VsZi5yZXNldExldmVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYuc2V0TGV2ZWwoZGVmYXVsdExldmVsLCBmYWxzZSk7XG4gICAgICAgICAgY2xlYXJQZXJzaXN0ZWRMZXZlbCgpO1xuICAgICAgfTtcblxuICAgICAgc2VsZi5lbmFibGVBbGwgPSBmdW5jdGlvbihwZXJzaXN0KSB7XG4gICAgICAgICAgc2VsZi5zZXRMZXZlbChzZWxmLmxldmVscy5UUkFDRSwgcGVyc2lzdCk7XG4gICAgICB9O1xuXG4gICAgICBzZWxmLmRpc2FibGVBbGwgPSBmdW5jdGlvbihwZXJzaXN0KSB7XG4gICAgICAgICAgc2VsZi5zZXRMZXZlbChzZWxmLmxldmVscy5TSUxFTlQsIHBlcnNpc3QpO1xuICAgICAgfTtcblxuICAgICAgLy8gSW5pdGlhbGl6ZSB3aXRoIHRoZSByaWdodCBsZXZlbFxuICAgICAgdmFyIGluaXRpYWxMZXZlbCA9IGdldFBlcnNpc3RlZExldmVsKCk7XG4gICAgICBpZiAoaW5pdGlhbExldmVsID09IG51bGwpIHtcbiAgICAgICAgICBpbml0aWFsTGV2ZWwgPSBkZWZhdWx0TGV2ZWw7XG4gICAgICB9XG4gICAgICBzZWxmLnNldExldmVsKGluaXRpYWxMZXZlbCwgZmFsc2UpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICpcbiAgICAgKiBUb3AtbGV2ZWwgQVBJXG4gICAgICpcbiAgICAgKi9cblxuICAgIHZhciBkZWZhdWx0TG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuXG4gICAgdmFyIF9sb2dnZXJzQnlOYW1lID0ge307XG4gICAgZGVmYXVsdExvZ2dlci5nZXRMb2dnZXIgPSBmdW5jdGlvbiBnZXRMb2dnZXIobmFtZSkge1xuICAgICAgICBpZiAoKHR5cGVvZiBuYW1lICE9PSBcInN5bWJvbFwiICYmIHR5cGVvZiBuYW1lICE9PSBcInN0cmluZ1wiKSB8fCBuYW1lID09PSBcIlwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIllvdSBtdXN0IHN1cHBseSBhIG5hbWUgd2hlbiBjcmVhdGluZyBhIGxvZ2dlci5cIik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbG9nZ2VyID0gX2xvZ2dlcnNCeU5hbWVbbmFtZV07XG4gICAgICAgIGlmICghbG9nZ2VyKSB7XG4gICAgICAgICAgbG9nZ2VyID0gX2xvZ2dlcnNCeU5hbWVbbmFtZV0gPSBuZXcgTG9nZ2VyKFxuICAgICAgICAgICAgbmFtZSwgZGVmYXVsdExvZ2dlci5nZXRMZXZlbCgpLCBkZWZhdWx0TG9nZ2VyLm1ldGhvZEZhY3RvcnkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsb2dnZXI7XG4gICAgfTtcblxuICAgIC8vIEdyYWIgdGhlIGN1cnJlbnQgZ2xvYmFsIGxvZyB2YXJpYWJsZSBpbiBjYXNlIG9mIG92ZXJ3cml0ZVxuICAgIHZhciBfbG9nID0gKHR5cGVvZiB3aW5kb3cgIT09IHVuZGVmaW5lZFR5cGUpID8gd2luZG93LmxvZyA6IHVuZGVmaW5lZDtcbiAgICBkZWZhdWx0TG9nZ2VyLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IHVuZGVmaW5lZFR5cGUgJiZcbiAgICAgICAgICAgICAgIHdpbmRvdy5sb2cgPT09IGRlZmF1bHRMb2dnZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2cgPSBfbG9nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlZmF1bHRMb2dnZXI7XG4gICAgfTtcblxuICAgIGRlZmF1bHRMb2dnZXIuZ2V0TG9nZ2VycyA9IGZ1bmN0aW9uIGdldExvZ2dlcnMoKSB7XG4gICAgICAgIHJldHVybiBfbG9nZ2Vyc0J5TmFtZTtcbiAgICB9O1xuXG4gICAgLy8gRVM2IGRlZmF1bHQgZXhwb3J0LCBmb3IgY29tcGF0aWJpbGl0eVxuICAgIGRlZmF1bHRMb2dnZXJbJ2RlZmF1bHQnXSA9IGRlZmF1bHRMb2dnZXI7XG5cbiAgICByZXR1cm4gZGVmYXVsdExvZ2dlcjtcbn0pKTtcbiJdLCJuYW1lcyI6WyJ0aGlzIl0sIm1hcHBpbmdzIjoiOzs7QUFNQSxHQUFDLFNBQVUsTUFBTSxZQUFZO0FBSWxCLFFBQWtDLE9BQU8sU0FBUztBQUNyRCxhQUFBLFVBQWlCO0lBQ3pCLE9BQVc7QUFDSCxXQUFLLE1BQU07SUFDZDtBQUFBLEVBQ0osR0FBQ0EsZ0JBQU0sV0FBWTtBQUloQixRQUFJLE9BQU8sV0FBVztBQUFBO0FBQ3RCLFFBQUksZ0JBQWdCO0FBQ3BCLFFBQUksT0FBUSxPQUFPLFdBQVcsaUJBQW1CLE9BQU8sT0FBTyxjQUFjLGlCQUN6RSxrQkFBa0IsS0FBSyxPQUFPLFVBQVUsU0FBUztBQUdyRCxRQUFJLGFBQWE7QUFBQSxNQUNiO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ1I7QUFHSSxhQUFTLFdBQVcsS0FBSyxZQUFZO0FBQ2pDLFVBQUksU0FBUyxJQUFJO0FBQ2pCLFVBQUksT0FBTyxPQUFPLFNBQVMsWUFBWTtBQUNuQyxlQUFPLE9BQU8sS0FBSyxHQUFHO0FBQUEsTUFDbEMsT0FBZTtBQUNILFlBQUk7QUFDQSxpQkFBTyxTQUFTLFVBQVUsS0FBSyxLQUFLLFFBQVEsR0FBRztBQUFBLFFBQ2xELFNBQVEsR0FBUDtBQUVFLGlCQUFPLFdBQVc7QUFDZCxtQkFBTyxTQUFTLFVBQVUsTUFBTSxNQUFNLFFBQVEsQ0FBQyxLQUFLLFNBQVMsQ0FBQztBQUFBLFVBQ2xGO0FBQUEsUUFDYTtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBR0QsYUFBUyxhQUFhO0FBQ2xCLFVBQUksUUFBUSxLQUFLO0FBQ2IsWUFBSSxRQUFRLElBQUksT0FBTztBQUNuQixrQkFBUSxJQUFJLE1BQU0sU0FBUyxTQUFTO0FBQUEsUUFD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
