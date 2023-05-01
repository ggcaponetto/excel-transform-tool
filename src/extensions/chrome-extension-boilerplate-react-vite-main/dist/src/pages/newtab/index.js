import "../../../assets/js/modulepreload-polyfill.js";
import { j as jsx, a as jsxs, c as createRoot } from "../../../assets/js/jsx-runtime.js";
import { a as addHmrIntoView } from "../../../assets/js/_virtual_reload-on-update-in-view.js";
import "../../../assets/js/_commonjsHelpers.js";
const logo = "/assets/svg/imgLogo.chunk.svg";
const Newtab$2 = "";
const Newtab$1 = "";
const Newtab = () => {
  return /* @__PURE__ */ jsx("div", {
    className: "App",
    children: /* @__PURE__ */ jsxs("header", {
      className: "App-header",
      children: [/* @__PURE__ */ jsx("img", {
        src: logo,
        className: "App-logo",
        alt: "logo"
      }), /* @__PURE__ */ jsxs("p", {
        children: ["Edit ", /* @__PURE__ */ jsx("code", {
          children: "src/pages/newtab/Newtab.tsx"
        }), " and save to reload."]
      }), /* @__PURE__ */ jsx("a", {
        className: "App-link",
        href: "https://reactjs.org",
        target: "_blank",
        rel: "noopener noreferrer",
        children: "Learn React!"
      }), /* @__PURE__ */ jsx("h6", {
        children: "The color of this paragraph is defined using SASS."
      })]
    })
  });
};
const index = "";
addHmrIntoView("pages/newtab");
function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(/* @__PURE__ */ jsx(Newtab, {}));
}
init();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hc3NldHMvaW1nL0xvZ28uc3ZnIiwiLi4vLi4vLi4vLi4vc3JjL3BhZ2VzL25ld3RhYi9OZXd0YWIudHN4IiwiLi4vLi4vLi4vLi4vc3JjL3BhZ2VzL25ld3RhYi9pbmRleC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCJfX1ZJVEVfQVNTRVRfXzJlMjMwMzNhX19cIiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IGxvZ28gZnJvbSBcIkBhc3NldHMvaW1nL0xvZ28uc3ZnXCI7XHJcbmltcG9ydCBcIkBwYWdlcy9uZXd0YWIvTmV3dGFiLmNzc1wiO1xyXG5pbXBvcnQgXCJAcGFnZXMvbmV3dGFiL05ld3RhYi5zY3NzXCI7XHJcblxyXG5jb25zdCBOZXd0YWIgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiQXBwXCI+XHJcbiAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwiQXBwLWhlYWRlclwiPlxyXG4gICAgICAgIDxpbWcgc3JjPXtsb2dvfSBjbGFzc05hbWU9XCJBcHAtbG9nb1wiIGFsdD1cImxvZ29cIiAvPlxyXG4gICAgICAgIDxwPlxyXG4gICAgICAgICAgRWRpdCA8Y29kZT5zcmMvcGFnZXMvbmV3dGFiL05ld3RhYi50c3g8L2NvZGU+IGFuZCBzYXZlIHRvIHJlbG9hZC5cclxuICAgICAgICA8L3A+XHJcbiAgICAgICAgPGFcclxuICAgICAgICAgIGNsYXNzTmFtZT1cIkFwcC1saW5rXCJcclxuICAgICAgICAgIGhyZWY9XCJodHRwczovL3JlYWN0anMub3JnXCJcclxuICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXHJcbiAgICAgICAgICByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICBMZWFybiBSZWFjdCFcclxuICAgICAgICA8L2E+XHJcbiAgICAgICAgPGg2PlRoZSBjb2xvciBvZiB0aGlzIHBhcmFncmFwaCBpcyBkZWZpbmVkIHVzaW5nIFNBU1MuPC9oNj5cclxuICAgICAgPC9oZWFkZXI+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTmV3dGFiO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVSb290IH0gZnJvbSBcInJlYWN0LWRvbS9jbGllbnRcIjtcbmltcG9ydCBOZXd0YWIgZnJvbSBcIkBwYWdlcy9uZXd0YWIvTmV3dGFiXCI7XG5pbXBvcnQgXCJAcGFnZXMvbmV3dGFiL2luZGV4LmNzc1wiO1xuaW1wb3J0IHJlZnJlc2hPblVwZGF0ZSBmcm9tIFwidmlydHVhbDpyZWxvYWQtb24tdXBkYXRlLWluLXZpZXdcIjtcblxucmVmcmVzaE9uVXBkYXRlKFwicGFnZXMvbmV3dGFiXCIpO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBjb25zdCBhcHBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FwcC1jb250YWluZXJcIik7XG4gIGlmICghYXBwQ29udGFpbmVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuIG5vdCBmaW5kICNhcHAtY29udGFpbmVyXCIpO1xuICB9XG4gIGNvbnN0IHJvb3QgPSBjcmVhdGVSb290KGFwcENvbnRhaW5lcik7XG4gIHJvb3QucmVuZGVyKDxOZXd0YWIgLz4pO1xufVxuXG5pbml0KCk7XG4iXSwibmFtZXMiOlsiTmV3dGFiIiwiY2xhc3NOYW1lIiwiY2hpbGRyZW4iLCJfanN4Iiwic3JjIiwibG9nbyIsImFsdCIsIl9qc3hzIiwiaHJlZiIsInRhcmdldCIsInJlbCIsInJlZnJlc2hPblVwZGF0ZSIsImluaXQiLCJhcHBDb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJFcnJvciIsInJvb3QiLCJjcmVhdGVSb290IiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBZSxPQUFBOzs7QUNLZixNQUFNQSxTQUFTQSxNQUFNO0FBQ25CLDZCQUNFLE9BQUE7QUFBQSxJQUFLQyxXQUFVO0FBQUEsSUFBS0MsK0JBQ2xCLFVBQUE7QUFBQSxNQUFRRCxXQUFVO0FBQUEsTUFBWUMsV0FDNUJDLG9CQUFBLE9BQUE7QUFBQSxRQUFLQyxLQUFLQztBQUFBQSxRQUFNSixXQUFVO0FBQUEsUUFBV0ssS0FBSTtBQUFBLE1BQUEsQ0FBTSxHQUMvQ0MscUJBQUEsS0FBQTtBQUFBLFFBQUFMLFVBQUEsQ0FBRyxTQUNJQyxvQkFBQSxRQUFBO0FBQUEsVUFBQUQsVUFBTTtBQUFBLFFBQTJCLENBQUEsR0FDeEMsc0JBQUE7QUFBQSxNQUFBLENBQUEsR0FDQUMsb0JBQUEsS0FBQTtBQUFBLFFBQ0VGLFdBQVU7QUFBQSxRQUNWTyxNQUFLO0FBQUEsUUFDTEMsUUFBTztBQUFBLFFBQ1BDLEtBQUk7QUFBQSxRQUFxQlIsVUFDMUI7QUFBQSxNQUFBLENBRUQsR0FDQUMsb0JBQUEsTUFBQTtBQUFBLFFBQUFELFVBQUk7QUFBQSxNQUFBLENBQXVELENBQUE7QUFBQSxJQUFBLENBQUE7QUFBQSxFQUFBLENBRXpEO0FBRVY7O0FDbkJBUyxlQUFnQixjQUFjO0FBRTlCLFNBQVNDLE9BQU87QUFDUkMsUUFBQUEsZUFBZUMsU0FBU0MsY0FBYyxnQkFBZ0I7QUFDNUQsTUFBSSxDQUFDRixjQUFjO0FBQ1gsVUFBQSxJQUFJRyxNQUFNLDZCQUE2QjtBQUFBLEVBQy9DO0FBQ01DLFFBQUFBLE9BQU9DLFdBQVdMLFlBQVk7QUFDcENJLE9BQUtFLE9BQU9oQixvQkFBQ0gsV0FBUztBQUN4QjtBQUVBWSxLQUFNOyJ9
