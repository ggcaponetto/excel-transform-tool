(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlcHJlbG9hZC1wb2x5ZmlsbC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdml0ZS9tb2R1bGVwcmVsb2FkLXBvbHlmaWxsIl0sInNvdXJjZXNDb250ZW50IjpbIl9fVklURV9JU19NT0RFUk5fXyYmKGZ1bmN0aW9uIHBvbHlmaWxsKCkge1xuICAgIGNvbnN0IHJlbExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJykucmVsTGlzdDtcbiAgICBpZiAocmVsTGlzdCAmJiByZWxMaXN0LnN1cHBvcnRzICYmIHJlbExpc3Quc3VwcG9ydHMoJ21vZHVsZXByZWxvYWQnKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAoY29uc3QgbGluayBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rW3JlbD1cIm1vZHVsZXByZWxvYWRcIl0nKSkge1xuICAgICAgICBwcm9jZXNzUHJlbG9hZChsaW5rKTtcbiAgICB9XG4gICAgbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9ucykge1xuICAgICAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgIT09ICdjaGlsZExpc3QnKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2YgbXV0YXRpb24uYWRkZWROb2Rlcykge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLnRhZ05hbWUgPT09ICdMSU5LJyAmJiBub2RlLnJlbCA9PT0gJ21vZHVsZXByZWxvYWQnKVxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzUHJlbG9hZChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pLm9ic2VydmUoZG9jdW1lbnQsIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICAgIGZ1bmN0aW9uIGdldEZldGNoT3B0cyhzY3JpcHQpIHtcbiAgICAgICAgY29uc3QgZmV0Y2hPcHRzID0ge307XG4gICAgICAgIGlmIChzY3JpcHQuaW50ZWdyaXR5KVxuICAgICAgICAgICAgZmV0Y2hPcHRzLmludGVncml0eSA9IHNjcmlwdC5pbnRlZ3JpdHk7XG4gICAgICAgIGlmIChzY3JpcHQucmVmZXJyZXJwb2xpY3kpXG4gICAgICAgICAgICBmZXRjaE9wdHMucmVmZXJyZXJQb2xpY3kgPSBzY3JpcHQucmVmZXJyZXJwb2xpY3k7XG4gICAgICAgIGlmIChzY3JpcHQuY3Jvc3NvcmlnaW4gPT09ICd1c2UtY3JlZGVudGlhbHMnKVxuICAgICAgICAgICAgZmV0Y2hPcHRzLmNyZWRlbnRpYWxzID0gJ2luY2x1ZGUnO1xuICAgICAgICBlbHNlIGlmIChzY3JpcHQuY3Jvc3NvcmlnaW4gPT09ICdhbm9ueW1vdXMnKVxuICAgICAgICAgICAgZmV0Y2hPcHRzLmNyZWRlbnRpYWxzID0gJ29taXQnO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBmZXRjaE9wdHMuY3JlZGVudGlhbHMgPSAnc2FtZS1vcmlnaW4nO1xuICAgICAgICByZXR1cm4gZmV0Y2hPcHRzO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwcm9jZXNzUHJlbG9hZChsaW5rKSB7XG4gICAgICAgIGlmIChsaW5rLmVwKVxuICAgICAgICAgICAgLy8gZXAgbWFya2VyID0gcHJvY2Vzc2VkXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGxpbmsuZXAgPSB0cnVlO1xuICAgICAgICAvLyBwcmVwb3B1bGF0ZSB0aGUgbG9hZCByZWNvcmRcbiAgICAgICAgY29uc3QgZmV0Y2hPcHRzID0gZ2V0RmV0Y2hPcHRzKGxpbmspO1xuICAgICAgICBmZXRjaChsaW5rLmhyZWYsIGZldGNoT3B0cyk7XG4gICAgfVxufSgpKTsiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQXFCLFNBQVMsV0FBVztBQUNyQyxRQUFNLFVBQVUsU0FBUyxjQUFjLE1BQU0sRUFBRTtBQUMvQyxNQUFJLFdBQVcsUUFBUSxZQUFZLFFBQVEsU0FBUyxlQUFlLEdBQUc7QUFDbEU7QUFBQSxFQUNIO0FBQ0QsYUFBVyxRQUFRLFNBQVMsaUJBQWlCLDJCQUEyQixHQUFHO0FBQ3ZFLG1CQUFlLElBQUk7QUFBQSxFQUN0QjtBQUNELE1BQUksaUJBQWlCLENBQUMsY0FBYztBQUNoQyxlQUFXLFlBQVksV0FBVztBQUM5QixVQUFJLFNBQVMsU0FBUyxhQUFhO0FBQy9CO0FBQUEsTUFDSDtBQUNELGlCQUFXLFFBQVEsU0FBUyxZQUFZO0FBQ3BDLFlBQUksS0FBSyxZQUFZLFVBQVUsS0FBSyxRQUFRO0FBQ3hDLHlCQUFlLElBQUk7QUFBQSxNQUMxQjtBQUFBLElBQ0o7QUFBQSxFQUNULENBQUssRUFBRSxRQUFRLFVBQVUsRUFBRSxXQUFXLE1BQU0sU0FBUyxLQUFJLENBQUU7QUFDdkQsV0FBUyxhQUFhLFFBQVE7QUFDMUIsVUFBTSxZQUFZLENBQUE7QUFDbEIsUUFBSSxPQUFPO0FBQ1AsZ0JBQVUsWUFBWSxPQUFPO0FBQ2pDLFFBQUksT0FBTztBQUNQLGdCQUFVLGlCQUFpQixPQUFPO0FBQ3RDLFFBQUksT0FBTyxnQkFBZ0I7QUFDdkIsZ0JBQVUsY0FBYztBQUFBLGFBQ25CLE9BQU8sZ0JBQWdCO0FBQzVCLGdCQUFVLGNBQWM7QUFBQTtBQUV4QixnQkFBVSxjQUFjO0FBQzVCLFdBQU87QUFBQSxFQUNWO0FBQ0QsV0FBUyxlQUFlLE1BQU07QUFDMUIsUUFBSSxLQUFLO0FBRUw7QUFDSixTQUFLLEtBQUs7QUFFVixVQUFNLFlBQVksYUFBYSxJQUFJO0FBQ25DLFVBQU0sS0FBSyxNQUFNLFNBQVM7QUFBQSxFQUM3QjtBQUNMOyJ9
