import { c as commonjsGlobal } from "./_commonjsHelpers.js";
var browserPolyfill = { exports: {} };
(function(module, exports) {
  (function(global, factory) {
    {
      factory(module);
    }
  })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : commonjsGlobal, function(module2) {
    if (typeof browser === "undefined" || Object.getPrototypeOf(browser) !== Object.prototype) {
      const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
      const SEND_RESPONSE_DEPRECATION_WARNING = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)";
      const wrapAPIs = (extensionAPIs) => {
        const apiMetadata = {
          "alarms": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "clearAll": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getAll": {
              "minArgs": 0,
              "maxArgs": 0
            }
          },
          "bookmarks": {
            "create": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "get": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getChildren": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getRecent": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getSubTree": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getTree": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "move": {
              "minArgs": 2,
              "maxArgs": 2
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removeTree": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "search": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "update": {
              "minArgs": 2,
              "maxArgs": 2
            }
          },
          "browserAction": {
            "disable": {
              "minArgs": 0,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            },
            "enable": {
              "minArgs": 0,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            },
            "getBadgeBackgroundColor": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getBadgeText": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getPopup": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getTitle": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "openPopup": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "setBadgeBackgroundColor": {
              "minArgs": 1,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            },
            "setBadgeText": {
              "minArgs": 1,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            },
            "setIcon": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "setPopup": {
              "minArgs": 1,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            },
            "setTitle": {
              "minArgs": 1,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            }
          },
          "browsingData": {
            "remove": {
              "minArgs": 2,
              "maxArgs": 2
            },
            "removeCache": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removeCookies": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removeDownloads": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removeFormData": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removeHistory": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removeLocalStorage": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removePasswords": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removePluginData": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "settings": {
              "minArgs": 0,
              "maxArgs": 0
            }
          },
          "commands": {
            "getAll": {
              "minArgs": 0,
              "maxArgs": 0
            }
          },
          "contextMenus": {
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removeAll": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "update": {
              "minArgs": 2,
              "maxArgs": 2
            }
          },
          "cookies": {
            "get": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getAll": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getAllCookieStores": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "devtools": {
            "inspectedWindow": {
              "eval": {
                "minArgs": 1,
                "maxArgs": 2,
                "singleCallbackArg": false
              }
            },
            "panels": {
              "create": {
                "minArgs": 3,
                "maxArgs": 3,
                "singleCallbackArg": true
              },
              "elements": {
                "createSidebarPane": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              }
            }
          },
          "downloads": {
            "cancel": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "download": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "erase": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getFileIcon": {
              "minArgs": 1,
              "maxArgs": 2
            },
            "open": {
              "minArgs": 1,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            },
            "pause": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removeFile": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "resume": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "search": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "show": {
              "minArgs": 1,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            }
          },
          "extension": {
            "isAllowedFileSchemeAccess": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "isAllowedIncognitoAccess": {
              "minArgs": 0,
              "maxArgs": 0
            }
          },
          "history": {
            "addUrl": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "deleteAll": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "deleteRange": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "deleteUrl": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getVisits": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "search": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "i18n": {
            "detectLanguage": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getAcceptLanguages": {
              "minArgs": 0,
              "maxArgs": 0
            }
          },
          "identity": {
            "launchWebAuthFlow": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "idle": {
            "queryState": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "management": {
            "get": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getAll": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "getSelf": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "setEnabled": {
              "minArgs": 2,
              "maxArgs": 2
            },
            "uninstallSelf": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "notifications": {
            "clear": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "create": {
              "minArgs": 1,
              "maxArgs": 2
            },
            "getAll": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "getPermissionLevel": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "update": {
              "minArgs": 2,
              "maxArgs": 2
            }
          },
          "pageAction": {
            "getPopup": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getTitle": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "hide": {
              "minArgs": 1,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            },
            "setIcon": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "setPopup": {
              "minArgs": 1,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            },
            "setTitle": {
              "minArgs": 1,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            },
            "show": {
              "minArgs": 1,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            }
          },
          "permissions": {
            "contains": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getAll": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "request": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "runtime": {
            "getBackgroundPage": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "getPlatformInfo": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "openOptionsPage": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "requestUpdateCheck": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "sendMessage": {
              "minArgs": 1,
              "maxArgs": 3
            },
            "sendNativeMessage": {
              "minArgs": 2,
              "maxArgs": 2
            },
            "setUninstallURL": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "sessions": {
            "getDevices": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getRecentlyClosed": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "restore": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "storage": {
            "local": {
              "clear": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "get": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getBytesInUse": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "set": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "managed": {
              "get": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getBytesInUse": {
                "minArgs": 0,
                "maxArgs": 1
              }
            },
            "sync": {
              "clear": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "get": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getBytesInUse": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "set": {
                "minArgs": 1,
                "maxArgs": 1
              }
            }
          },
          "tabs": {
            "captureVisibleTab": {
              "minArgs": 0,
              "maxArgs": 2
            },
            "create": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "detectLanguage": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "discard": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "duplicate": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "executeScript": {
              "minArgs": 1,
              "maxArgs": 2
            },
            "get": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getCurrent": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "getZoom": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getZoomSettings": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "goBack": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "goForward": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "highlight": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "insertCSS": {
              "minArgs": 1,
              "maxArgs": 2
            },
            "move": {
              "minArgs": 2,
              "maxArgs": 2
            },
            "query": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "reload": {
              "minArgs": 0,
              "maxArgs": 2
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removeCSS": {
              "minArgs": 1,
              "maxArgs": 2
            },
            "sendMessage": {
              "minArgs": 2,
              "maxArgs": 3
            },
            "setZoom": {
              "minArgs": 1,
              "maxArgs": 2
            },
            "setZoomSettings": {
              "minArgs": 1,
              "maxArgs": 2
            },
            "update": {
              "minArgs": 1,
              "maxArgs": 2
            }
          },
          "topSites": {
            "get": {
              "minArgs": 0,
              "maxArgs": 0
            }
          },
          "webNavigation": {
            "getAllFrames": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getFrame": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "webRequest": {
            "handlerBehaviorChanged": {
              "minArgs": 0,
              "maxArgs": 0
            }
          },
          "windows": {
            "create": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "get": {
              "minArgs": 1,
              "maxArgs": 2
            },
            "getAll": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getCurrent": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getLastFocused": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "update": {
              "minArgs": 2,
              "maxArgs": 2
            }
          }
        };
        if (Object.keys(apiMetadata).length === 0) {
          throw new Error("api-metadata.json has not been included in browser-polyfill");
        }
        class DefaultWeakMap extends WeakMap {
          constructor(createItem, items = void 0) {
            super(items);
            this.createItem = createItem;
          }
          get(key) {
            if (!this.has(key)) {
              this.set(key, this.createItem(key));
            }
            return super.get(key);
          }
        }
        const isThenable = (value) => {
          return value && typeof value === "object" && typeof value.then === "function";
        };
        const makeCallback = (promise, metadata) => {
          return (...callbackArgs) => {
            if (extensionAPIs.runtime.lastError) {
              promise.reject(extensionAPIs.runtime.lastError);
            } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
              promise.resolve(callbackArgs[0]);
            } else {
              promise.resolve(callbackArgs);
            }
          };
        };
        const pluralizeArguments = (numArgs) => numArgs == 1 ? "argument" : "arguments";
        const wrapAsyncFunction = (name, metadata) => {
          return function asyncFunctionWrapper(target, ...args) {
            if (args.length < metadata.minArgs) {
              throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
            }
            if (args.length > metadata.maxArgs) {
              throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
            }
            return new Promise((resolve, reject) => {
              if (metadata.fallbackToNoCallback) {
                try {
                  target[name](...args, makeCallback({
                    resolve,
                    reject
                  }, metadata));
                } catch (cbError) {
                  console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, cbError);
                  target[name](...args);
                  metadata.fallbackToNoCallback = false;
                  metadata.noCallback = true;
                  resolve();
                }
              } else if (metadata.noCallback) {
                target[name](...args);
                resolve();
              } else {
                target[name](...args, makeCallback({
                  resolve,
                  reject
                }, metadata));
              }
            });
          };
        };
        const wrapMethod = (target, method, wrapper) => {
          return new Proxy(method, {
            apply(targetMethod, thisObj, args) {
              return wrapper.call(thisObj, target, ...args);
            }
          });
        };
        let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
        const wrapObject = (target, wrappers = {}, metadata = {}) => {
          let cache = /* @__PURE__ */ Object.create(null);
          let handlers = {
            has(proxyTarget2, prop) {
              return prop in target || prop in cache;
            },
            get(proxyTarget2, prop, receiver) {
              if (prop in cache) {
                return cache[prop];
              }
              if (!(prop in target)) {
                return void 0;
              }
              let value = target[prop];
              if (typeof value === "function") {
                if (typeof wrappers[prop] === "function") {
                  value = wrapMethod(target, target[prop], wrappers[prop]);
                } else if (hasOwnProperty(metadata, prop)) {
                  let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                  value = wrapMethod(target, target[prop], wrapper);
                } else {
                  value = value.bind(target);
                }
              } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
                value = wrapObject(value, wrappers[prop], metadata[prop]);
              } else if (hasOwnProperty(metadata, "*")) {
                value = wrapObject(value, wrappers[prop], metadata["*"]);
              } else {
                Object.defineProperty(cache, prop, {
                  configurable: true,
                  enumerable: true,
                  get() {
                    return target[prop];
                  },
                  set(value2) {
                    target[prop] = value2;
                  }
                });
                return value;
              }
              cache[prop] = value;
              return value;
            },
            set(proxyTarget2, prop, value, receiver) {
              if (prop in cache) {
                cache[prop] = value;
              } else {
                target[prop] = value;
              }
              return true;
            },
            defineProperty(proxyTarget2, prop, desc) {
              return Reflect.defineProperty(cache, prop, desc);
            },
            deleteProperty(proxyTarget2, prop) {
              return Reflect.deleteProperty(cache, prop);
            }
          };
          let proxyTarget = Object.create(target);
          return new Proxy(proxyTarget, handlers);
        };
        const wrapEvent = (wrapperMap) => ({
          addListener(target, listener, ...args) {
            target.addListener(wrapperMap.get(listener), ...args);
          },
          hasListener(target, listener) {
            return target.hasListener(wrapperMap.get(listener));
          },
          removeListener(target, listener) {
            target.removeListener(wrapperMap.get(listener));
          }
        });
        let loggedSendResponseDeprecationWarning = false;
        const onMessageWrappers = new DefaultWeakMap((listener) => {
          if (typeof listener !== "function") {
            return listener;
          }
          return function onMessage(message, sender, sendResponse) {
            let didCallSendResponse = false;
            let wrappedSendResponse;
            let sendResponsePromise = new Promise((resolve) => {
              wrappedSendResponse = function(response) {
                if (!loggedSendResponseDeprecationWarning) {
                  console.warn(SEND_RESPONSE_DEPRECATION_WARNING, new Error().stack);
                  loggedSendResponseDeprecationWarning = true;
                }
                didCallSendResponse = true;
                resolve(response);
              };
            });
            let result;
            try {
              result = listener(message, sender, wrappedSendResponse);
            } catch (err) {
              result = Promise.reject(err);
            }
            const isResultThenable = result !== true && isThenable(result);
            if (result !== true && !isResultThenable && !didCallSendResponse) {
              return false;
            }
            const sendPromisedResult = (promise) => {
              promise.then((msg) => {
                sendResponse(msg);
              }, (error) => {
                let message2;
                if (error && (error instanceof Error || typeof error.message === "string")) {
                  message2 = error.message;
                } else {
                  message2 = "An unexpected error occurred";
                }
                sendResponse({
                  __mozWebExtensionPolyfillReject__: true,
                  message: message2
                });
              }).catch((err) => {
                console.error("Failed to send onMessage rejected reply", err);
              });
            };
            if (isResultThenable) {
              sendPromisedResult(result);
            } else {
              sendPromisedResult(sendResponsePromise);
            }
            return true;
          };
        });
        const wrappedSendMessageCallback = ({
          reject,
          resolve
        }, reply) => {
          if (extensionAPIs.runtime.lastError) {
            if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
              resolve();
            } else {
              reject(extensionAPIs.runtime.lastError);
            }
          } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
            reject(new Error(reply.message));
          } else {
            resolve(reply);
          }
        };
        const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
          if (args.length < metadata.minArgs) {
            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
          }
          if (args.length > metadata.maxArgs) {
            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
          }
          return new Promise((resolve, reject) => {
            const wrappedCb = wrappedSendMessageCallback.bind(null, {
              resolve,
              reject
            });
            args.push(wrappedCb);
            apiNamespaceObj.sendMessage(...args);
          });
        };
        const staticWrappers = {
          runtime: {
            onMessage: wrapEvent(onMessageWrappers),
            onMessageExternal: wrapEvent(onMessageWrappers),
            sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
              minArgs: 1,
              maxArgs: 3
            })
          },
          tabs: {
            sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
              minArgs: 2,
              maxArgs: 3
            })
          }
        };
        const settingMetadata = {
          clear: {
            minArgs: 1,
            maxArgs: 1
          },
          get: {
            minArgs: 1,
            maxArgs: 1
          },
          set: {
            minArgs: 1,
            maxArgs: 1
          }
        };
        apiMetadata.privacy = {
          network: {
            "*": settingMetadata
          },
          services: {
            "*": settingMetadata
          },
          websites: {
            "*": settingMetadata
          }
        };
        return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
      };
      if (typeof chrome != "object" || !chrome || !chrome.runtime || !chrome.runtime.id) {
        throw new Error("This script should only be loaded in a browser extension.");
      }
      module2.exports = wrapAPIs(chrome);
    } else {
      module2.exports = browser;
    }
  });
})(browserPolyfill);
if (typeof window !== "undefined") {
  window.addEventListener("message", (event) => {
    if (event.origin !== "https://extensionpay.com")
      return;
    if (event.source != window)
      return;
    if (event.data === "fetch-user" || event.data === "trial-start") {
      browserPolyfill.exports.runtime.sendMessage(event.data);
    }
  }, false);
}
function ExtPay(extension_id) {
  const HOST = `https://extensionpay.com`;
  const EXTENSION_URL = `${HOST}/extension/${extension_id}`;
  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function get(key) {
    try {
      return await browserPolyfill.exports.storage.sync.get(key);
    } catch (e) {
      return await browserPolyfill.exports.storage.local.get(key);
    }
  }
  async function set(dict) {
    try {
      return await browserPolyfill.exports.storage.sync.set(dict);
    } catch (e) {
      return await browserPolyfill.exports.storage.local.set(dict);
    }
  }
  browserPolyfill.exports.management && browserPolyfill.exports.management.getSelf().then(async (ext_info) => {
    if (!ext_info.permissions.includes("storage")) {
      var permissions = ext_info.hostPermissions.concat(ext_info.permissions);
      throw `ExtPay Setup Error: please include the "storage" permission in manifest.json["permissions"] or else ExtensionPay won't work correctly.

You can copy and paste this to your manifest.json file to fix this error:

"permissions": [
    ${permissions.map((x) => `"    ${x}"`).join(",\n")}${permissions.length > 0 ? "," : ""}
    "storage"
]
`;
    }
  });
  get(["extensionpay_installed_at", "extensionpay_user"]).then(async (storage) => {
    if (storage.extensionpay_installed_at)
      return;
    const user = storage.extensionpay_user;
    const date = user ? user.installedAt : new Date().toISOString();
    await set({ "extensionpay_installed_at": date });
  });
  const paid_callbacks = [];
  const trial_callbacks = [];
  async function create_key() {
    var body = {};
    var ext_info;
    if (browserPolyfill.exports.management) {
      ext_info = await browserPolyfill.exports.management.getSelf();
    } else if (browserPolyfill.exports.runtime) {
      ext_info = await browserPolyfill.exports.runtime.sendMessage("extpay-extinfo");
      if (!ext_info) {
        const is_dev_mode = !("update_url" in browserPolyfill.exports.runtime.getManifest());
        ext_info = { installType: is_dev_mode ? "development" : "normal" };
      }
    } else {
      throw "ExtPay needs to be run in a browser extension context";
    }
    if (ext_info.installType == "development") {
      body.development = true;
    }
    const resp = await fetch(`${EXTENSION_URL}/api/new-key`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    });
    if (!resp.ok) {
      throw resp.status, `${HOST}/home`;
    }
    const api_key = await resp.json();
    await set({ extensionpay_api_key: api_key });
    return api_key;
  }
  async function get_key() {
    const storage = await get(["extensionpay_api_key"]);
    if (storage.extensionpay_api_key) {
      return storage.extensionpay_api_key;
    }
    return null;
  }
  const datetime_re = /^\d\d\d\d-\d\d-\d\dT/;
  async function fetch_user() {
    var storage = await get(["extensionpay_user", "extensionpay_installed_at"]);
    const api_key = await get_key();
    if (!api_key) {
      return {
        paid: false,
        paidAt: null,
        installedAt: storage.extensionpay_installed_at ? new Date(storage.extensionpay_installed_at) : new Date(),
        trialStartedAt: null
      };
    }
    const resp = await fetch(`${EXTENSION_URL}/api/user?api_key=${api_key}`, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });
    if (!resp.ok)
      throw "ExtPay error while fetching user: " + await resp.text();
    const user_data = await resp.json();
    const parsed_user = {};
    for (var [key, value] of Object.entries(user_data)) {
      if (value && value.match && value.match(datetime_re)) {
        value = new Date(value);
      }
      parsed_user[key] = value;
    }
    parsed_user.installedAt = new Date(storage.extensionpay_installed_at);
    if (parsed_user.paidAt) {
      if (!storage.extensionpay_user || storage.extensionpay_user && !storage.extensionpay_user.paidAt) {
        paid_callbacks.forEach((cb) => cb(parsed_user));
      }
    }
    if (parsed_user.trialStartedAt) {
      if (!storage.extensionpay_user || storage.extensionpay_user && !storage.extensionpay_user.trialStartedAt) {
        trial_callbacks.forEach((cb) => cb(parsed_user));
      }
    }
    await set({ extensionpay_user: user_data });
    return parsed_user;
  }
  async function payment_page_link() {
    var api_key = await get_key();
    if (!api_key) {
      api_key = await create_key();
    }
    return `${EXTENSION_URL}?api_key=${api_key}`;
  }
  async function open_popup(url, width, height) {
    if (browserPolyfill.exports.windows && browserPolyfill.exports.windows.create) {
      const current_window = await browserPolyfill.exports.windows.getCurrent();
      const left = Math.round((current_window.width - width) * 0.5 + current_window.left);
      const top = Math.round((current_window.height - height) * 0.5 + current_window.top);
      try {
        browserPolyfill.exports.windows.create({
          url,
          type: "popup",
          focused: true,
          width,
          height,
          left,
          top
        });
      } catch (e) {
        browserPolyfill.exports.windows.create({
          url,
          type: "popup",
          width,
          height,
          left,
          top
        });
      }
    } else {
      window.open(url, null, `toolbar=no,location=no,directories=no,status=no,menubar=no,width=${width},height=${height},left=450`);
    }
  }
  async function open_payment_page() {
    const url = await payment_page_link();
    open_popup(url, 500, 800);
  }
  async function open_trial_page(period) {
    var api_key = await get_key();
    if (!api_key) {
      api_key = await create_key();
    }
    var url = `${EXTENSION_URL}/trial?api_key=${api_key}`;
    if (period) {
      url += `&period=${period}`;
    }
    open_popup(url, 500, 650);
  }
  async function open_login_page() {
    var api_key = await get_key();
    if (!api_key) {
      api_key = await create_key();
    }
    const url = `${EXTENSION_URL}/reactivate?api_key=${api_key}`;
    open_popup(url, 500, 800);
  }
  var polling = false;
  async function poll_user_paid() {
    if (polling)
      return;
    polling = true;
    var user = await fetch_user();
    for (var i = 0; i < 2 * 60; ++i) {
      if (user.paidAt) {
        polling = false;
        return user;
      }
      await timeout(1e3);
      user = await fetch_user();
    }
    polling = false;
  }
  return {
    getUser: function() {
      return fetch_user();
    },
    onPaid: {
      addListener: function(callback) {
        const content_script_template = `"content_scripts": [
                {
            "matches": ["${HOST}/*"],
            "js": ["ExtPay.js"],
            "run_at": "document_start"
        }]`;
        const manifest = browserPolyfill.exports.runtime.getManifest();
        if (!manifest.content_scripts) {
          throw `ExtPay setup error: To use the onPaid callback handler, please include ExtPay as a content script in your manifest.json. You can copy the example below into your manifest.json or check the docs: https://github.com/Glench/ExtPay#2-configure-your-manifestjson

        ${content_script_template}`;
        }
        const extpay_content_script_entry = manifest.content_scripts.find((obj) => {
          return obj.matches.includes(HOST.replace(":3000", "") + "/*");
        });
        if (!extpay_content_script_entry) {
          throw `ExtPay setup error: To use the onPaid callback handler, please include ExtPay as a content script in your manifest.json matching "${HOST}/*". You can copy the example below into your manifest.json or check the docs: https://github.com/Glench/ExtPay#2-configure-your-manifestjson

        ${content_script_template}`;
        } else {
          if (!extpay_content_script_entry.run_at || extpay_content_script_entry.run_at !== "document_start") {
            throw `ExtPay setup error: To use the onPaid callback handler, please make sure the ExtPay content script in your manifest.json runs at document start. You can copy the example below into your manifest.json or check the docs: https://github.com/Glench/ExtPay#2-configure-your-manifestjson

        ${content_script_template}`;
          }
        }
        paid_callbacks.push(callback);
      }
    },
    openPaymentPage: open_payment_page,
    openTrialPage: open_trial_page,
    openLoginPage: open_login_page,
    onTrialStarted: {
      addListener: function(callback) {
        trial_callbacks.push(callback);
      }
    },
    startBackground: function() {
      browserPolyfill.exports.runtime.onMessage.addListener(function(message, sender, send_response) {
        console.log("service worker got message! Here it is:", message);
        if (message == "fetch-user") {
          poll_user_paid();
        } else if (message == "trial-start") {
          fetch_user();
        } else if (message == "extpay-extinfo" && browserPolyfill.exports.management) {
          return browserPolyfill.exports.management.getSelf();
        }
      });
    }
  };
}
export {
  ExtPay as E
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXh0UGF5Lm1vZHVsZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbC9kaXN0L2Jyb3dzZXItcG9seWZpbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZXh0cGF5L2Rpc3QvRXh0UGF5Lm1vZHVsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIiwgW1wibW9kdWxlXCJdLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGZhY3RvcnkobW9kdWxlKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbW9kID0ge1xuICAgICAgZXhwb3J0czoge31cbiAgICB9O1xuICAgIGZhY3RvcnkobW9kKTtcbiAgICBnbG9iYWwuYnJvd3NlciA9IG1vZC5leHBvcnRzO1xuICB9XG59KSh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFRoaXMgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbiAobW9kdWxlKSB7XG4gIC8qIHdlYmV4dGVuc2lvbi1wb2x5ZmlsbCAtIHYwLjcuMCAtIFR1ZSBOb3YgMTAgMjAyMCAyMDoyNDowNCAqL1xuXG4gIC8qIC0qLSBNb2RlOiBpbmRlbnQtdGFicy1tb2RlOiBuaWw7IGpzLWluZGVudC1sZXZlbDogMiAtKi0gKi9cblxuICAvKiB2aW06IHNldCBzdHM9MiBzdz0yIGV0IHR3PTgwOiAqL1xuXG4gIC8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICAgKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBpZiAodHlwZW9mIGJyb3dzZXIgPT09IFwidW5kZWZpbmVkXCIgfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKGJyb3dzZXIpICE9PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgY29uc3QgQ0hST01FX1NFTkRfTUVTU0FHRV9DQUxMQkFDS19OT19SRVNQT05TRV9NRVNTQUdFID0gXCJUaGUgbWVzc2FnZSBwb3J0IGNsb3NlZCBiZWZvcmUgYSByZXNwb25zZSB3YXMgcmVjZWl2ZWQuXCI7XG4gICAgY29uc3QgU0VORF9SRVNQT05TRV9ERVBSRUNBVElPTl9XQVJOSU5HID0gXCJSZXR1cm5pbmcgYSBQcm9taXNlIGlzIHRoZSBwcmVmZXJyZWQgd2F5IHRvIHNlbmQgYSByZXBseSBmcm9tIGFuIG9uTWVzc2FnZS9vbk1lc3NhZ2VFeHRlcm5hbCBsaXN0ZW5lciwgYXMgdGhlIHNlbmRSZXNwb25zZSB3aWxsIGJlIHJlbW92ZWQgZnJvbSB0aGUgc3BlY3MgKFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9kb2NzL01vemlsbGEvQWRkLW9ucy9XZWJFeHRlbnNpb25zL0FQSS9ydW50aW1lL29uTWVzc2FnZSlcIjsgLy8gV3JhcHBpbmcgdGhlIGJ1bGsgb2YgdGhpcyBwb2x5ZmlsbCBpbiBhIG9uZS10aW1lLXVzZSBmdW5jdGlvbiBpcyBhIG1pbm9yXG4gICAgLy8gb3B0aW1pemF0aW9uIGZvciBGaXJlZm94LiBTaW5jZSBTcGlkZXJtb25rZXkgZG9lcyBub3QgZnVsbHkgcGFyc2UgdGhlXG4gICAgLy8gY29udGVudHMgb2YgYSBmdW5jdGlvbiB1bnRpbCB0aGUgZmlyc3QgdGltZSBpdCdzIGNhbGxlZCwgYW5kIHNpbmNlIGl0IHdpbGxcbiAgICAvLyBuZXZlciBhY3R1YWxseSBuZWVkIHRvIGJlIGNhbGxlZCwgdGhpcyBhbGxvd3MgdGhlIHBvbHlmaWxsIHRvIGJlIGluY2x1ZGVkXG4gICAgLy8gaW4gRmlyZWZveCBuZWFybHkgZm9yIGZyZWUuXG5cbiAgICBjb25zdCB3cmFwQVBJcyA9IGV4dGVuc2lvbkFQSXMgPT4ge1xuICAgICAgLy8gTk9URTogYXBpTWV0YWRhdGEgaXMgYXNzb2NpYXRlZCB0byB0aGUgY29udGVudCBvZiB0aGUgYXBpLW1ldGFkYXRhLmpzb24gZmlsZVxuICAgICAgLy8gYXQgYnVpbGQgdGltZSBieSByZXBsYWNpbmcgdGhlIGZvbGxvd2luZyBcImluY2x1ZGVcIiB3aXRoIHRoZSBjb250ZW50IG9mIHRoZVxuICAgICAgLy8gSlNPTiBmaWxlLlxuICAgICAgY29uc3QgYXBpTWV0YWRhdGEgPSB7XG4gICAgICAgIFwiYWxhcm1zXCI6IHtcbiAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xlYXJBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJib29rbWFya3NcIjoge1xuICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Q2hpbGRyZW5cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRSZWNlbnRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRTdWJUcmVlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VHJlZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVUcmVlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VhcmNoXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidXBkYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYnJvd3NlckFjdGlvblwiOiB7XG4gICAgICAgICAgXCJkaXNhYmxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZW5hYmxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3JcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRCYWRnZVRleHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRQb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFRpdGxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwib3BlblBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3JcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRCYWRnZVRleHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRJY29uXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0UG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRUaXRsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJyb3dzaW5nRGF0YVwiOiB7XG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVDYWNoZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUNvb2tpZXNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVEb3dubG9hZHNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVGb3JtRGF0YVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUhpc3RvcnlcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVMb2NhbFN0b3JhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVQYXNzd29yZHNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVQbHVnaW5EYXRhXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb21tYW5kc1wiOiB7XG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb250ZXh0TWVudXNcIjoge1xuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidXBkYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiY29va2llc1wiOiB7XG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxDb29raWVTdG9yZXNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJkZXZ0b29sc1wiOiB7XG4gICAgICAgICAgXCJpbnNwZWN0ZWRXaW5kb3dcIjoge1xuICAgICAgICAgICAgXCJldmFsXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyLFxuICAgICAgICAgICAgICBcInNpbmdsZUNhbGxiYWNrQXJnXCI6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInBhbmVsc1wiOiB7XG4gICAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAzLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMyxcbiAgICAgICAgICAgICAgXCJzaW5nbGVDYWxsYmFja0FyZ1wiOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJlbGVtZW50c1wiOiB7XG4gICAgICAgICAgICAgIFwiY3JlYXRlU2lkZWJhclBhbmVcIjoge1xuICAgICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiZG93bmxvYWRzXCI6IHtcbiAgICAgICAgICBcImNhbmNlbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRvd25sb2FkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZXJhc2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRGaWxlSWNvblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm9wZW5cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJwYXVzZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUZpbGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXN1bWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzaG93XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiZXh0ZW5zaW9uXCI6IHtcbiAgICAgICAgICBcImlzQWxsb3dlZEZpbGVTY2hlbWVBY2Nlc3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJpc0FsbG93ZWRJbmNvZ25pdG9BY2Nlc3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJoaXN0b3J5XCI6IHtcbiAgICAgICAgICBcImFkZFVybFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRlbGV0ZUFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRlbGV0ZVJhbmdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlVXJsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VmlzaXRzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VhcmNoXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaTE4blwiOiB7XG4gICAgICAgICAgXCJkZXRlY3RMYW5ndWFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFjY2VwdExhbmd1YWdlc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImlkZW50aXR5XCI6IHtcbiAgICAgICAgICBcImxhdW5jaFdlYkF1dGhGbG93XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaWRsZVwiOiB7XG4gICAgICAgICAgXCJxdWVyeVN0YXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibWFuYWdlbWVudFwiOiB7XG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRTZWxmXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0RW5hYmxlZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVuaW5zdGFsbFNlbGZcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJub3RpZmljYXRpb25zXCI6IHtcbiAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UGVybWlzc2lvbkxldmVsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidXBkYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicGFnZUFjdGlvblwiOiB7XG4gICAgICAgICAgXCJnZXRQb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFRpdGxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiaGlkZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEljb25cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRQb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFRpdGxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2hvd1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInBlcm1pc3Npb25zXCI6IHtcbiAgICAgICAgICBcImNvbnRhaW5zXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVxdWVzdFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInJ1bnRpbWVcIjoge1xuICAgICAgICAgIFwiZ2V0QmFja2dyb3VuZFBhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRQbGF0Zm9ybUluZm9cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvcGVuT3B0aW9uc1BhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXF1ZXN0VXBkYXRlQ2hlY2tcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZW5kTWVzc2FnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlbmROYXRpdmVNZXNzYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0VW5pbnN0YWxsVVJMXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwic2Vzc2lvbnNcIjoge1xuICAgICAgICAgIFwiZ2V0RGV2aWNlc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFJlY2VudGx5Q2xvc2VkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVzdG9yZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInN0b3JhZ2VcIjoge1xuICAgICAgICAgIFwibG9jYWxcIjoge1xuICAgICAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRCeXRlc0luVXNlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJtYW5hZ2VkXCI6IHtcbiAgICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRCeXRlc0luVXNlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInN5bmNcIjoge1xuICAgICAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRCeXRlc0luVXNlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ0YWJzXCI6IHtcbiAgICAgICAgICBcImNhcHR1cmVWaXNpYmxlVGFiXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGV0ZWN0TGFuZ3VhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkaXNjYXJkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZHVwbGljYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZXhlY3V0ZVNjcmlwdFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEN1cnJlbnRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRab29tXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Wm9vbVNldHRpbmdzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ29CYWNrXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ29Gb3J3YXJkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiaGlnaGxpZ2h0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiaW5zZXJ0Q1NTXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInF1ZXJ5XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVsb2FkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQ1NTXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VuZE1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogM1xuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRab29tXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0Wm9vbVNldHRpbmdzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidXBkYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwidG9wU2l0ZXNcIjoge1xuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2ViTmF2aWdhdGlvblwiOiB7XG4gICAgICAgICAgXCJnZXRBbGxGcmFtZXNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRGcmFtZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIndlYlJlcXVlc3RcIjoge1xuICAgICAgICAgIFwiaGFuZGxlckJlaGF2aW9yQ2hhbmdlZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIndpbmRvd3NcIjoge1xuICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Q3VycmVudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldExhc3RGb2N1c2VkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidXBkYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGlmIChPYmplY3Qua2V5cyhhcGlNZXRhZGF0YSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImFwaS1tZXRhZGF0YS5qc29uIGhhcyBub3QgYmVlbiBpbmNsdWRlZCBpbiBicm93c2VyLXBvbHlmaWxsXCIpO1xuICAgICAgfVxuICAgICAgLyoqXG4gICAgICAgKiBBIFdlYWtNYXAgc3ViY2xhc3Mgd2hpY2ggY3JlYXRlcyBhbmQgc3RvcmVzIGEgdmFsdWUgZm9yIGFueSBrZXkgd2hpY2ggZG9lc1xuICAgICAgICogbm90IGV4aXN0IHdoZW4gYWNjZXNzZWQsIGJ1dCBiZWhhdmVzIGV4YWN0bHkgYXMgYW4gb3JkaW5hcnkgV2Vha01hcFxuICAgICAgICogb3RoZXJ3aXNlLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNyZWF0ZUl0ZW1cbiAgICAgICAqICAgICAgICBBIGZ1bmN0aW9uIHdoaWNoIHdpbGwgYmUgY2FsbGVkIGluIG9yZGVyIHRvIGNyZWF0ZSB0aGUgdmFsdWUgZm9yIGFueVxuICAgICAgICogICAgICAgIGtleSB3aGljaCBkb2VzIG5vdCBleGlzdCwgdGhlIGZpcnN0IHRpbWUgaXQgaXMgYWNjZXNzZWQuIFRoZVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uIHJlY2VpdmVzLCBhcyBpdHMgb25seSBhcmd1bWVudCwgdGhlIGtleSBiZWluZyBjcmVhdGVkLlxuICAgICAgICovXG5cblxuICAgICAgY2xhc3MgRGVmYXVsdFdlYWtNYXAgZXh0ZW5kcyBXZWFrTWFwIHtcbiAgICAgICAgY29uc3RydWN0b3IoY3JlYXRlSXRlbSwgaXRlbXMgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzdXBlcihpdGVtcyk7XG4gICAgICAgICAgdGhpcy5jcmVhdGVJdGVtID0gY3JlYXRlSXRlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldChrZXkpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgdGhpcy5jcmVhdGVJdGVtKGtleSkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBzdXBlci5nZXQoa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gb2JqZWN0IGlzIGFuIG9iamVjdCB3aXRoIGEgYHRoZW5gIG1ldGhvZCwgYW5kIGNhblxuICAgICAgICogdGhlcmVmb3JlIGJlIGFzc3VtZWQgdG8gYmVoYXZlIGFzIGEgUHJvbWlzZS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICAgICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHRoZW5hYmxlLlxuICAgICAgICovXG5cblxuICAgICAgY29uc3QgaXNUaGVuYWJsZSA9IHZhbHVlID0+IHtcbiAgICAgICAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gXCJmdW5jdGlvblwiO1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIGZ1bmN0aW9uIHdoaWNoLCB3aGVuIGNhbGxlZCwgd2lsbCByZXNvbHZlIG9yIHJlamVjdFxuICAgICAgICogdGhlIGdpdmVuIHByb21pc2UgYmFzZWQgb24gaG93IGl0IGlzIGNhbGxlZDpcbiAgICAgICAqXG4gICAgICAgKiAtIElmLCB3aGVuIGNhbGxlZCwgYGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcmAgY29udGFpbnMgYSBub24tbnVsbCBvYmplY3QsXG4gICAgICAgKiAgIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkIHdpdGggdGhhdCB2YWx1ZS5cbiAgICAgICAqIC0gSWYgdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRoIGV4YWN0bHkgb25lIGFyZ3VtZW50LCB0aGUgcHJvbWlzZSBpc1xuICAgICAgICogICByZXNvbHZlZCB0byB0aGF0IHZhbHVlLlxuICAgICAgICogLSBPdGhlcndpc2UsIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHRvIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZVxuICAgICAgICogICBmdW5jdGlvbidzIGFyZ3VtZW50cy5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gcHJvbWlzZVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSByZXNvbHV0aW9uIGFuZCByZWplY3Rpb24gZnVuY3Rpb25zIG9mIGFcbiAgICAgICAqICAgICAgICBwcm9taXNlLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcHJvbWlzZS5yZXNvbHZlXG4gICAgICAgKiAgICAgICAgVGhlIHByb21pc2UncyByZXNvbHV0aW9uIGZ1bmN0aW9uLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcHJvbWlzZS5yZWplY3Rpb25cbiAgICAgICAqICAgICAgICBUaGUgcHJvbWlzZSdzIHJlamVjdGlvbiBmdW5jdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhZGF0YVxuICAgICAgICogICAgICAgIE1ldGFkYXRhIGFib3V0IHRoZSB3cmFwcGVkIG1ldGhvZCB3aGljaCBoYXMgY3JlYXRlZCB0aGUgY2FsbGJhY2suXG4gICAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IG1ldGFkYXRhLm1heFJlc29sdmVkQXJnc1xuICAgICAgICogICAgICAgIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhcmd1bWVudHMgd2hpY2ggbWF5IGJlIHBhc3NlZCB0byB0aGVcbiAgICAgICAqICAgICAgICBjYWxsYmFjayBjcmVhdGVkIGJ5IHRoZSB3cmFwcGVkIGFzeW5jIGZ1bmN0aW9uLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgICAqICAgICAgICBUaGUgZ2VuZXJhdGVkIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAgICovXG5cblxuICAgICAgY29uc3QgbWFrZUNhbGxiYWNrID0gKHByb21pc2UsIG1ldGFkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiAoLi4uY2FsbGJhY2tBcmdzKSA9PiB7XG4gICAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVqZWN0KGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IpO1xuICAgICAgICAgIH0gZWxzZSBpZiAobWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmcgfHwgY2FsbGJhY2tBcmdzLmxlbmd0aCA8PSAxICYmIG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgcHJvbWlzZS5yZXNvbHZlKGNhbGxiYWNrQXJnc1swXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb21pc2UucmVzb2x2ZShjYWxsYmFja0FyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHBsdXJhbGl6ZUFyZ3VtZW50cyA9IG51bUFyZ3MgPT4gbnVtQXJncyA9PSAxID8gXCJhcmd1bWVudFwiIDogXCJhcmd1bWVudHNcIjtcbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlcyBhIHdyYXBwZXIgZnVuY3Rpb24gZm9yIGEgbWV0aG9kIHdpdGggdGhlIGdpdmVuIG5hbWUgYW5kIG1ldGFkYXRhLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICAgKiAgICAgICAgVGhlIG5hbWUgb2YgdGhlIG1ldGhvZCB3aGljaCBpcyBiZWluZyB3cmFwcGVkLlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IG1ldGFkYXRhXG4gICAgICAgKiAgICAgICAgTWV0YWRhdGEgYWJvdXQgdGhlIG1ldGhvZCBiZWluZyB3cmFwcGVkLlxuICAgICAgICogQHBhcmFtIHtpbnRlZ2VyfSBtZXRhZGF0YS5taW5BcmdzXG4gICAgICAgKiAgICAgICAgVGhlIG1pbmltdW0gbnVtYmVyIG9mIGFyZ3VtZW50cyB3aGljaCBtdXN0IGJlIHBhc3NlZCB0byB0aGVcbiAgICAgICAqICAgICAgICBmdW5jdGlvbi4gSWYgY2FsbGVkIHdpdGggZmV3ZXIgdGhhbiB0aGlzIG51bWJlciBvZiBhcmd1bWVudHMsIHRoZVxuICAgICAgICogICAgICAgIHdyYXBwZXIgd2lsbCByYWlzZSBhbiBleGNlcHRpb24uXG4gICAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IG1ldGFkYXRhLm1heEFyZ3NcbiAgICAgICAqICAgICAgICBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXJndW1lbnRzIHdoaWNoIG1heSBiZSBwYXNzZWQgdG8gdGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24uIElmIGNhbGxlZCB3aXRoIG1vcmUgdGhhbiB0aGlzIG51bWJlciBvZiBhcmd1bWVudHMsIHRoZVxuICAgICAgICogICAgICAgIHdyYXBwZXIgd2lsbCByYWlzZSBhbiBleGNlcHRpb24uXG4gICAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IG1ldGFkYXRhLm1heFJlc29sdmVkQXJnc1xuICAgICAgICogICAgICAgIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhcmd1bWVudHMgd2hpY2ggbWF5IGJlIHBhc3NlZCB0byB0aGVcbiAgICAgICAqICAgICAgICBjYWxsYmFjayBjcmVhdGVkIGJ5IHRoZSB3cmFwcGVkIGFzeW5jIGZ1bmN0aW9uLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbihvYmplY3QsIC4uLiopfVxuICAgICAgICogICAgICAgVGhlIGdlbmVyYXRlZCB3cmFwcGVyIGZ1bmN0aW9uLlxuICAgICAgICovXG5cblxuICAgICAgY29uc3Qgd3JhcEFzeW5jRnVuY3Rpb24gPSAobmFtZSwgbWV0YWRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGFzeW5jRnVuY3Rpb25XcmFwcGVyKHRhcmdldCwgLi4uYXJncykge1xuICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA8IG1ldGFkYXRhLm1pbkFyZ3MpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbGVhc3QgJHttZXRhZGF0YS5taW5BcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5taW5BcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gbWV0YWRhdGEubWF4QXJncykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBtb3N0ICR7bWV0YWRhdGEubWF4QXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWF4QXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAobWV0YWRhdGEuZmFsbGJhY2tUb05vQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgLy8gVGhpcyBBUEkgbWV0aG9kIGhhcyBjdXJyZW50bHkgbm8gY2FsbGJhY2sgb24gQ2hyb21lLCBidXQgaXQgcmV0dXJuIGEgcHJvbWlzZSBvbiBGaXJlZm94LFxuICAgICAgICAgICAgICAvLyBhbmQgc28gdGhlIHBvbHlmaWxsIHdpbGwgdHJ5IHRvIGNhbGwgaXQgd2l0aCBhIGNhbGxiYWNrIGZpcnN0LCBhbmQgaXQgd2lsbCBmYWxsYmFja1xuICAgICAgICAgICAgICAvLyB0byBub3QgcGFzc2luZyB0aGUgY2FsbGJhY2sgaWYgdGhlIGZpcnN0IGNhbGwgZmFpbHMuXG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MsIG1ha2VDYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgICAgICAgfSwgbWV0YWRhdGEpKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoY2JFcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtuYW1lfSBBUEkgbWV0aG9kIGRvZXNuJ3Qgc2VlbSB0byBzdXBwb3J0IHRoZSBjYWxsYmFjayBwYXJhbWV0ZXIsIGAgKyBcImZhbGxpbmcgYmFjayB0byBjYWxsIGl0IHdpdGhvdXQgYSBjYWxsYmFjazogXCIsIGNiRXJyb3IpO1xuICAgICAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzKTsgLy8gVXBkYXRlIHRoZSBBUEkgbWV0aG9kIG1ldGFkYXRhLCBzbyB0aGF0IHRoZSBuZXh0IEFQSSBjYWxscyB3aWxsIG5vdCB0cnkgdG9cbiAgICAgICAgICAgICAgICAvLyB1c2UgdGhlIHVuc3VwcG9ydGVkIGNhbGxiYWNrIGFueW1vcmUuXG5cbiAgICAgICAgICAgICAgICBtZXRhZGF0YS5mYWxsYmFja1RvTm9DYWxsYmFjayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG1ldGFkYXRhLm5vQ2FsbGJhY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChtZXRhZGF0YS5ub0NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MsIG1ha2VDYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgICAgfSwgbWV0YWRhdGEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIFdyYXBzIGFuIGV4aXN0aW5nIG1ldGhvZCBvZiB0aGUgdGFyZ2V0IG9iamVjdCwgc28gdGhhdCBjYWxscyB0byBpdCBhcmVcbiAgICAgICAqIGludGVyY2VwdGVkIGJ5IHRoZSBnaXZlbiB3cmFwcGVyIGZ1bmN0aW9uLiBUaGUgd3JhcHBlciBmdW5jdGlvbiByZWNlaXZlcyxcbiAgICAgICAqIGFzIGl0cyBmaXJzdCBhcmd1bWVudCwgdGhlIG9yaWdpbmFsIGB0YXJnZXRgIG9iamVjdCwgZm9sbG93ZWQgYnkgZWFjaCBvZlxuICAgICAgICogdGhlIGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhlIG9yaWdpbmFsIG1ldGhvZC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0XG4gICAgICAgKiAgICAgICAgVGhlIG9yaWdpbmFsIHRhcmdldCBvYmplY3QgdGhhdCB0aGUgd3JhcHBlZCBtZXRob2QgYmVsb25ncyB0by5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG1ldGhvZFxuICAgICAgICogICAgICAgIFRoZSBtZXRob2QgYmVpbmcgd3JhcHBlZC4gVGhpcyBpcyB1c2VkIGFzIHRoZSB0YXJnZXQgb2YgdGhlIFByb3h5XG4gICAgICAgKiAgICAgICAgb2JqZWN0IHdoaWNoIGlzIGNyZWF0ZWQgdG8gd3JhcCB0aGUgbWV0aG9kLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gd3JhcHBlclxuICAgICAgICogICAgICAgIFRoZSB3cmFwcGVyIGZ1bmN0aW9uIHdoaWNoIGlzIGNhbGxlZCBpbiBwbGFjZSBvZiBhIGRpcmVjdCBpbnZvY2F0aW9uXG4gICAgICAgKiAgICAgICAgb2YgdGhlIHdyYXBwZWQgbWV0aG9kLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtQcm94eTxmdW5jdGlvbj59XG4gICAgICAgKiAgICAgICAgQSBQcm94eSBvYmplY3QgZm9yIHRoZSBnaXZlbiBtZXRob2QsIHdoaWNoIGludm9rZXMgdGhlIGdpdmVuIHdyYXBwZXJcbiAgICAgICAqICAgICAgICBtZXRob2QgaW4gaXRzIHBsYWNlLlxuICAgICAgICovXG5cblxuICAgICAgY29uc3Qgd3JhcE1ldGhvZCA9ICh0YXJnZXQsIG1ldGhvZCwgd3JhcHBlcikgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb3h5KG1ldGhvZCwge1xuICAgICAgICAgIGFwcGx5KHRhcmdldE1ldGhvZCwgdGhpc09iaiwgYXJncykge1xuICAgICAgICAgICAgcmV0dXJuIHdyYXBwZXIuY2FsbCh0aGlzT2JqLCB0YXJnZXQsIC4uLmFyZ3MpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGxldCBoYXNPd25Qcm9wZXJ0eSA9IEZ1bmN0aW9uLmNhbGwuYmluZChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcbiAgICAgIC8qKlxuICAgICAgICogV3JhcHMgYW4gb2JqZWN0IGluIGEgUHJveHkgd2hpY2ggaW50ZXJjZXB0cyBhbmQgd3JhcHMgY2VydGFpbiBtZXRob2RzXG4gICAgICAgKiBiYXNlZCBvbiB0aGUgZ2l2ZW4gYHdyYXBwZXJzYCBhbmQgYG1ldGFkYXRhYCBvYmplY3RzLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAgICAgICAqICAgICAgICBUaGUgdGFyZ2V0IG9iamVjdCB0byB3cmFwLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbd3JhcHBlcnMgPSB7fV1cbiAgICAgICAqICAgICAgICBBbiBvYmplY3QgdHJlZSBjb250YWluaW5nIHdyYXBwZXIgZnVuY3Rpb25zIGZvciBzcGVjaWFsIGNhc2VzLiBBbnlcbiAgICAgICAqICAgICAgICBmdW5jdGlvbiBwcmVzZW50IGluIHRoaXMgb2JqZWN0IHRyZWUgaXMgY2FsbGVkIGluIHBsYWNlIG9mIHRoZVxuICAgICAgICogICAgICAgIG1ldGhvZCBpbiB0aGUgc2FtZSBsb2NhdGlvbiBpbiB0aGUgYHRhcmdldGAgb2JqZWN0IHRyZWUuIFRoZXNlXG4gICAgICAgKiAgICAgICAgd3JhcHBlciBtZXRob2RzIGFyZSBpbnZva2VkIGFzIGRlc2NyaWJlZCBpbiB7QHNlZSB3cmFwTWV0aG9kfS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gW21ldGFkYXRhID0ge31dXG4gICAgICAgKiAgICAgICAgQW4gb2JqZWN0IHRyZWUgY29udGFpbmluZyBtZXRhZGF0YSB1c2VkIHRvIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVcbiAgICAgICAqICAgICAgICBQcm9taXNlLWJhc2VkIHdyYXBwZXIgZnVuY3Rpb25zIGZvciBhc3luY2hyb25vdXMuIEFueSBmdW5jdGlvbiBpblxuICAgICAgICogICAgICAgIHRoZSBgdGFyZ2V0YCBvYmplY3QgdHJlZSB3aGljaCBoYXMgYSBjb3JyZXNwb25kaW5nIG1ldGFkYXRhIG9iamVjdFxuICAgICAgICogICAgICAgIGluIHRoZSBzYW1lIGxvY2F0aW9uIGluIHRoZSBgbWV0YWRhdGFgIHRyZWUgaXMgcmVwbGFjZWQgd2l0aCBhblxuICAgICAgICogICAgICAgIGF1dG9tYXRpY2FsbHktZ2VuZXJhdGVkIHdyYXBwZXIgZnVuY3Rpb24sIGFzIGRlc2NyaWJlZCBpblxuICAgICAgICogICAgICAgIHtAc2VlIHdyYXBBc3luY0Z1bmN0aW9ufVxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtQcm94eTxvYmplY3Q+fVxuICAgICAgICovXG5cbiAgICAgIGNvbnN0IHdyYXBPYmplY3QgPSAodGFyZ2V0LCB3cmFwcGVycyA9IHt9LCBtZXRhZGF0YSA9IHt9KSA9PiB7XG4gICAgICAgIGxldCBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGxldCBoYW5kbGVycyA9IHtcbiAgICAgICAgICBoYXMocHJveHlUYXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wIGluIHRhcmdldCB8fCBwcm9wIGluIGNhY2hlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBnZXQocHJveHlUYXJnZXQsIHByb3AsIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICBpZiAocHJvcCBpbiBjYWNoZSkge1xuICAgICAgICAgICAgICByZXR1cm4gY2FjaGVbcHJvcF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghKHByb3AgaW4gdGFyZ2V0KSkge1xuICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0YXJnZXRbcHJvcF07XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgbWV0aG9kIG9uIHRoZSB1bmRlcmx5aW5nIG9iamVjdC4gQ2hlY2sgaWYgd2UgbmVlZCB0byBkb1xuICAgICAgICAgICAgICAvLyBhbnkgd3JhcHBpbmcuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2Ygd3JhcHBlcnNbcHJvcF0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgYSBzcGVjaWFsLWNhc2Ugd3JhcHBlciBmb3IgdGhpcyBtZXRob2QuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwTWV0aG9kKHRhcmdldCwgdGFyZ2V0W3Byb3BdLCB3cmFwcGVyc1twcm9wXSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIHByb3ApKSB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhbiBhc3luYyBtZXRob2QgdGhhdCB3ZSBoYXZlIG1ldGFkYXRhIGZvci4gQ3JlYXRlIGFcbiAgICAgICAgICAgICAgICAvLyBQcm9taXNlIHdyYXBwZXIgZm9yIGl0LlxuICAgICAgICAgICAgICAgIGxldCB3cmFwcGVyID0gd3JhcEFzeW5jRnVuY3Rpb24ocHJvcCwgbWV0YWRhdGFbcHJvcF0pO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gd3JhcE1ldGhvZCh0YXJnZXQsIHRhcmdldFtwcm9wXSwgd3JhcHBlcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhIG1ldGhvZCB0aGF0IHdlIGRvbid0IGtub3cgb3IgY2FyZSBhYm91dC4gUmV0dXJuIHRoZVxuICAgICAgICAgICAgICAgIC8vIG9yaWdpbmFsIG1ldGhvZCwgYm91bmQgdG8gdGhlIHVuZGVybHlpbmcgb2JqZWN0LlxuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuYmluZCh0YXJnZXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiAoaGFzT3duUHJvcGVydHkod3JhcHBlcnMsIHByb3ApIHx8IGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBwcm9wKSkpIHtcbiAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhbiBvYmplY3QgdGhhdCB3ZSBuZWVkIHRvIGRvIHNvbWUgd3JhcHBpbmcgZm9yIHRoZSBjaGlsZHJlblxuICAgICAgICAgICAgICAvLyBvZi4gQ3JlYXRlIGEgc3ViLW9iamVjdCB3cmFwcGVyIGZvciBpdCB3aXRoIHRoZSBhcHByb3ByaWF0ZSBjaGlsZFxuICAgICAgICAgICAgICAvLyBtZXRhZGF0YS5cbiAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwT2JqZWN0KHZhbHVlLCB3cmFwcGVyc1twcm9wXSwgbWV0YWRhdGFbcHJvcF0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgXCIqXCIpKSB7XG4gICAgICAgICAgICAgIC8vIFdyYXAgYWxsIHByb3BlcnRpZXMgaW4gKiBuYW1lc3BhY2UuXG4gICAgICAgICAgICAgIHZhbHVlID0gd3JhcE9iamVjdCh2YWx1ZSwgd3JhcHBlcnNbcHJvcF0sIG1ldGFkYXRhW1wiKlwiXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBXZSBkb24ndCBuZWVkIHRvIGRvIGFueSB3cmFwcGluZyBmb3IgdGhpcyBwcm9wZXJ0eSxcbiAgICAgICAgICAgICAgLy8gc28ganVzdCBmb3J3YXJkIGFsbCBhY2Nlc3MgdG8gdGhlIHVuZGVybHlpbmcgb2JqZWN0LlxuICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2FjaGUsIHByb3AsIHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRbcHJvcF07XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhY2hlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHNldChwcm94eVRhcmdldCwgcHJvcCwgdmFsdWUsIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICBpZiAocHJvcCBpbiBjYWNoZSkge1xuICAgICAgICAgICAgICBjYWNoZVtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBkZWZpbmVQcm9wZXJ0eShwcm94eVRhcmdldCwgcHJvcCwgZGVzYykge1xuICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoY2FjaGUsIHByb3AsIGRlc2MpO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBkZWxldGVQcm9wZXJ0eShwcm94eVRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkoY2FjaGUsIHByb3ApO1xuICAgICAgICAgIH1cblxuICAgICAgICB9OyAvLyBQZXIgY29udHJhY3Qgb2YgdGhlIFByb3h5IEFQSSwgdGhlIFwiZ2V0XCIgcHJveHkgaGFuZGxlciBtdXN0IHJldHVybiB0aGVcbiAgICAgICAgLy8gb3JpZ2luYWwgdmFsdWUgb2YgdGhlIHRhcmdldCBpZiB0aGF0IHZhbHVlIGlzIGRlY2xhcmVkIHJlYWQtb25seSBhbmRcbiAgICAgICAgLy8gbm9uLWNvbmZpZ3VyYWJsZS4gRm9yIHRoaXMgcmVhc29uLCB3ZSBjcmVhdGUgYW4gb2JqZWN0IHdpdGggdGhlXG4gICAgICAgIC8vIHByb3RvdHlwZSBzZXQgdG8gYHRhcmdldGAgaW5zdGVhZCBvZiB1c2luZyBgdGFyZ2V0YCBkaXJlY3RseS5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIHdlIGNhbm5vdCByZXR1cm4gYSBjdXN0b20gb2JqZWN0IGZvciBBUElzIHRoYXRcbiAgICAgICAgLy8gYXJlIGRlY2xhcmVkIHJlYWQtb25seSBhbmQgbm9uLWNvbmZpZ3VyYWJsZSwgc3VjaCBhcyBgY2hyb21lLmRldnRvb2xzYC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gVGhlIHByb3h5IGhhbmRsZXJzIHRoZW1zZWx2ZXMgd2lsbCBzdGlsbCB1c2UgdGhlIG9yaWdpbmFsIGB0YXJnZXRgXG4gICAgICAgIC8vIGluc3RlYWQgb2YgdGhlIGBwcm94eVRhcmdldGAsIHNvIHRoYXQgdGhlIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgYXJlXG4gICAgICAgIC8vIGRlcmVmZXJlbmNlZCB2aWEgdGhlIG9yaWdpbmFsIHRhcmdldHMuXG5cbiAgICAgICAgbGV0IHByb3h5VGFyZ2V0ID0gT2JqZWN0LmNyZWF0ZSh0YXJnZXQpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHByb3h5VGFyZ2V0LCBoYW5kbGVycyk7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGVzIGEgc2V0IG9mIHdyYXBwZXIgZnVuY3Rpb25zIGZvciBhbiBldmVudCBvYmplY3QsIHdoaWNoIGhhbmRsZXNcbiAgICAgICAqIHdyYXBwaW5nIG9mIGxpc3RlbmVyIGZ1bmN0aW9ucyB0aGF0IHRob3NlIG1lc3NhZ2VzIGFyZSBwYXNzZWQuXG4gICAgICAgKlxuICAgICAgICogQSBzaW5nbGUgd3JhcHBlciBpcyBjcmVhdGVkIGZvciBlYWNoIGxpc3RlbmVyIGZ1bmN0aW9uLCBhbmQgc3RvcmVkIGluIGFcbiAgICAgICAqIG1hcC4gU3Vic2VxdWVudCBjYWxscyB0byBgYWRkTGlzdGVuZXJgLCBgaGFzTGlzdGVuZXJgLCBvciBgcmVtb3ZlTGlzdGVuZXJgXG4gICAgICAgKiByZXRyaWV2ZSB0aGUgb3JpZ2luYWwgd3JhcHBlciwgc28gdGhhdCAgYXR0ZW1wdHMgdG8gcmVtb3ZlIGFcbiAgICAgICAqIHByZXZpb3VzbHktYWRkZWQgbGlzdGVuZXIgd29yayBhcyBleHBlY3RlZC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge0RlZmF1bHRXZWFrTWFwPGZ1bmN0aW9uLCBmdW5jdGlvbj59IHdyYXBwZXJNYXBcbiAgICAgICAqICAgICAgICBBIERlZmF1bHRXZWFrTWFwIG9iamVjdCB3aGljaCB3aWxsIGNyZWF0ZSB0aGUgYXBwcm9wcmlhdGUgd3JhcHBlclxuICAgICAgICogICAgICAgIGZvciBhIGdpdmVuIGxpc3RlbmVyIGZ1bmN0aW9uIHdoZW4gb25lIGRvZXMgbm90IGV4aXN0LCBhbmQgcmV0cmlldmVcbiAgICAgICAqICAgICAgICBhbiBleGlzdGluZyBvbmUgd2hlbiBpdCBkb2VzLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtvYmplY3R9XG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwRXZlbnQgPSB3cmFwcGVyTWFwID0+ICh7XG4gICAgICAgIGFkZExpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIsIC4uLmFyZ3MpIHtcbiAgICAgICAgICB0YXJnZXQuYWRkTGlzdGVuZXIod3JhcHBlck1hcC5nZXQobGlzdGVuZXIpLCAuLi5hcmdzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBoYXNMaXN0ZW5lcih0YXJnZXQsIGxpc3RlbmVyKSB7XG4gICAgICAgICAgcmV0dXJuIHRhcmdldC5oYXNMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lcikpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIpIHtcbiAgICAgICAgICB0YXJnZXQucmVtb3ZlTGlzdGVuZXIod3JhcHBlck1hcC5nZXQobGlzdGVuZXIpKTtcbiAgICAgICAgfVxuXG4gICAgICB9KTsgLy8gS2VlcCB0cmFjayBpZiB0aGUgZGVwcmVjYXRpb24gd2FybmluZyBoYXMgYmVlbiBsb2dnZWQgYXQgbGVhc3Qgb25jZS5cblxuXG4gICAgICBsZXQgbG9nZ2VkU2VuZFJlc3BvbnNlRGVwcmVjYXRpb25XYXJuaW5nID0gZmFsc2U7XG4gICAgICBjb25zdCBvbk1lc3NhZ2VXcmFwcGVycyA9IG5ldyBEZWZhdWx0V2Vha01hcChsaXN0ZW5lciA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHJldHVybiBsaXN0ZW5lcjtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogV3JhcHMgYSBtZXNzYWdlIGxpc3RlbmVyIGZ1bmN0aW9uIHNvIHRoYXQgaXQgbWF5IHNlbmQgcmVzcG9uc2VzIGJhc2VkIG9uXG4gICAgICAgICAqIGl0cyByZXR1cm4gdmFsdWUsIHJhdGhlciB0aGFuIGJ5IHJldHVybmluZyBhIHNlbnRpbmVsIHZhbHVlIGFuZCBjYWxsaW5nIGFcbiAgICAgICAgICogY2FsbGJhY2suIElmIHRoZSBsaXN0ZW5lciBmdW5jdGlvbiByZXR1cm5zIGEgUHJvbWlzZSwgdGhlIHJlc3BvbnNlIGlzXG4gICAgICAgICAqIHNlbnQgd2hlbiB0aGUgcHJvbWlzZSBlaXRoZXIgcmVzb2x2ZXMgb3IgcmVqZWN0cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHsqfSBtZXNzYWdlXG4gICAgICAgICAqICAgICAgICBUaGUgbWVzc2FnZSBzZW50IGJ5IHRoZSBvdGhlciBlbmQgb2YgdGhlIGNoYW5uZWwuXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBzZW5kZXJcbiAgICAgICAgICogICAgICAgIERldGFpbHMgYWJvdXQgdGhlIHNlbmRlciBvZiB0aGUgbWVzc2FnZS5cbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbigqKX0gc2VuZFJlc3BvbnNlXG4gICAgICAgICAqICAgICAgICBBIGNhbGxiYWNrIHdoaWNoLCB3aGVuIGNhbGxlZCB3aXRoIGFuIGFyYml0cmFyeSBhcmd1bWVudCwgc2VuZHNcbiAgICAgICAgICogICAgICAgIHRoYXQgdmFsdWUgYXMgYSByZXNwb25zZS5cbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqICAgICAgICBUcnVlIGlmIHRoZSB3cmFwcGVkIGxpc3RlbmVyIHJldHVybmVkIGEgUHJvbWlzZSwgd2hpY2ggd2lsbCBsYXRlclxuICAgICAgICAgKiAgICAgICAgeWllbGQgYSByZXNwb25zZS4gRmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAgICAgKi9cblxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBvbk1lc3NhZ2UobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICAgICAgICBsZXQgZGlkQ2FsbFNlbmRSZXNwb25zZSA9IGZhbHNlO1xuICAgICAgICAgIGxldCB3cmFwcGVkU2VuZFJlc3BvbnNlO1xuICAgICAgICAgIGxldCBzZW5kUmVzcG9uc2VQcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB3cmFwcGVkU2VuZFJlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIGlmICghbG9nZ2VkU2VuZFJlc3BvbnNlRGVwcmVjYXRpb25XYXJuaW5nKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFNFTkRfUkVTUE9OU0VfREVQUkVDQVRJT05fV0FSTklORywgbmV3IEVycm9yKCkuc3RhY2spO1xuICAgICAgICAgICAgICAgIGxvZ2dlZFNlbmRSZXNwb25zZURlcHJlY2F0aW9uV2FybmluZyA9IHRydWU7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBkaWRDYWxsU2VuZFJlc3BvbnNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGxldCByZXN1bHQ7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gbGlzdGVuZXIobWVzc2FnZSwgc2VuZGVyLCB3cmFwcGVkU2VuZFJlc3BvbnNlKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgaXNSZXN1bHRUaGVuYWJsZSA9IHJlc3VsdCAhPT0gdHJ1ZSAmJiBpc1RoZW5hYmxlKHJlc3VsdCk7IC8vIElmIHRoZSBsaXN0ZW5lciBkaWRuJ3QgcmV0dXJuZWQgdHJ1ZSBvciBhIFByb21pc2UsIG9yIGNhbGxlZFxuICAgICAgICAgIC8vIHdyYXBwZWRTZW5kUmVzcG9uc2Ugc3luY2hyb25vdXNseSwgd2UgY2FuIGV4aXQgZWFybGllclxuICAgICAgICAgIC8vIGJlY2F1c2UgdGhlcmUgd2lsbCBiZSBubyByZXNwb25zZSBzZW50IGZyb20gdGhpcyBsaXN0ZW5lci5cblxuICAgICAgICAgIGlmIChyZXN1bHQgIT09IHRydWUgJiYgIWlzUmVzdWx0VGhlbmFibGUgJiYgIWRpZENhbGxTZW5kUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IC8vIEEgc21hbGwgaGVscGVyIHRvIHNlbmQgdGhlIG1lc3NhZ2UgaWYgdGhlIHByb21pc2UgcmVzb2x2ZXNcbiAgICAgICAgICAvLyBhbmQgYW4gZXJyb3IgaWYgdGhlIHByb21pc2UgcmVqZWN0cyAoYSB3cmFwcGVkIHNlbmRNZXNzYWdlIGhhc1xuICAgICAgICAgIC8vIHRvIHRyYW5zbGF0ZSB0aGUgbWVzc2FnZSBpbnRvIGEgcmVzb2x2ZWQgcHJvbWlzZSBvciBhIHJlamVjdGVkXG4gICAgICAgICAgLy8gcHJvbWlzZSkuXG5cblxuICAgICAgICAgIGNvbnN0IHNlbmRQcm9taXNlZFJlc3VsdCA9IHByb21pc2UgPT4ge1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKG1zZyA9PiB7XG4gICAgICAgICAgICAgIC8vIHNlbmQgdGhlIG1lc3NhZ2UgdmFsdWUuXG4gICAgICAgICAgICAgIHNlbmRSZXNwb25zZShtc2cpO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAvLyBTZW5kIGEgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJyb3IgaWYgdGhlIHJlamVjdGVkIHZhbHVlXG4gICAgICAgICAgICAgIC8vIGlzIGFuIGluc3RhbmNlIG9mIGVycm9yLCBvciB0aGUgb2JqZWN0IGl0c2VsZiBvdGhlcndpc2UuXG4gICAgICAgICAgICAgIGxldCBtZXNzYWdlO1xuXG4gICAgICAgICAgICAgIGlmIChlcnJvciAmJiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciB8fCB0eXBlb2YgZXJyb3IubWVzc2FnZSA9PT0gXCJzdHJpbmdcIikpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gXCJBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycmVkXCI7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBzZW5kUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgIF9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgLy8gUHJpbnQgYW4gZXJyb3Igb24gdGhlIGNvbnNvbGUgaWYgdW5hYmxlIHRvIHNlbmQgdGhlIHJlc3BvbnNlLlxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHNlbmQgb25NZXNzYWdlIHJlamVjdGVkIHJlcGx5XCIsIGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9OyAvLyBJZiB0aGUgbGlzdGVuZXIgcmV0dXJuZWQgYSBQcm9taXNlLCBzZW5kIHRoZSByZXNvbHZlZCB2YWx1ZSBhcyBhXG4gICAgICAgICAgLy8gcmVzdWx0LCBvdGhlcndpc2Ugd2FpdCB0aGUgcHJvbWlzZSByZWxhdGVkIHRvIHRoZSB3cmFwcGVkU2VuZFJlc3BvbnNlXG4gICAgICAgICAgLy8gY2FsbGJhY2sgdG8gcmVzb2x2ZSBhbmQgc2VuZCBpdCBhcyBhIHJlc3BvbnNlLlxuXG5cbiAgICAgICAgICBpZiAoaXNSZXN1bHRUaGVuYWJsZSkge1xuICAgICAgICAgICAgc2VuZFByb21pc2VkUmVzdWx0KHJlc3VsdCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbmRQcm9taXNlZFJlc3VsdChzZW5kUmVzcG9uc2VQcm9taXNlKTtcbiAgICAgICAgICB9IC8vIExldCBDaHJvbWUga25vdyB0aGF0IHRoZSBsaXN0ZW5lciBpcyByZXBseWluZy5cblxuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgd3JhcHBlZFNlbmRNZXNzYWdlQ2FsbGJhY2sgPSAoe1xuICAgICAgICByZWplY3QsXG4gICAgICAgIHJlc29sdmVcbiAgICAgIH0sIHJlcGx5KSA9PiB7XG4gICAgICAgIGlmIChleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgICAgLy8gRGV0ZWN0IHdoZW4gbm9uZSBvZiB0aGUgbGlzdGVuZXJzIHJlcGxpZWQgdG8gdGhlIHNlbmRNZXNzYWdlIGNhbGwgYW5kIHJlc29sdmVcbiAgICAgICAgICAvLyB0aGUgcHJvbWlzZSB0byB1bmRlZmluZWQgYXMgaW4gRmlyZWZveC5cbiAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvd2ViZXh0ZW5zaW9uLXBvbHlmaWxsL2lzc3Vlcy8xMzBcbiAgICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlID09PSBDSFJPTUVfU0VORF9NRVNTQUdFX0NBTExCQUNLX05PX1JFU1BPTlNFX01FU1NBR0UpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChyZXBseSAmJiByZXBseS5fX21veldlYkV4dGVuc2lvblBvbHlmaWxsUmVqZWN0X18pIHtcbiAgICAgICAgICAvLyBDb252ZXJ0IGJhY2sgdGhlIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIGVycm9yIGludG9cbiAgICAgICAgICAvLyBhbiBFcnJvciBpbnN0YW5jZS5cbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKHJlcGx5Lm1lc3NhZ2UpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHJlcGx5KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3Qgd3JhcHBlZFNlbmRNZXNzYWdlID0gKG5hbWUsIG1ldGFkYXRhLCBhcGlOYW1lc3BhY2VPYmosIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgbWV0YWRhdGEubWluQXJncykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbGVhc3QgJHttZXRhZGF0YS5taW5BcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5taW5BcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXJncy5sZW5ndGggPiBtZXRhZGF0YS5tYXhBcmdzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBtb3N0ICR7bWV0YWRhdGEubWF4QXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWF4QXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBjb25zdCB3cmFwcGVkQ2IgPSB3cmFwcGVkU2VuZE1lc3NhZ2VDYWxsYmFjay5iaW5kKG51bGwsIHtcbiAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICByZWplY3RcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBhcmdzLnB1c2god3JhcHBlZENiKTtcbiAgICAgICAgICBhcGlOYW1lc3BhY2VPYmouc2VuZE1lc3NhZ2UoLi4uYXJncyk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgY29uc3Qgc3RhdGljV3JhcHBlcnMgPSB7XG4gICAgICAgIHJ1bnRpbWU6IHtcbiAgICAgICAgICBvbk1lc3NhZ2U6IHdyYXBFdmVudChvbk1lc3NhZ2VXcmFwcGVycyksXG4gICAgICAgICAgb25NZXNzYWdlRXh0ZXJuYWw6IHdyYXBFdmVudChvbk1lc3NhZ2VXcmFwcGVycyksXG4gICAgICAgICAgc2VuZE1lc3NhZ2U6IHdyYXBwZWRTZW5kTWVzc2FnZS5iaW5kKG51bGwsIFwic2VuZE1lc3NhZ2VcIiwge1xuICAgICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICAgIG1heEFyZ3M6IDNcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB0YWJzOiB7XG4gICAgICAgICAgc2VuZE1lc3NhZ2U6IHdyYXBwZWRTZW5kTWVzc2FnZS5iaW5kKG51bGwsIFwic2VuZE1lc3NhZ2VcIiwge1xuICAgICAgICAgICAgbWluQXJnczogMixcbiAgICAgICAgICAgIG1heEFyZ3M6IDNcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3Qgc2V0dGluZ01ldGFkYXRhID0ge1xuICAgICAgICBjbGVhcjoge1xuICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgbWF4QXJnczogMVxuICAgICAgICB9LFxuICAgICAgICBnZXQ6IHtcbiAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgIG1heEFyZ3M6IDFcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiB7XG4gICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICBtYXhBcmdzOiAxXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBhcGlNZXRhZGF0YS5wcml2YWN5ID0ge1xuICAgICAgICBuZXR3b3JrOiB7XG4gICAgICAgICAgXCIqXCI6IHNldHRpbmdNZXRhZGF0YVxuICAgICAgICB9LFxuICAgICAgICBzZXJ2aWNlczoge1xuICAgICAgICAgIFwiKlwiOiBzZXR0aW5nTWV0YWRhdGFcbiAgICAgICAgfSxcbiAgICAgICAgd2Vic2l0ZXM6IHtcbiAgICAgICAgICBcIipcIjogc2V0dGluZ01ldGFkYXRhXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gd3JhcE9iamVjdChleHRlbnNpb25BUElzLCBzdGF0aWNXcmFwcGVycywgYXBpTWV0YWRhdGEpO1xuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIGNocm9tZSAhPSBcIm9iamVjdFwiIHx8ICFjaHJvbWUgfHwgIWNocm9tZS5ydW50aW1lIHx8ICFjaHJvbWUucnVudGltZS5pZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBzY3JpcHQgc2hvdWxkIG9ubHkgYmUgbG9hZGVkIGluIGEgYnJvd3NlciBleHRlbnNpb24uXCIpO1xuICAgIH0gLy8gVGhlIGJ1aWxkIHByb2Nlc3MgYWRkcyBhIFVNRCB3cmFwcGVyIGFyb3VuZCB0aGlzIGZpbGUsIHdoaWNoIG1ha2VzIHRoZVxuICAgIC8vIGBtb2R1bGVgIHZhcmlhYmxlIGF2YWlsYWJsZS5cblxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB3cmFwQVBJcyhjaHJvbWUpO1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gYnJvd3NlcjtcbiAgfVxufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1icm93c2VyLXBvbHlmaWxsLmpzLm1hcFxuIiwiaW1wb3J0IHsgbWFuYWdlbWVudCwgcnVudGltZSwgc3RvcmFnZSwgd2luZG93cyB9IGZyb20gJ3dlYmV4dGVuc2lvbi1wb2x5ZmlsbCc7XG5cbi8vIFNpZ24gdXAgYXQgaHR0cHM6Ly9leHRlbnNpb25wYXkuY29tIHRvIHVzZSB0aGlzIGxpYnJhcnkuIEFHUEx2MyBsaWNlbnNlZC5cblxuXG4vLyBGb3IgcnVubmluZyBhcyBhIGNvbnRlbnQgc2NyaXB0LiBSZWNlaXZlIGEgbWVzc2FnZSBmcm9tIHRoZSBzdWNjZXNzZnVsIHBheW1lbnRzIHBhZ2Vcbi8vIGFuZCBwYXNzIGl0IG9uIHRvIHRoZSBiYWNrZ3JvdW5kIHBhZ2UgdG8gcXVlcnkgaWYgdGhlIHVzZXIgaGFzIHBhaWQuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQub3JpZ2luICE9PSAnaHR0cHM6Ly9leHRlbnNpb25wYXkuY29tJykgcmV0dXJuO1xuICAgICAgICBpZiAoZXZlbnQuc291cmNlICE9IHdpbmRvdykgcmV0dXJuO1xuICAgICAgICBpZiAoZXZlbnQuZGF0YSA9PT0gJ2ZldGNoLXVzZXInIHx8IGV2ZW50LmRhdGEgPT09ICd0cmlhbC1zdGFydCcpIHtcbiAgICAgICAgICAgIHJ1bnRpbWUuc2VuZE1lc3NhZ2UoZXZlbnQuZGF0YSk7XG4gICAgICAgIH1cbiAgICB9LCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIEV4dFBheShleHRlbnNpb25faWQpIHtcblxuICAgIGNvbnN0IEhPU1QgPSBgaHR0cHM6Ly9leHRlbnNpb25wYXkuY29tYDtcbiAgICBjb25zdCBFWFRFTlNJT05fVVJMID0gYCR7SE9TVH0vZXh0ZW5zaW9uLyR7ZXh0ZW5zaW9uX2lkfWA7XG5cbiAgICBmdW5jdGlvbiB0aW1lb3V0KG1zKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcbiAgICB9XG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHN0b3JhZ2Uuc3luYy5nZXQoa2V5KVxuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIC8vIGlmIHN5bmMgbm90IGF2YWlsYWJsZSAobGlrZSB3aXRoIEZpcmVmb3ggdGVtcCBhZGRvbnMpLCBmYWxsIGJhY2sgdG8gbG9jYWxcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBzdG9yYWdlLmxvY2FsLmdldChrZXkpXG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgZnVuY3Rpb24gc2V0KGRpY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBzdG9yYWdlLnN5bmMuc2V0KGRpY3QpXG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgLy8gaWYgc3luYyBub3QgYXZhaWxhYmxlIChsaWtlIHdpdGggRmlyZWZveCB0ZW1wIGFkZG9ucyksIGZhbGwgYmFjayB0byBsb2NhbFxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHN0b3JhZ2UubG9jYWwuc2V0KGRpY3QpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAtLS0tLSBzdGFydCBjb25maWd1cmF0aW9uIGNoZWNrc1xuICAgIG1hbmFnZW1lbnQgJiYgbWFuYWdlbWVudC5nZXRTZWxmKCkudGhlbihhc3luYyAoZXh0X2luZm8pID0+IHtcbiAgICAgICAgaWYgKCFleHRfaW5mby5wZXJtaXNzaW9ucy5pbmNsdWRlcygnc3RvcmFnZScpKSB7XG4gICAgICAgICAgICB2YXIgcGVybWlzc2lvbnMgPSBleHRfaW5mby5ob3N0UGVybWlzc2lvbnMuY29uY2F0KGV4dF9pbmZvLnBlcm1pc3Npb25zKTtcbiAgICAgICAgICAgIHRocm93IGBFeHRQYXkgU2V0dXAgRXJyb3I6IHBsZWFzZSBpbmNsdWRlIHRoZSBcInN0b3JhZ2VcIiBwZXJtaXNzaW9uIGluIG1hbmlmZXN0Lmpzb25bXCJwZXJtaXNzaW9uc1wiXSBvciBlbHNlIEV4dGVuc2lvblBheSB3b24ndCB3b3JrIGNvcnJlY3RseS5cblxuWW91IGNhbiBjb3B5IGFuZCBwYXN0ZSB0aGlzIHRvIHlvdXIgbWFuaWZlc3QuanNvbiBmaWxlIHRvIGZpeCB0aGlzIGVycm9yOlxuXG5cInBlcm1pc3Npb25zXCI6IFtcbiAgICAke3Blcm1pc3Npb25zLm1hcCh4ID0+IGBcIiAgICAke3h9XCJgKS5qb2luKCcsXFxuJyl9JHtwZXJtaXNzaW9ucy5sZW5ndGggPiAwID8gJywnIDogJyd9XG4gICAgXCJzdG9yYWdlXCJcbl1cbmBcbiAgICAgICAgfVxuXG4gICAgfSk7XG4gICAgLy8gLS0tLS0gZW5kIGNvbmZpZ3VyYXRpb24gY2hlY2tzXG5cbiAgICAvLyBydW4gb24gXCJpbnN0YWxsXCJcbiAgICBnZXQoWydleHRlbnNpb25wYXlfaW5zdGFsbGVkX2F0JywgJ2V4dGVuc2lvbnBheV91c2VyJ10pLnRoZW4oYXN5bmMgKHN0b3JhZ2UpID0+IHtcbiAgICAgICAgaWYgKHN0b3JhZ2UuZXh0ZW5zaW9ucGF5X2luc3RhbGxlZF9hdCkgcmV0dXJuO1xuXG4gICAgICAgIC8vIE1pZ3JhdGlvbiBjb2RlOiBiZWZvcmUgdjIuMSBpbnN0YWxsZWRBdCBjYW1lIGZyb20gdGhlIHNlcnZlclxuICAgICAgICAvLyBzbyB1c2UgdGhhdCBzdG9yZWQgZGF0ZXRpbWUgaW5zdGVhZCBvZiBtYWtpbmcgYSBuZXcgb25lLlxuICAgICAgICBjb25zdCB1c2VyID0gc3RvcmFnZS5leHRlbnNpb25wYXlfdXNlcjtcbiAgICAgICAgY29uc3QgZGF0ZSA9IHVzZXIgPyB1c2VyLmluc3RhbGxlZEF0IDogKG5ldyBEYXRlKCkpLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIGF3YWl0IHNldCh7J2V4dGVuc2lvbnBheV9pbnN0YWxsZWRfYXQnOiBkYXRlfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYWlkX2NhbGxiYWNrcyA9IFtdO1xuICAgIGNvbnN0IHRyaWFsX2NhbGxiYWNrcyA9ICBbXTtcblxuICAgIGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZV9rZXkoKSB7XG4gICAgICAgIHZhciBib2R5ID0ge307XG4gICAgICAgIHZhciBleHRfaW5mbztcbiAgICAgICAgaWYgKG1hbmFnZW1lbnQpIHtcbiAgICAgICAgICAgIGV4dF9pbmZvID0gYXdhaXQgbWFuYWdlbWVudC5nZXRTZWxmKCk7XG4gICAgICAgIH0gZWxzZSBpZiAocnVudGltZSkge1xuICAgICAgICAgICAgZXh0X2luZm8gPSBhd2FpdCBydW50aW1lLnNlbmRNZXNzYWdlKCdleHRwYXktZXh0aW5mbycpOyAvLyBhc2sgYmFja2dyb3VuZCBwYWdlIGZvciBleHQgaW5mb1xuICAgICAgICAgICAgaWYgKCFleHRfaW5mbykge1xuICAgICAgICAgICAgICAgIC8vIFNhZmFyaSBkb2Vzbid0IHN1cHBvcnQgYnJvd3Nlci5tYW5hZ2VtZW50IGZvciBzb21lIHJlYXNvblxuICAgICAgICAgICAgICAgIGNvbnN0IGlzX2Rldl9tb2RlID0gISgndXBkYXRlX3VybCcgaW4gcnVudGltZS5nZXRNYW5pZmVzdCgpKTtcbiAgICAgICAgICAgICAgICBleHRfaW5mbyA9IHtpbnN0YWxsVHlwZTogaXNfZGV2X21vZGUgPyAnZGV2ZWxvcG1lbnQnIDogJ25vcm1hbCd9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgJ0V4dFBheSBuZWVkcyB0byBiZSBydW4gaW4gYSBicm93c2VyIGV4dGVuc2lvbiBjb250ZXh0J1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV4dF9pbmZvLmluc3RhbGxUeXBlID09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgICAgICAgIGJvZHkuZGV2ZWxvcG1lbnQgPSB0cnVlO1xuICAgICAgICB9IFxuXG4gICAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBmZXRjaChgJHtFWFRFTlNJT05fVVJMfS9hcGkvbmV3LWtleWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcmVzcC5vaykge1xuICAgICAgICAgICAgdGhyb3cgcmVzcC5zdGF0dXMsIGAke0hPU1R9L2hvbWVgXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXBpX2tleSA9IGF3YWl0IHJlc3AuanNvbigpO1xuICAgICAgICBhd2FpdCBzZXQoe2V4dGVuc2lvbnBheV9hcGlfa2V5OiBhcGlfa2V5fSk7XG4gICAgICAgIHJldHVybiBhcGlfa2V5O1xuICAgIH1cblxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldF9rZXkoKSB7XG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSBhd2FpdCBnZXQoWydleHRlbnNpb25wYXlfYXBpX2tleSddKTtcbiAgICAgICAgaWYgKHN0b3JhZ2UuZXh0ZW5zaW9ucGF5X2FwaV9rZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdG9yYWdlLmV4dGVuc2lvbnBheV9hcGlfa2V5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGV0aW1lX3JlID0gL15cXGRcXGRcXGRcXGQtXFxkXFxkLVxcZFxcZFQvO1xuXG4gICAgYXN5bmMgZnVuY3Rpb24gZmV0Y2hfdXNlcigpIHtcbiAgICAgICAgdmFyIHN0b3JhZ2UgPSBhd2FpdCBnZXQoWydleHRlbnNpb25wYXlfdXNlcicsICdleHRlbnNpb25wYXlfaW5zdGFsbGVkX2F0J10pO1xuICAgICAgICBjb25zdCBhcGlfa2V5ID0gYXdhaXQgZ2V0X2tleSgpO1xuICAgICAgICBpZiAoIWFwaV9rZXkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcGFpZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcGFpZEF0OiBudWxsLFxuICAgICAgICAgICAgICAgIGluc3RhbGxlZEF0OiBzdG9yYWdlLmV4dGVuc2lvbnBheV9pbnN0YWxsZWRfYXQgPyBuZXcgRGF0ZShzdG9yYWdlLmV4dGVuc2lvbnBheV9pbnN0YWxsZWRfYXQpIDogbmV3IERhdGUoKSwgLy8gc29tZXRpbWVzIHRoaXMgZnVuY3Rpb24gZ2V0cyBjYWxsZWQgYmVmb3JlIHRoZSBpbml0aWFsIGluc3RhbGwgdGltZSBjYW4gYmUgZmx1c2hlZCB0byBzdG9yYWdlXG4gICAgICAgICAgICAgICAgdHJpYWxTdGFydGVkQXQ6IG51bGwsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgZmV0Y2goYCR7RVhURU5TSU9OX1VSTH0vYXBpL3VzZXI/YXBpX2tleT0ke2FwaV9rZXl9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gVE9ETzogdGhpbmsgaGFyZGVyIGFib3V0IGVycm9yIHN0YXRlcyBhbmQgd2hhdCB1c2VycyB3aWxsIHdhbnQgKGJhZCBjb25uZWN0aW9uLCBzZXJ2ZXIgZXJyb3IsIGlkIG5vdCBmb3VuZClcbiAgICAgICAgaWYgKCFyZXNwLm9rKSB0aHJvdyAnRXh0UGF5IGVycm9yIHdoaWxlIGZldGNoaW5nIHVzZXI6ICcrKGF3YWl0IHJlc3AudGV4dCgpKVxuXG4gICAgICAgIGNvbnN0IHVzZXJfZGF0YSA9IGF3YWl0IHJlc3AuanNvbigpO1xuXG4gICAgICAgIGNvbnN0IHBhcnNlZF91c2VyID0ge307XG4gICAgICAgIGZvciAodmFyIFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh1c2VyX2RhdGEpKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUubWF0Y2ggJiYgdmFsdWUubWF0Y2goZGF0ZXRpbWVfcmUpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJzZWRfdXNlcltrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcGFyc2VkX3VzZXIuaW5zdGFsbGVkQXQgPSBuZXcgRGF0ZShzdG9yYWdlLmV4dGVuc2lvbnBheV9pbnN0YWxsZWRfYXQpO1xuICAgICAgICAgIFxuXG4gICAgICAgIGlmIChwYXJzZWRfdXNlci5wYWlkQXQpIHtcbiAgICAgICAgICAgIGlmICghc3RvcmFnZS5leHRlbnNpb25wYXlfdXNlciB8fCAoc3RvcmFnZS5leHRlbnNpb25wYXlfdXNlciAmJiAhc3RvcmFnZS5leHRlbnNpb25wYXlfdXNlci5wYWlkQXQpKSB7XG4gICAgICAgICAgICAgICAgcGFpZF9jYWxsYmFja3MuZm9yRWFjaChjYiA9PiBjYihwYXJzZWRfdXNlcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJzZWRfdXNlci50cmlhbFN0YXJ0ZWRBdCkge1xuICAgICAgICAgICAgaWYgKCFzdG9yYWdlLmV4dGVuc2lvbnBheV91c2VyIHx8IChzdG9yYWdlLmV4dGVuc2lvbnBheV91c2VyICYmICFzdG9yYWdlLmV4dGVuc2lvbnBheV91c2VyLnRyaWFsU3RhcnRlZEF0KSkge1xuICAgICAgICAgICAgICAgIHRyaWFsX2NhbGxiYWNrcy5mb3JFYWNoKGNiID0+IGNiKHBhcnNlZF91c2VyKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBzZXQoe2V4dGVuc2lvbnBheV91c2VyOiB1c2VyX2RhdGF9KTtcblxuICAgICAgICByZXR1cm4gcGFyc2VkX3VzZXI7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gcGF5bWVudF9wYWdlX2xpbmsoKSB7XG4gICAgICAgIHZhciBhcGlfa2V5ID0gYXdhaXQgZ2V0X2tleSgpO1xuICAgICAgICBpZiAoIWFwaV9rZXkpIHtcbiAgICAgICAgICAgIGFwaV9rZXkgPSBhd2FpdCBjcmVhdGVfa2V5KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAke0VYVEVOU0lPTl9VUkx9P2FwaV9rZXk9JHthcGlfa2V5fWBcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBvcGVuX3BvcHVwKHVybCwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICBpZiAod2luZG93cyAmJiB3aW5kb3dzLmNyZWF0ZSkge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudF93aW5kb3cgPSBhd2FpdCB3aW5kb3dzLmdldEN1cnJlbnQoKTtcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS82ODQ1Njg1OFxuICAgICAgICAgICAgY29uc3QgbGVmdCA9IE1hdGgucm91bmQoKGN1cnJlbnRfd2luZG93LndpZHRoIC0gd2lkdGgpICogMC41ICsgY3VycmVudF93aW5kb3cubGVmdCk7XG4gICAgICAgICAgICBjb25zdCB0b3AgPSBNYXRoLnJvdW5kKChjdXJyZW50X3dpbmRvdy5oZWlnaHQgLSBoZWlnaHQpICogMC41ICsgY3VycmVudF93aW5kb3cudG9wKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgd2luZG93cy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJwb3B1cFwiLFxuICAgICAgICAgICAgICAgICAgICBmb2N1c2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgICAgICAgICB0b3BcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgIC8vIGZpcmVmb3ggZG9lc24ndCBzdXBwb3J0ICdmb2N1c2VkJ1xuICAgICAgICAgICAgICAgIHdpbmRvd3MuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicG9wdXBcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgICAgICAgICAgdG9wXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBmb3Igb3BlbmluZyBmcm9tIGEgY29udGVudCBzY3JpcHRcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3cvb3BlblxuICAgICAgICAgICAgd2luZG93Lm9wZW4odXJsLCBudWxsLCBgdG9vbGJhcj1ubyxsb2NhdGlvbj1ubyxkaXJlY3Rvcmllcz1ubyxzdGF0dXM9bm8sbWVudWJhcj1ubyx3aWR0aD0ke3dpZHRofSxoZWlnaHQ9JHtoZWlnaHR9LGxlZnQ9NDUwYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBvcGVuX3BheW1lbnRfcGFnZSgpIHtcbiAgICAgICAgY29uc3QgdXJsID0gYXdhaXQgcGF5bWVudF9wYWdlX2xpbmsoKTtcbiAgICAgICAgb3Blbl9wb3B1cCh1cmwsIDUwMCwgODAwKTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBvcGVuX3RyaWFsX3BhZ2UocGVyaW9kKSB7XG4gICAgICAgIC8vIGxldCB1c2VyIGhhdmUgcGVyaW9kIHN0cmluZyBsaWtlICcxIHdlZWsnIGUuZy4gXCJzdGFydCB5b3VyIDEgd2VlayBmcmVlIHRyaWFsXCJcblxuICAgICAgICB2YXIgYXBpX2tleSA9IGF3YWl0IGdldF9rZXkoKTtcbiAgICAgICAgaWYgKCFhcGlfa2V5KSB7XG4gICAgICAgICAgICBhcGlfa2V5ID0gYXdhaXQgY3JlYXRlX2tleSgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB1cmwgPSBgJHtFWFRFTlNJT05fVVJMfS90cmlhbD9hcGlfa2V5PSR7YXBpX2tleX1gO1xuICAgICAgICBpZiAocGVyaW9kKSB7XG4gICAgICAgICAgICB1cmwgKz0gYCZwZXJpb2Q9JHtwZXJpb2R9YDtcbiAgICAgICAgfVxuICAgICAgICBvcGVuX3BvcHVwKHVybCwgNTAwLCA2NTApO1xuICAgIH1cbiAgICBhc3luYyBmdW5jdGlvbiBvcGVuX2xvZ2luX3BhZ2UoKSB7XG4gICAgICAgIHZhciBhcGlfa2V5ID0gYXdhaXQgZ2V0X2tleSgpO1xuICAgICAgICBpZiAoIWFwaV9rZXkpIHtcbiAgICAgICAgICAgIGFwaV9rZXkgPSBhd2FpdCBjcmVhdGVfa2V5KCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXJsID0gYCR7RVhURU5TSU9OX1VSTH0vcmVhY3RpdmF0ZT9hcGlfa2V5PSR7YXBpX2tleX1gO1xuICAgICAgICBvcGVuX3BvcHVwKHVybCwgNTAwLCA4MDApO1xuICAgIH1cblxuICAgIHZhciBwb2xsaW5nID0gZmFsc2U7XG4gICAgYXN5bmMgZnVuY3Rpb24gcG9sbF91c2VyX3BhaWQoKSB7XG4gICAgICAgIC8vIGtlZXAgdHJ5aW5nIHRvIGZldGNoIHVzZXIgaW4gY2FzZSBzdHJpcGUgd2ViaG9vayBpcyBsYXRlXG4gICAgICAgIGlmIChwb2xsaW5nKSByZXR1cm47XG4gICAgICAgIHBvbGxpbmcgPSB0cnVlO1xuICAgICAgICB2YXIgdXNlciA9IGF3YWl0IGZldGNoX3VzZXIoKTtcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpIDwgMio2MDsgKytpKSB7XG4gICAgICAgICAgICBpZiAodXNlci5wYWlkQXQpIHtcbiAgICAgICAgICAgICAgICBwb2xsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCB0aW1lb3V0KDEwMDApO1xuICAgICAgICAgICAgdXNlciA9IGF3YWl0IGZldGNoX3VzZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBwb2xsaW5nID0gZmFsc2U7XG4gICAgfVxuXG5cbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRVc2VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBmZXRjaF91c2VyKClcbiAgICAgICAgfSxcbiAgICAgICAgb25QYWlkOiB7XG4gICAgICAgICAgICBhZGRMaXN0ZW5lcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50X3NjcmlwdF90ZW1wbGF0ZSA9IGBcImNvbnRlbnRfc2NyaXB0c1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgXCJtYXRjaGVzXCI6IFtcIiR7SE9TVH0vKlwiXSxcbiAgICAgICAgICAgIFwianNcIjogW1wiRXh0UGF5LmpzXCJdLFxuICAgICAgICAgICAgXCJydW5fYXRcIjogXCJkb2N1bWVudF9zdGFydFwiXG4gICAgICAgIH1dYDtcbiAgICAgICAgICAgICAgICBjb25zdCBtYW5pZmVzdCA9IHJ1bnRpbWUuZ2V0TWFuaWZlc3QoKTtcbiAgICAgICAgICAgICAgICBpZiAoIW1hbmlmZXN0LmNvbnRlbnRfc2NyaXB0cykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBgRXh0UGF5IHNldHVwIGVycm9yOiBUbyB1c2UgdGhlIG9uUGFpZCBjYWxsYmFjayBoYW5kbGVyLCBwbGVhc2UgaW5jbHVkZSBFeHRQYXkgYXMgYSBjb250ZW50IHNjcmlwdCBpbiB5b3VyIG1hbmlmZXN0Lmpzb24uIFlvdSBjYW4gY29weSB0aGUgZXhhbXBsZSBiZWxvdyBpbnRvIHlvdXIgbWFuaWZlc3QuanNvbiBvciBjaGVjayB0aGUgZG9jczogaHR0cHM6Ly9naXRodWIuY29tL0dsZW5jaC9FeHRQYXkjMi1jb25maWd1cmUteW91ci1tYW5pZmVzdGpzb25cblxuICAgICAgICAke2NvbnRlbnRfc2NyaXB0X3RlbXBsYXRlfWBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgZXh0cGF5X2NvbnRlbnRfc2NyaXB0X2VudHJ5ID0gbWFuaWZlc3QuY29udGVudF9zY3JpcHRzLmZpbmQob2JqID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZpbmcgcG9ydCBudW1iZXIgYmVjYXVzZSBmaXJlZm94IGlnbm9yZXMgY29udGVudCBzY3JpcHRzIHdpdGggcG9ydCBudW1iZXJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iai5tYXRjaGVzLmluY2x1ZGVzKEhPU1QucmVwbGFjZSgnOjMwMDAnLCAnJykrJy8qJylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoIWV4dHBheV9jb250ZW50X3NjcmlwdF9lbnRyeSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBgRXh0UGF5IHNldHVwIGVycm9yOiBUbyB1c2UgdGhlIG9uUGFpZCBjYWxsYmFjayBoYW5kbGVyLCBwbGVhc2UgaW5jbHVkZSBFeHRQYXkgYXMgYSBjb250ZW50IHNjcmlwdCBpbiB5b3VyIG1hbmlmZXN0Lmpzb24gbWF0Y2hpbmcgXCIke0hPU1R9LypcIi4gWW91IGNhbiBjb3B5IHRoZSBleGFtcGxlIGJlbG93IGludG8geW91ciBtYW5pZmVzdC5qc29uIG9yIGNoZWNrIHRoZSBkb2NzOiBodHRwczovL2dpdGh1Yi5jb20vR2xlbmNoL0V4dFBheSMyLWNvbmZpZ3VyZS15b3VyLW1hbmlmZXN0anNvblxuXG4gICAgICAgICR7Y29udGVudF9zY3JpcHRfdGVtcGxhdGV9YFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZXh0cGF5X2NvbnRlbnRfc2NyaXB0X2VudHJ5LnJ1bl9hdCB8fCBleHRwYXlfY29udGVudF9zY3JpcHRfZW50cnkucnVuX2F0ICE9PSAnZG9jdW1lbnRfc3RhcnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBgRXh0UGF5IHNldHVwIGVycm9yOiBUbyB1c2UgdGhlIG9uUGFpZCBjYWxsYmFjayBoYW5kbGVyLCBwbGVhc2UgbWFrZSBzdXJlIHRoZSBFeHRQYXkgY29udGVudCBzY3JpcHQgaW4geW91ciBtYW5pZmVzdC5qc29uIHJ1bnMgYXQgZG9jdW1lbnQgc3RhcnQuIFlvdSBjYW4gY29weSB0aGUgZXhhbXBsZSBiZWxvdyBpbnRvIHlvdXIgbWFuaWZlc3QuanNvbiBvciBjaGVjayB0aGUgZG9jczogaHR0cHM6Ly9naXRodWIuY29tL0dsZW5jaC9FeHRQYXkjMi1jb25maWd1cmUteW91ci1tYW5pZmVzdGpzb25cblxuICAgICAgICAke2NvbnRlbnRfc2NyaXB0X3RlbXBsYXRlfWBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHBhaWRfY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHJlbW92ZUxpc3RlbmVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgLy8gICAgIC8vIFRPRE9cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3BlblBheW1lbnRQYWdlOiBvcGVuX3BheW1lbnRfcGFnZSxcbiAgICAgICAgb3BlblRyaWFsUGFnZTogb3Blbl90cmlhbF9wYWdlLFxuICAgICAgICBvcGVuTG9naW5QYWdlOiBvcGVuX2xvZ2luX3BhZ2UsXG4gICAgICAgIG9uVHJpYWxTdGFydGVkOiB7XG4gICAgICAgICAgICBhZGRMaXN0ZW5lcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB0cmlhbF9jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHN0YXJ0QmFja2dyb3VuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbihtZXNzYWdlLCBzZW5kZXIsIHNlbmRfcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2VydmljZSB3b3JrZXIgZ290IG1lc3NhZ2UhIEhlcmUgaXQgaXM6JywgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UgPT0gJ2ZldGNoLXVzZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgY2FsbGVkIHZpYSBleHRlbnNpb25wYXkuY29tL2V4dGVuc2lvbi9bZXh0ZW5zaW9uLWlkXS9wYWlkIC0+IGNvbnRlbnRfc2NyaXB0IHdoZW4gdXNlciBzdWNjZXNzZnVsbHkgcGF5cy5cbiAgICAgICAgICAgICAgICAgICAgLy8gSXQncyBwb3NzaWJsZSBhdHRhY2tlcnMgY291bGQgdHJpZ2dlciB0aGlzIGJ1dCB0aGF0IGlzIGJhc2ljYWxseSBoYXJtbGVzcy4gSXQgd291bGQganVzdCBxdWVyeSB0aGUgdXNlci5cbiAgICAgICAgICAgICAgICAgICAgcG9sbF91c2VyX3BhaWQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UgPT0gJ3RyaWFsLXN0YXJ0Jykge1xuICAgICAgICAgICAgICAgICAgICAvLyBubyBuZWVkIHRvIHBvbGwgc2luY2UgdGhlIHRyaWFsIGNvbmZpcm1hdGlvbiBwYWdlIGhhcyBhbHJlYWR5IHNldCB0cmlhbFN0YXJ0ZWRBdFxuICAgICAgICAgICAgICAgICAgICBmZXRjaF91c2VyKCk7IFxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZSA9PSAnZXh0cGF5LWV4dGluZm8nICYmIG1hbmFnZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHRoaXMgbWVzc2FnZSBmcm9tIGNvbnRlbnQgc2NyaXB0cyB3aGljaCBjYW4ndCBhY2Nlc3MgYnJvd3Nlci5tYW5hZ2VtZW50XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYW5hZ2VtZW50LmdldFNlbGYoKVxuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXh0UGF5O1xuIl0sIm5hbWVzIjpbInRoaXMiLCJtb2R1bGUiLCJwcm94eVRhcmdldCIsInZhbHVlIiwibWVzc2FnZSIsInJ1bnRpbWUiLCJzdG9yYWdlIiwibWFuYWdlbWVudCIsIndpbmRvd3MiXSwibWFwcGluZ3MiOiI7OztBQUFBLEdBQUMsU0FBVSxRQUFRLFNBQVM7QUFHaUI7QUFDekMsY0FBUSxNQUFNO0FBQUEsSUFPZjtBQUFBLEVBQ0gsR0FBRyxPQUFPLGVBQWUsY0FBYyxhQUFhLE9BQU8sU0FBUyxjQUFjLE9BQU9BLGdCQUFNLFNBQVVDLFNBQVE7QUFZL0csUUFB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
