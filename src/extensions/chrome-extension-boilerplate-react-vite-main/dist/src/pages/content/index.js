const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  return Promise.all(deps.map((dep) => {
    dep = assetsURL(dep);
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule());
};
console.log("content loaded");
__vitePreload(() => {
  const dynamicImport = (path) => import(path);
  dynamicImport(
    "../../../assets/js/index.js"
  );
}, true ? [] : void 0);
__vitePreload(() => {
  const dynamicImport = (path) => import(path);
  dynamicImport(
    "../../../assets/js/index2.js"
  );
}, true ? [] : void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxRQUFRLElBQUksZ0JBQWdCO0FBTzVCOzs7SUFBTztBQUFBO0FBQUE7QUFDUDs7O0lBQU87QUFBQTtBQUFBIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wYWdlcy9jb250ZW50L2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnNvbGUubG9nKFwiY29udGVudCBsb2FkZWRcIik7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDaHJvbWUgZXh0ZW5zaW9ucyBkb24ndCBzdXBwb3J0IG1vZHVsZXMgaW4gY29udGVudCBzY3JpcHRzLlxuICovXG4vLyBpbXBvcnQoXCIuL2NvbXBvbmVudHMvRGVtb1wiKTtcbmltcG9ydChcIi4vY29tcG9uZW50cy9FeHRQYXlcIik7XG5pbXBvcnQoXCIuL2NvbXBvbmVudHMvUGFnZUJyaWRnZVwiKTtcbiJdLCJmaWxlIjoic3JjL3BhZ2VzL2NvbnRlbnQvaW5kZXguanMifQ==
