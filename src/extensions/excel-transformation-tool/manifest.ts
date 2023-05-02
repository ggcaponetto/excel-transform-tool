import packageJson from "./package.json";

/**
 * After changing, please reload the extension at `chrome://extensions`
 */
const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: "Excel Transformation Tool",
  version: packageJson.version,
  description: packageJson.description,
  options_page: "src/pages/options/index.html",
  permissions: ["storage"],
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module",
  },
  content_security_policy: {
    sandbox:
      "sandbox allow-scripts allow-forms allow-popups allow-modals; script-src 'self' 'unsafe-inline' 'unsafe-eval'; child-src 'self';",
  },
  sandbox: {
    pages: ["src/pages/sandbox/index.html"],
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon-250.png",
  },
  /*chrome_url_overrides: {
    newtab: "src/pages/newtab/index.html",
  },*/
  icons: {
    "250": "icon-250.png",
  },
  content_scripts: [
    {
      matches: ["https://extensionpay.com/*"],
      js: ["src/pages/content/index.js"],
      run_at: "document_start",
      css: ["assets/css/contentStyle<KEY>.chunk.css"],
    },
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
      run_at: "document_start",
      // KEY for cache invalidation
      css: ["assets/css/contentStyle<KEY>.chunk.css"],
    },
  ],
  devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: ["assets/js/*.js", "assets/css/*.css", "icon-250.png"],
      matches: ["*://*/*"],
    },
  ],
};

export default manifest;
