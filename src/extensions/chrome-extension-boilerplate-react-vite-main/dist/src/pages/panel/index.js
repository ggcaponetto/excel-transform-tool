import "../../../assets/js/modulepreload-polyfill.js";
import { j as jsx, c as createRoot } from "../../../assets/js/jsx-runtime.js";
import { a as addHmrIntoView } from "../../../assets/js/_virtual_reload-on-update-in-view.js";
import "../../../assets/js/_commonjsHelpers.js";
const Panel$1 = "";
const Panel = () => {
  return /* @__PURE__ */ jsx("div", {
    className: "container",
    children: /* @__PURE__ */ jsx("h1", {
      children: "Dev Tools Panel"
    })
  });
};
const index = "";
addHmrIntoView("pages/panel");
function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(/* @__PURE__ */ jsx(Panel, {}));
}
init();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wYWdlcy9wYW5lbC9QYW5lbC50c3giLCIuLi8uLi8uLi8uLi9zcmMvcGFnZXMvcGFuZWwvaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBcIkBwYWdlcy9wYW5lbC9QYW5lbC5jc3NcIjtcblxuY29uc3QgUGFuZWw6IFJlYWN0LkZDID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICA8aDE+RGV2IFRvb2xzIFBhbmVsPC9oMT5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBhbmVsO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlUm9vdCB9IGZyb20gXCJyZWFjdC1kb20vY2xpZW50XCI7XG5pbXBvcnQgUGFuZWwgZnJvbSBcIkBwYWdlcy9wYW5lbC9QYW5lbFwiO1xuaW1wb3J0IFwiQHBhZ2VzL3BhbmVsL2luZGV4LmNzc1wiO1xuaW1wb3J0IHJlZnJlc2hPblVwZGF0ZSBmcm9tIFwidmlydHVhbDpyZWxvYWQtb24tdXBkYXRlLWluLXZpZXdcIjtcblxucmVmcmVzaE9uVXBkYXRlKFwicGFnZXMvcGFuZWxcIik7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGNvbnN0IGFwcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwLWNvbnRhaW5lclwiKTtcbiAgaWYgKCFhcHBDb250YWluZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4gbm90IGZpbmQgI2FwcC1jb250YWluZXJcIik7XG4gIH1cbiAgY29uc3Qgcm9vdCA9IGNyZWF0ZVJvb3QoYXBwQ29udGFpbmVyKTtcbiAgcm9vdC5yZW5kZXIoPFBhbmVsIC8+KTtcbn1cblxuaW5pdCgpO1xuIl0sIm5hbWVzIjpbIlBhbmVsIiwiY2xhc3NOYW1lIiwiY2hpbGRyZW4iLCJyZWZyZXNoT25VcGRhdGUiLCJpbml0IiwiYXBwQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiRXJyb3IiLCJyb290IiwiY3JlYXRlUm9vdCIsInJlbmRlciIsIl9qc3giXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsTUFBTUEsUUFBa0JBLE1BQU07QUFDNUIsNkJBQ0UsT0FBQTtBQUFBLElBQUtDLFdBQVU7QUFBQSxJQUFXQyw4QkFDeEIsTUFBQTtBQUFBLE1BQUFBLFVBQUk7QUFBQSxJQUFBLENBQWU7QUFBQSxFQUFBLENBQ2Y7QUFFVjs7QUNIQUMsZUFBZ0IsYUFBYTtBQUU3QixTQUFTQyxPQUFPO0FBQ1JDLFFBQUFBLGVBQWVDLFNBQVNDLGNBQWMsZ0JBQWdCO0FBQzVELE1BQUksQ0FBQ0YsY0FBYztBQUNYLFVBQUEsSUFBSUcsTUFBTSw2QkFBNkI7QUFBQSxFQUMvQztBQUNNQyxRQUFBQSxPQUFPQyxXQUFXTCxZQUFZO0FBQ3BDSSxPQUFLRSxPQUFPQyxvQkFBQ1osVUFBUTtBQUN2QjtBQUVBSSxLQUFNOyJ9
