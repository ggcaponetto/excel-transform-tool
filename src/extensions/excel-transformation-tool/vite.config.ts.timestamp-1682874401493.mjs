// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path3, { resolve as resolve3 } from "path";

// utils/plugins/make-manifest.ts
import * as fs from "fs";
import * as path from "path";

// utils/log.ts
function colorLog(message, type) {
  let color = type || COLORS.FgBlack;
  switch (type) {
    case "success":
      color = COLORS.FgGreen;
      break;
    case "info":
      color = COLORS.FgBlue;
      break;
    case "error":
      color = COLORS.FgRed;
      break;
    case "warning":
      color = COLORS.FgYellow;
      break;
  }
  console.log(color, message);
}
var COLORS = {
  Reset: "\x1B[0m",
  Bright: "\x1B[1m",
  Dim: "\x1B[2m",
  Underscore: "\x1B[4m",
  Blink: "\x1B[5m",
  Reverse: "\x1B[7m",
  Hidden: "\x1B[8m",
  FgBlack: "\x1B[30m",
  FgRed: "\x1B[31m",
  FgGreen: "\x1B[32m",
  FgYellow: "\x1B[33m",
  FgBlue: "\x1B[34m",
  FgMagenta: "\x1B[35m",
  FgCyan: "\x1B[36m",
  FgWhite: "\x1B[37m",
  BgBlack: "\x1B[40m",
  BgRed: "\x1B[41m",
  BgGreen: "\x1B[42m",
  BgYellow: "\x1B[43m",
  BgBlue: "\x1B[44m",
  BgMagenta: "\x1B[45m",
  BgCyan: "\x1B[46m",
  BgWhite: "\x1B[47m"
};

// utils/manifest-parser/index.ts
var ManifestParser = class {
  constructor() {
  }
  static convertManifestToString(manifest2) {
    return JSON.stringify(manifest2, null, 2);
  }
};
var manifest_parser_default = ManifestParser;

// utils/plugins/make-manifest.ts
var __vite_injected_original_dirname = "C:\\Users\\ggcap\\WebstormProjects\\chrome-extension-playground\\src\\extensions\\excel-transformation-tool\\utils\\plugins";
var { resolve } = path;
var distDir = resolve(__vite_injected_original_dirname, "..", "..", "dist");
var publicDir = resolve(__vite_injected_original_dirname, "..", "..", "public");
function makeManifest(manifest2, config) {
  function makeManifest2(to) {
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to);
    }
    const manifestPath = resolve(to, "manifest.json");
    if (config.contentScriptCssKey) {
      manifest2.content_scripts.forEach((script) => {
        script.css = script.css.map(
          (css) => css.replace("<KEY>", config.contentScriptCssKey)
        );
      });
    }
    fs.writeFileSync(
      manifestPath,
      manifest_parser_default.convertManifestToString(manifest2)
    );
    colorLog(`Manifest file copy complete: ${manifestPath}`, "success");
  }
  return {
    name: "make-manifest",
    buildStart() {
      if (config.isDev) {
        makeManifest2(distDir);
      }
    },
    buildEnd() {
      if (config.isDev) {
        return;
      }
      makeManifest2(publicDir);
    }
  };
}

// utils/plugins/custom-dynamic-import.ts
function customDynamicImport() {
  return {
    name: "custom-dynamic-import",
    renderDynamicImport() {
      return {
        left: `
        {
          const dynamicImport = (path) => import(path);
          dynamicImport(
          `,
        right: ")}"
      };
    }
  };
}

// utils/plugins/add-hmr.ts
import * as path2 from "path";
import { readFileSync } from "fs";
var __vite_injected_original_dirname2 = "C:\\Users\\ggcap\\WebstormProjects\\chrome-extension-playground\\src\\extensions\\excel-transformation-tool\\utils\\plugins";
var isDev = process.env.__DEV__ === "true";
var DUMMY_CODE = `export default function(){};`;
function getInjectionCode(fileName) {
  return readFileSync(
    path2.resolve(__vite_injected_original_dirname2, "..", "reload", "injections", fileName),
    { encoding: "utf8" }
  );
}
function addHmr(config) {
  const { background = false, view = true } = config || {};
  const idInBackgroundScript = "virtual:reload-on-update-in-background-script";
  const idInView = "virtual:reload-on-update-in-view";
  const scriptHmrCode = isDev ? getInjectionCode("script.js") : DUMMY_CODE;
  const viewHmrCode = isDev ? getInjectionCode("view.js") : DUMMY_CODE;
  return {
    name: "add-hmr",
    resolveId(id) {
      if (id === idInBackgroundScript || id === idInView) {
        return getResolvedId(id);
      }
    },
    load(id) {
      if (id === getResolvedId(idInBackgroundScript)) {
        return background ? scriptHmrCode : DUMMY_CODE;
      }
      if (id === getResolvedId(idInView)) {
        return view ? viewHmrCode : DUMMY_CODE;
      }
    }
  };
}
function getResolvedId(id) {
  return "\0" + id;
}

// package.json
var package_default = {
  name: "excel-transformation-tool",
  version: "0.1.0",
  description: "A Chrome Plugin to bring JavaScript functionalities to spreasheets",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite.git"
  },
  scripts: {
    build: "tsc --noEmit && vite build",
    "build:watch": "cross-env __DEV__=true vite build --watch",
    "build:hmr": "rollup --config utils/reload/rollup.config.ts",
    wss: "node utils/reload/initReloadServer.js",
    dev: "npm run build:hmr && (run-p wss build:watch)",
    test: "jest"
  },
  type: "module",
  dependencies: {
    "@codemirror/autocomplete": "^6.6.0",
    "@codemirror/collab": "^6.0.0",
    "@codemirror/commands": "^6.2.3",
    "@codemirror/language": "^6.6.0",
    "@codemirror/language-data": "^6.3.0",
    "@codemirror/lint": "^6.2.1",
    "@codemirror/search": "^6.4.0",
    "@codemirror/state": "^6.2.0",
    "@codemirror/view": "^6.10.0",
    "@emotion/react": "^11.10.6",
    "@emotion/styled": "^11.10.6",
    "@mui/icons-material": "^5.11.16",
    "@mui/material": "^5.12.2",
    axios: "^1.3.6",
    dotenv: "^16.0.3",
    extpay: "^3.0.7",
    jshint: "^2.13.6",
    loglevel: "^1.8.1",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    xlsx: "https://cdn.sheetjs.com/xlsx-0.19.3/xlsx-0.19.3.tgz"
  },
  devDependencies: {
    "@rollup/plugin-typescript": "^8.5.0",
    "@testing-library/react": "13.4.0",
    "@types/chrome": "0.0.224",
    "@types/jest": "29.0.3",
    "@types/node": "18.15.11",
    "@types/react": "18.0.21",
    "@types/react-dom": "18.0.11",
    "@types/ws": "^8.5.3",
    "@typescript-eslint/eslint-plugin": "5.56.0",
    "@typescript-eslint/parser": "5.38.1",
    "@vitejs/plugin-react": "2.2.0",
    chokidar: "^3.5.3",
    "cross-env": "^7.0.3",
    eslint: "8.36.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "4.2.1",
    "eslint-plugin-react": "7.32.2",
    "fs-extra": "11.1.0",
    jest: "29.0.3",
    "jest-environment-jsdom": "29.5.0",
    "npm-run-all": "^4.1.5",
    prettier: "2.7.1",
    rollup: "2.79.1",
    sass: "1.55.0",
    "ts-jest": "29.0.2",
    "ts-loader": "9.4.2",
    typescript: "4.8.3",
    vite: "3.1.3",
    ws: "8.9.0"
  }
};

// manifest.ts
var manifest = {
  manifest_version: 3,
  name: package_default.name,
  version: package_default.version,
  description: package_default.description,
  options_page: "src/pages/options/index.html",
  permissions: ["tabs", "storage", "activeTab", "scripting", "webRequest"],
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module"
  },
  content_security_policy: {
    sandbox: "sandbox allow-scripts allow-forms allow-popups allow-modals; script-src 'self' 'unsafe-inline' 'unsafe-eval'; child-src 'self';"
  },
  sandbox: {
    pages: ["src/pages/sandbox/index.html"]
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon-250.png"
  },
  icons: {
    "250": "icon-250.png"
  },
  content_scripts: [
    {
      matches: ["https://extensionpay.com/*"],
      js: ["src/pages/content/index.js"],
      run_at: "document_start",
      css: ["assets/css/contentStyle<KEY>.chunk.css"]
    },
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
      run_at: "document_start",
      css: ["assets/css/contentStyle<KEY>.chunk.css"]
    }
  ],
  devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: ["assets/js/*.js", "assets/css/*.css", "icon-250.png"],
      matches: ["*://*/*"]
    }
  ]
};
var manifest_default = manifest;

// vite.config.ts
import dotenv from "dotenv";
var __vite_injected_original_dirname3 = "C:\\Users\\ggcap\\WebstormProjects\\chrome-extension-playground\\src\\extensions\\excel-transformation-tool";
dotenv.config();
var root = resolve3(__vite_injected_original_dirname3, "src");
var pagesDir = resolve3(root, "pages");
var assetsDir = resolve3(root, "assets");
var outDir = resolve3(__vite_injected_original_dirname3, "dist");
var publicDir2 = resolve3(__vite_injected_original_dirname3, "public");
var isDev2 = process.env.__DEV__ === "true";
var isProduction = !isDev2;
var enableHmrInBackgroundScript = true;
var vite_config_default = defineConfig({
  define: {
    "process.env": Object.entries(
      loadEnv("mock", process.cwd(), "VITE_")
    ).reduce((prev, [key, val]) => {
      return {
        ...prev,
        [key]: val
      };
    }, {})
  },
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir
    }
  },
  plugins: [
    react(),
    makeManifest(manifest_default, {
      isDev: isDev2,
      contentScriptCssKey: regenerateCacheInvalidationKey()
    }),
    customDynamicImport(),
    addHmr({ background: enableHmrInBackgroundScript, view: true })
  ],
  publicDir: publicDir2,
  build: {
    outDir,
    minify: isProduction,
    reportCompressedSize: isProduction,
    sourcemap: isDev2 ? "inline" : true,
    rollupOptions: {
      input: {
        devtools: resolve3(pagesDir, "devtools", "index.html"),
        panel: resolve3(pagesDir, "panel", "index.html"),
        content: resolve3(pagesDir, "content", "index.ts"),
        background: resolve3(pagesDir, "background", "index.ts"),
        contentStyle: resolve3(pagesDir, "content", "style.scss"),
        popup: resolve3(pagesDir, "popup", "index.html"),
        newtab: resolve3(pagesDir, "newtab", "index.html"),
        options: resolve3(pagesDir, "options", "index.html"),
        sandbox: resolve3(pagesDir, "sandbox", "index.html")
      },
      watch: {
        include: ["src/**", "vite.config.ts"],
        exclude: ["node_modules/**", "src/**/*.spec.ts"]
      },
      output: {
        entryFileNames: "src/pages/[name]/index.js",
        chunkFileNames: isDev2 ? "assets/js/[name].js" : "assets/js/[name].[hash].js",
        assetFileNames: (assetInfo) => {
          const { dir, name: _name } = path3.parse(assetInfo.name);
          const assetFolder = dir.split("/").at(-1);
          const name = assetFolder + firstUpperCase(_name);
          if (name === "contentStyle") {
            return `assets/css/contentStyle${cacheInvalidationKey}.chunk.css`;
          }
          return `assets/[ext]/${name}.chunk.[ext]`;
        }
      }
    }
  }
});
function firstUpperCase(str) {
  const firstAlphabet = new RegExp(/( |^)[a-z]/, "g");
  return str.toLowerCase().replace(firstAlphabet, (L) => L.toUpperCase());
}
var cacheInvalidationKey = generateKey();
function regenerateCacheInvalidationKey() {
  cacheInvalidationKey = generateKey();
  return cacheInvalidationKey;
}
function generateKey() {
  return `${(Date.now() / 100).toFixed()}`;
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0LnRzIiwgInV0aWxzL2xvZy50cyIsICJ1dGlscy9tYW5pZmVzdC1wYXJzZXIvaW5kZXgudHMiLCAidXRpbHMvcGx1Z2lucy9jdXN0b20tZHluYW1pYy1pbXBvcnQudHMiLCAidXRpbHMvcGx1Z2lucy9hZGQtaG1yLnRzIiwgIm1hbmlmZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ2djYXBcXFxcV2Vic3Rvcm1Qcm9qZWN0c1xcXFxjaHJvbWUtZXh0ZW5zaW9uLXBsYXlncm91bmRcXFxcc3JjXFxcXGV4dGVuc2lvbnNcXFxcZXhjZWwtdHJhbnNmb3JtYXRpb24tdG9vbFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ2djYXBcXFxcV2Vic3Rvcm1Qcm9qZWN0c1xcXFxjaHJvbWUtZXh0ZW5zaW9uLXBsYXlncm91bmRcXFxcc3JjXFxcXGV4dGVuc2lvbnNcXFxcZXhjZWwtdHJhbnNmb3JtYXRpb24tdG9vbFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvZ2djYXAvV2Vic3Rvcm1Qcm9qZWN0cy9jaHJvbWUtZXh0ZW5zaW9uLXBsYXlncm91bmQvc3JjL2V4dGVuc2lvbnMvZXhjZWwtdHJhbnNmb3JtYXRpb24tdG9vbC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgcGF0aCwgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCBtYWtlTWFuaWZlc3QgZnJvbSBcIi4vdXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0XCI7XG5pbXBvcnQgY3VzdG9tRHluYW1pY0ltcG9ydCBmcm9tIFwiLi91dGlscy9wbHVnaW5zL2N1c3RvbS1keW5hbWljLWltcG9ydFwiO1xuaW1wb3J0IGFkZEhtciBmcm9tIFwiLi91dGlscy9wbHVnaW5zL2FkZC1obXJcIjtcbmltcG9ydCBtYW5pZmVzdCBmcm9tIFwiLi9tYW5pZmVzdFwiO1xuaW1wb3J0IGRvdGVudiBmcm9tIFwiZG90ZW52XCI7XG5kb3RlbnYuY29uZmlnKCk7IC8vIGxvYWQgZW52IHZhcnMgZnJvbSAuZW52XG5cbmNvbnN0IHJvb3QgPSByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIik7XG5jb25zdCBwYWdlc0RpciA9IHJlc29sdmUocm9vdCwgXCJwYWdlc1wiKTtcbmNvbnN0IGFzc2V0c0RpciA9IHJlc29sdmUocm9vdCwgXCJhc3NldHNcIik7XG5jb25zdCBvdXREaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgXCJkaXN0XCIpO1xuY29uc3QgcHVibGljRGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwicHVibGljXCIpO1xuXG5jb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Ll9fREVWX18gPT09IFwidHJ1ZVwiO1xuY29uc3QgaXNQcm9kdWN0aW9uID0gIWlzRGV2O1xuXG4vLyBFTkFCTEUgSE1SIElOIEJBQ0tHUk9VTkQgU0NSSVBUXG5jb25zdCBlbmFibGVIbXJJbkJhY2tncm91bmRTY3JpcHQgPSB0cnVlO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBkZWZpbmU6IHtcbiAgICBcInByb2Nlc3MuZW52XCI6IE9iamVjdC5lbnRyaWVzKFxuICAgICAgbG9hZEVudihcIm1vY2tcIiwgcHJvY2Vzcy5jd2QoKSwgXCJWSVRFX1wiKVxuICAgICkucmVkdWNlKChwcmV2LCBba2V5LCB2YWxdKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBba2V5XTogdmFsLFxuICAgICAgfTtcbiAgICB9LCB7fSksXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAc3JjXCI6IHJvb3QsXG4gICAgICBcIkBhc3NldHNcIjogYXNzZXRzRGlyLFxuICAgICAgXCJAcGFnZXNcIjogcGFnZXNEaXIsXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgbWFrZU1hbmlmZXN0KG1hbmlmZXN0LCB7XG4gICAgICBpc0RldixcbiAgICAgIGNvbnRlbnRTY3JpcHRDc3NLZXk6IHJlZ2VuZXJhdGVDYWNoZUludmFsaWRhdGlvbktleSgpLFxuICAgIH0pLFxuICAgIGN1c3RvbUR5bmFtaWNJbXBvcnQoKSxcbiAgICBhZGRIbXIoeyBiYWNrZ3JvdW5kOiBlbmFibGVIbXJJbkJhY2tncm91bmRTY3JpcHQsIHZpZXc6IHRydWUgfSksXG4gIF0sXG4gIHB1YmxpY0RpcixcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXIsXG4gICAgLyoqIENhbiBzbG93RG93biBidWlsZCBzcGVlZC4gKi9cbiAgICAvLyBzb3VyY2VtYXA6IGlzRGV2LFxuICAgIG1pbmlmeTogaXNQcm9kdWN0aW9uLFxuICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiBpc1Byb2R1Y3Rpb24sXG4gICAgc291cmNlbWFwOiBpc0RldiA/IFwiaW5saW5lXCIgOiB0cnVlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIGRldnRvb2xzOiByZXNvbHZlKHBhZ2VzRGlyLCBcImRldnRvb2xzXCIsIFwiaW5kZXguaHRtbFwiKSxcbiAgICAgICAgcGFuZWw6IHJlc29sdmUocGFnZXNEaXIsIFwicGFuZWxcIiwgXCJpbmRleC5odG1sXCIpLFxuICAgICAgICBjb250ZW50OiByZXNvbHZlKHBhZ2VzRGlyLCBcImNvbnRlbnRcIiwgXCJpbmRleC50c1wiKSxcbiAgICAgICAgYmFja2dyb3VuZDogcmVzb2x2ZShwYWdlc0RpciwgXCJiYWNrZ3JvdW5kXCIsIFwiaW5kZXgudHNcIiksXG4gICAgICAgIGNvbnRlbnRTdHlsZTogcmVzb2x2ZShwYWdlc0RpciwgXCJjb250ZW50XCIsIFwic3R5bGUuc2Nzc1wiKSxcbiAgICAgICAgcG9wdXA6IHJlc29sdmUocGFnZXNEaXIsIFwicG9wdXBcIiwgXCJpbmRleC5odG1sXCIpLFxuICAgICAgICBuZXd0YWI6IHJlc29sdmUocGFnZXNEaXIsIFwibmV3dGFiXCIsIFwiaW5kZXguaHRtbFwiKSxcbiAgICAgICAgb3B0aW9uczogcmVzb2x2ZShwYWdlc0RpciwgXCJvcHRpb25zXCIsIFwiaW5kZXguaHRtbFwiKSxcbiAgICAgICAgc2FuZGJveDogcmVzb2x2ZShwYWdlc0RpciwgXCJzYW5kYm94XCIsIFwiaW5kZXguaHRtbFwiKSxcbiAgICAgIH0sXG4gICAgICB3YXRjaDoge1xuICAgICAgICBpbmNsdWRlOiBbXCJzcmMvKipcIiwgXCJ2aXRlLmNvbmZpZy50c1wiXSxcbiAgICAgICAgZXhjbHVkZTogW1wibm9kZV9tb2R1bGVzLyoqXCIsIFwic3JjLyoqLyouc3BlYy50c1wiXSxcbiAgICAgIH0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwic3JjL3BhZ2VzL1tuYW1lXS9pbmRleC5qc1wiLFxuICAgICAgICBjaHVua0ZpbGVOYW1lczogaXNEZXZcbiAgICAgICAgICA/IFwiYXNzZXRzL2pzL1tuYW1lXS5qc1wiXG4gICAgICAgICAgOiBcImFzc2V0cy9qcy9bbmFtZV0uW2hhc2hdLmpzXCIsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBkaXIsIG5hbWU6IF9uYW1lIH0gPSBwYXRoLnBhcnNlKGFzc2V0SW5mby5uYW1lKTtcbiAgICAgICAgICBjb25zdCBhc3NldEZvbGRlciA9IGRpci5zcGxpdChcIi9cIikuYXQoLTEpO1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSBhc3NldEZvbGRlciArIGZpcnN0VXBwZXJDYXNlKF9uYW1lKTtcbiAgICAgICAgICBpZiAobmFtZSA9PT0gXCJjb250ZW50U3R5bGVcIikge1xuICAgICAgICAgICAgcmV0dXJuIGBhc3NldHMvY3NzL2NvbnRlbnRTdHlsZSR7Y2FjaGVJbnZhbGlkYXRpb25LZXl9LmNodW5rLmNzc2A7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBgYXNzZXRzL1tleHRdLyR7bmFtZX0uY2h1bmsuW2V4dF1gO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG5cbmZ1bmN0aW9uIGZpcnN0VXBwZXJDYXNlKHN0cjogc3RyaW5nKSB7XG4gIGNvbnN0IGZpcnN0QWxwaGFiZXQgPSBuZXcgUmVnRXhwKC8oIHxeKVthLXpdLywgXCJnXCIpO1xuICByZXR1cm4gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZShmaXJzdEFscGhhYmV0LCAoTCkgPT4gTC50b1VwcGVyQ2FzZSgpKTtcbn1cblxubGV0IGNhY2hlSW52YWxpZGF0aW9uS2V5OiBzdHJpbmcgPSBnZW5lcmF0ZUtleSgpO1xuZnVuY3Rpb24gcmVnZW5lcmF0ZUNhY2hlSW52YWxpZGF0aW9uS2V5KCkge1xuICBjYWNoZUludmFsaWRhdGlvbktleSA9IGdlbmVyYXRlS2V5KCk7XG4gIHJldHVybiBjYWNoZUludmFsaWRhdGlvbktleTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVLZXkoKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAkeyhEYXRlLm5vdygpIC8gMTAwKS50b0ZpeGVkKCl9YDtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ2djYXBcXFxcV2Vic3Rvcm1Qcm9qZWN0c1xcXFxjaHJvbWUtZXh0ZW5zaW9uLXBsYXlncm91bmRcXFxcc3JjXFxcXGV4dGVuc2lvbnNcXFxcZXhjZWwtdHJhbnNmb3JtYXRpb24tdG9vbFxcXFx1dGlsc1xcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxnZ2NhcFxcXFxXZWJzdG9ybVByb2plY3RzXFxcXGNocm9tZS1leHRlbnNpb24tcGxheWdyb3VuZFxcXFxzcmNcXFxcZXh0ZW5zaW9uc1xcXFxleGNlbC10cmFuc2Zvcm1hdGlvbi10b29sXFxcXHV0aWxzXFxcXHBsdWdpbnNcXFxcbWFrZS1tYW5pZmVzdC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvZ2djYXAvV2Vic3Rvcm1Qcm9qZWN0cy9jaHJvbWUtZXh0ZW5zaW9uLXBsYXlncm91bmQvc3JjL2V4dGVuc2lvbnMvZXhjZWwtdHJhbnNmb3JtYXRpb24tdG9vbC91dGlscy9wbHVnaW5zL21ha2UtbWFuaWZlc3QudHNcIjtpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCBjb2xvckxvZyBmcm9tIFwiLi4vbG9nXCI7XG5pbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IE1hbmlmZXN0UGFyc2VyIGZyb20gXCIuLi9tYW5pZmVzdC1wYXJzZXJcIjtcblxuY29uc3QgeyByZXNvbHZlIH0gPSBwYXRoO1xuXG5jb25zdCBkaXN0RGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi5cIiwgXCIuLlwiLCBcImRpc3RcIik7XG5jb25zdCBwdWJsaWNEaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgXCIuLlwiLCBcIi4uXCIsIFwicHVibGljXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlTWFuaWZlc3QoXG4gIG1hbmlmZXN0OiBjaHJvbWUucnVudGltZS5NYW5pZmVzdFYzLFxuICBjb25maWc6IHsgaXNEZXY6IGJvb2xlYW47IGNvbnRlbnRTY3JpcHRDc3NLZXk/OiBzdHJpbmcgfVxuKTogUGx1Z2luT3B0aW9uIHtcbiAgZnVuY3Rpb24gbWFrZU1hbmlmZXN0KHRvOiBzdHJpbmcpIHtcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmModG8pKSB7XG4gICAgICBmcy5ta2RpclN5bmModG8pO1xuICAgIH1cbiAgICBjb25zdCBtYW5pZmVzdFBhdGggPSByZXNvbHZlKHRvLCBcIm1hbmlmZXN0Lmpzb25cIik7XG5cbiAgICAvLyBOYW1pbmcgY2hhbmdlIGZvciBjYWNoZSBpbnZhbGlkYXRpb25cbiAgICBpZiAoY29uZmlnLmNvbnRlbnRTY3JpcHRDc3NLZXkpIHtcbiAgICAgIG1hbmlmZXN0LmNvbnRlbnRfc2NyaXB0cy5mb3JFYWNoKChzY3JpcHQpID0+IHtcbiAgICAgICAgc2NyaXB0LmNzcyA9IHNjcmlwdC5jc3MubWFwKChjc3MpID0+XG4gICAgICAgICAgY3NzLnJlcGxhY2UoXCI8S0VZPlwiLCBjb25maWcuY29udGVudFNjcmlwdENzc0tleSlcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZzLndyaXRlRmlsZVN5bmMoXG4gICAgICBtYW5pZmVzdFBhdGgsXG4gICAgICBNYW5pZmVzdFBhcnNlci5jb252ZXJ0TWFuaWZlc3RUb1N0cmluZyhtYW5pZmVzdClcbiAgICApO1xuXG4gICAgY29sb3JMb2coYE1hbmlmZXN0IGZpbGUgY29weSBjb21wbGV0ZTogJHttYW5pZmVzdFBhdGh9YCwgXCJzdWNjZXNzXCIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBcIm1ha2UtbWFuaWZlc3RcIixcbiAgICBidWlsZFN0YXJ0KCkge1xuICAgICAgaWYgKGNvbmZpZy5pc0Rldikge1xuICAgICAgICBtYWtlTWFuaWZlc3QoZGlzdERpcik7XG4gICAgICB9XG4gICAgfSxcbiAgICBidWlsZEVuZCgpIHtcbiAgICAgIGlmIChjb25maWcuaXNEZXYpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgbWFrZU1hbmlmZXN0KHB1YmxpY0Rpcik7XG4gICAgfSxcbiAgfTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ2djYXBcXFxcV2Vic3Rvcm1Qcm9qZWN0c1xcXFxjaHJvbWUtZXh0ZW5zaW9uLXBsYXlncm91bmRcXFxcc3JjXFxcXGV4dGVuc2lvbnNcXFxcZXhjZWwtdHJhbnNmb3JtYXRpb24tdG9vbFxcXFx1dGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ2djYXBcXFxcV2Vic3Rvcm1Qcm9qZWN0c1xcXFxjaHJvbWUtZXh0ZW5zaW9uLXBsYXlncm91bmRcXFxcc3JjXFxcXGV4dGVuc2lvbnNcXFxcZXhjZWwtdHJhbnNmb3JtYXRpb24tdG9vbFxcXFx1dGlsc1xcXFxsb2cudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2dnY2FwL1dlYnN0b3JtUHJvamVjdHMvY2hyb21lLWV4dGVuc2lvbi1wbGF5Z3JvdW5kL3NyYy9leHRlbnNpb25zL2V4Y2VsLXRyYW5zZm9ybWF0aW9uLXRvb2wvdXRpbHMvbG9nLnRzXCI7dHlwZSBDb2xvclR5cGUgPSBcInN1Y2Nlc3NcIiB8IFwiaW5mb1wiIHwgXCJlcnJvclwiIHwgXCJ3YXJuaW5nXCIgfCBrZXlvZiB0eXBlb2YgQ09MT1JTO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb2xvckxvZyhtZXNzYWdlOiBzdHJpbmcsIHR5cGU/OiBDb2xvclR5cGUpIHtcbiAgbGV0IGNvbG9yOiBzdHJpbmcgPSB0eXBlIHx8IENPTE9SUy5GZ0JsYWNrO1xuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgXCJzdWNjZXNzXCI6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ0dyZWVuO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImluZm9cIjpcbiAgICAgIGNvbG9yID0gQ09MT1JTLkZnQmx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJlcnJvclwiOlxuICAgICAgY29sb3IgPSBDT0xPUlMuRmdSZWQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwid2FybmluZ1wiOlxuICAgICAgY29sb3IgPSBDT0xPUlMuRmdZZWxsb3c7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIGNvbnNvbGUubG9nKGNvbG9yLCBtZXNzYWdlKTtcbn1cblxuY29uc3QgQ09MT1JTID0ge1xuICBSZXNldDogXCJcXHgxYlswbVwiLFxuICBCcmlnaHQ6IFwiXFx4MWJbMW1cIixcbiAgRGltOiBcIlxceDFiWzJtXCIsXG4gIFVuZGVyc2NvcmU6IFwiXFx4MWJbNG1cIixcbiAgQmxpbms6IFwiXFx4MWJbNW1cIixcbiAgUmV2ZXJzZTogXCJcXHgxYls3bVwiLFxuICBIaWRkZW46IFwiXFx4MWJbOG1cIixcbiAgRmdCbGFjazogXCJcXHgxYlszMG1cIixcbiAgRmdSZWQ6IFwiXFx4MWJbMzFtXCIsXG4gIEZnR3JlZW46IFwiXFx4MWJbMzJtXCIsXG4gIEZnWWVsbG93OiBcIlxceDFiWzMzbVwiLFxuICBGZ0JsdWU6IFwiXFx4MWJbMzRtXCIsXG4gIEZnTWFnZW50YTogXCJcXHgxYlszNW1cIixcbiAgRmdDeWFuOiBcIlxceDFiWzM2bVwiLFxuICBGZ1doaXRlOiBcIlxceDFiWzM3bVwiLFxuICBCZ0JsYWNrOiBcIlxceDFiWzQwbVwiLFxuICBCZ1JlZDogXCJcXHgxYls0MW1cIixcbiAgQmdHcmVlbjogXCJcXHgxYls0Mm1cIixcbiAgQmdZZWxsb3c6IFwiXFx4MWJbNDNtXCIsXG4gIEJnQmx1ZTogXCJcXHgxYls0NG1cIixcbiAgQmdNYWdlbnRhOiBcIlxceDFiWzQ1bVwiLFxuICBCZ0N5YW46IFwiXFx4MWJbNDZtXCIsXG4gIEJnV2hpdGU6IFwiXFx4MWJbNDdtXCIsXG59IGFzIGNvbnN0O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxnZ2NhcFxcXFxXZWJzdG9ybVByb2plY3RzXFxcXGNocm9tZS1leHRlbnNpb24tcGxheWdyb3VuZFxcXFxzcmNcXFxcZXh0ZW5zaW9uc1xcXFxleGNlbC10cmFuc2Zvcm1hdGlvbi10b29sXFxcXHV0aWxzXFxcXG1hbmlmZXN0LXBhcnNlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ2djYXBcXFxcV2Vic3Rvcm1Qcm9qZWN0c1xcXFxjaHJvbWUtZXh0ZW5zaW9uLXBsYXlncm91bmRcXFxcc3JjXFxcXGV4dGVuc2lvbnNcXFxcZXhjZWwtdHJhbnNmb3JtYXRpb24tdG9vbFxcXFx1dGlsc1xcXFxtYW5pZmVzdC1wYXJzZXJcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2dnY2FwL1dlYnN0b3JtUHJvamVjdHMvY2hyb21lLWV4dGVuc2lvbi1wbGF5Z3JvdW5kL3NyYy9leHRlbnNpb25zL2V4Y2VsLXRyYW5zZm9ybWF0aW9uLXRvb2wvdXRpbHMvbWFuaWZlc3QtcGFyc2VyL2luZGV4LnRzXCI7dHlwZSBNYW5pZmVzdCA9IGNocm9tZS5ydW50aW1lLk1hbmlmZXN0VjM7XG5cbmNsYXNzIE1hbmlmZXN0UGFyc2VyIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cblxuICBzdGF0aWMgY29udmVydE1hbmlmZXN0VG9TdHJpbmcobWFuaWZlc3Q6IE1hbmlmZXN0KTogc3RyaW5nIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobWFuaWZlc3QsIG51bGwsIDIpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1hbmlmZXN0UGFyc2VyO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxnZ2NhcFxcXFxXZWJzdG9ybVByb2plY3RzXFxcXGNocm9tZS1leHRlbnNpb24tcGxheWdyb3VuZFxcXFxzcmNcXFxcZXh0ZW5zaW9uc1xcXFxleGNlbC10cmFuc2Zvcm1hdGlvbi10b29sXFxcXHV0aWxzXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGdnY2FwXFxcXFdlYnN0b3JtUHJvamVjdHNcXFxcY2hyb21lLWV4dGVuc2lvbi1wbGF5Z3JvdW5kXFxcXHNyY1xcXFxleHRlbnNpb25zXFxcXGV4Y2VsLXRyYW5zZm9ybWF0aW9uLXRvb2xcXFxcdXRpbHNcXFxccGx1Z2luc1xcXFxjdXN0b20tZHluYW1pYy1pbXBvcnQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2dnY2FwL1dlYnN0b3JtUHJvamVjdHMvY2hyb21lLWV4dGVuc2lvbi1wbGF5Z3JvdW5kL3NyYy9leHRlbnNpb25zL2V4Y2VsLXRyYW5zZm9ybWF0aW9uLXRvb2wvdXRpbHMvcGx1Z2lucy9jdXN0b20tZHluYW1pYy1pbXBvcnQudHNcIjtpbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjdXN0b21EeW5hbWljSW1wb3J0KCk6IFBsdWdpbk9wdGlvbiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJjdXN0b20tZHluYW1pYy1pbXBvcnRcIixcbiAgICByZW5kZXJEeW5hbWljSW1wb3J0KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogYFxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgZHluYW1pY0ltcG9ydCA9IChwYXRoKSA9PiBpbXBvcnQocGF0aCk7XG4gICAgICAgICAgZHluYW1pY0ltcG9ydChcbiAgICAgICAgICBgLFxuICAgICAgICByaWdodDogXCIpfVwiLFxuICAgICAgfTtcbiAgICB9LFxuICB9O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxnZ2NhcFxcXFxXZWJzdG9ybVByb2plY3RzXFxcXGNocm9tZS1leHRlbnNpb24tcGxheWdyb3VuZFxcXFxzcmNcXFxcZXh0ZW5zaW9uc1xcXFxleGNlbC10cmFuc2Zvcm1hdGlvbi10b29sXFxcXHV0aWxzXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGdnY2FwXFxcXFdlYnN0b3JtUHJvamVjdHNcXFxcY2hyb21lLWV4dGVuc2lvbi1wbGF5Z3JvdW5kXFxcXHNyY1xcXFxleHRlbnNpb25zXFxcXGV4Y2VsLXRyYW5zZm9ybWF0aW9uLXRvb2xcXFxcdXRpbHNcXFxccGx1Z2luc1xcXFxhZGQtaG1yLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9nZ2NhcC9XZWJzdG9ybVByb2plY3RzL2Nocm9tZS1leHRlbnNpb24tcGxheWdyb3VuZC9zcmMvZXh0ZW5zaW9ucy9leGNlbC10cmFuc2Zvcm1hdGlvbi10b29sL3V0aWxzL3BsdWdpbnMvYWRkLWhtci50c1wiO2ltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IFBsdWdpbk9wdGlvbiB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tIFwiZnNcIjtcblxuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5fX0RFVl9fID09PSBcInRydWVcIjtcblxuY29uc3QgRFVNTVlfQ09ERSA9IGBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpe307YDtcblxuZnVuY3Rpb24gZ2V0SW5qZWN0aW9uQ29kZShmaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJlYWRGaWxlU3luYyhcbiAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uXCIsIFwicmVsb2FkXCIsIFwiaW5qZWN0aW9uc1wiLCBmaWxlTmFtZSksXG4gICAgeyBlbmNvZGluZzogXCJ1dGY4XCIgfVxuICApO1xufVxuXG50eXBlIENvbmZpZyA9IHtcbiAgYmFja2dyb3VuZD86IGJvb2xlYW47XG4gIHZpZXc/OiBib29sZWFuO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkSG1yKGNvbmZpZz86IENvbmZpZyk6IFBsdWdpbk9wdGlvbiB7XG4gIGNvbnN0IHsgYmFja2dyb3VuZCA9IGZhbHNlLCB2aWV3ID0gdHJ1ZSB9ID0gY29uZmlnIHx8IHt9O1xuICBjb25zdCBpZEluQmFja2dyb3VuZFNjcmlwdCA9IFwidmlydHVhbDpyZWxvYWQtb24tdXBkYXRlLWluLWJhY2tncm91bmQtc2NyaXB0XCI7XG4gIGNvbnN0IGlkSW5WaWV3ID0gXCJ2aXJ0dWFsOnJlbG9hZC1vbi11cGRhdGUtaW4tdmlld1wiO1xuXG4gIGNvbnN0IHNjcmlwdEhtckNvZGUgPSBpc0RldiA/IGdldEluamVjdGlvbkNvZGUoXCJzY3JpcHQuanNcIikgOiBEVU1NWV9DT0RFO1xuICBjb25zdCB2aWV3SG1yQ29kZSA9IGlzRGV2ID8gZ2V0SW5qZWN0aW9uQ29kZShcInZpZXcuanNcIikgOiBEVU1NWV9DT0RFO1xuXG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJhZGQtaG1yXCIsXG4gICAgcmVzb2x2ZUlkKGlkKSB7XG4gICAgICBpZiAoaWQgPT09IGlkSW5CYWNrZ3JvdW5kU2NyaXB0IHx8IGlkID09PSBpZEluVmlldykge1xuICAgICAgICByZXR1cm4gZ2V0UmVzb2x2ZWRJZChpZCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBsb2FkKGlkKSB7XG4gICAgICBpZiAoaWQgPT09IGdldFJlc29sdmVkSWQoaWRJbkJhY2tncm91bmRTY3JpcHQpKSB7XG4gICAgICAgIHJldHVybiBiYWNrZ3JvdW5kID8gc2NyaXB0SG1yQ29kZSA6IERVTU1ZX0NPREU7XG4gICAgICB9XG5cbiAgICAgIGlmIChpZCA9PT0gZ2V0UmVzb2x2ZWRJZChpZEluVmlldykpIHtcbiAgICAgICAgcmV0dXJuIHZpZXcgPyB2aWV3SG1yQ29kZSA6IERVTU1ZX0NPREU7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0UmVzb2x2ZWRJZChpZDogc3RyaW5nKSB7XG4gIHJldHVybiBcIlxcMFwiICsgaWQ7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGdnY2FwXFxcXFdlYnN0b3JtUHJvamVjdHNcXFxcY2hyb21lLWV4dGVuc2lvbi1wbGF5Z3JvdW5kXFxcXHNyY1xcXFxleHRlbnNpb25zXFxcXGV4Y2VsLXRyYW5zZm9ybWF0aW9uLXRvb2xcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGdnY2FwXFxcXFdlYnN0b3JtUHJvamVjdHNcXFxcY2hyb21lLWV4dGVuc2lvbi1wbGF5Z3JvdW5kXFxcXHNyY1xcXFxleHRlbnNpb25zXFxcXGV4Y2VsLXRyYW5zZm9ybWF0aW9uLXRvb2xcXFxcbWFuaWZlc3QudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2dnY2FwL1dlYnN0b3JtUHJvamVjdHMvY2hyb21lLWV4dGVuc2lvbi1wbGF5Z3JvdW5kL3NyYy9leHRlbnNpb25zL2V4Y2VsLXRyYW5zZm9ybWF0aW9uLXRvb2wvbWFuaWZlc3QudHNcIjtpbXBvcnQgcGFja2FnZUpzb24gZnJvbSBcIi4vcGFja2FnZS5qc29uXCI7XG5cbi8qKlxuICogQWZ0ZXIgY2hhbmdpbmcsIHBsZWFzZSByZWxvYWQgdGhlIGV4dGVuc2lvbiBhdCBgY2hyb21lOi8vZXh0ZW5zaW9uc2BcbiAqL1xuY29uc3QgbWFuaWZlc3Q6IGNocm9tZS5ydW50aW1lLk1hbmlmZXN0VjMgPSB7XG4gIG1hbmlmZXN0X3ZlcnNpb246IDMsXG4gIG5hbWU6IHBhY2thZ2VKc29uLm5hbWUsXG4gIHZlcnNpb246IHBhY2thZ2VKc29uLnZlcnNpb24sXG4gIGRlc2NyaXB0aW9uOiBwYWNrYWdlSnNvbi5kZXNjcmlwdGlvbixcbiAgb3B0aW9uc19wYWdlOiBcInNyYy9wYWdlcy9vcHRpb25zL2luZGV4Lmh0bWxcIixcbiAgcGVybWlzc2lvbnM6IFtcInRhYnNcIiwgXCJzdG9yYWdlXCIsIFwiYWN0aXZlVGFiXCIsIFwic2NyaXB0aW5nXCIsIFwid2ViUmVxdWVzdFwiXSxcbiAgYmFja2dyb3VuZDoge1xuICAgIHNlcnZpY2Vfd29ya2VyOiBcInNyYy9wYWdlcy9iYWNrZ3JvdW5kL2luZGV4LmpzXCIsXG4gICAgdHlwZTogXCJtb2R1bGVcIixcbiAgfSxcbiAgY29udGVudF9zZWN1cml0eV9wb2xpY3k6IHtcbiAgICBzYW5kYm94OlxuICAgICAgXCJzYW5kYm94IGFsbG93LXNjcmlwdHMgYWxsb3ctZm9ybXMgYWxsb3ctcG9wdXBzIGFsbG93LW1vZGFsczsgc2NyaXB0LXNyYyAnc2VsZicgJ3Vuc2FmZS1pbmxpbmUnICd1bnNhZmUtZXZhbCc7IGNoaWxkLXNyYyAnc2VsZic7XCIsXG4gIH0sXG4gIHNhbmRib3g6IHtcbiAgICBwYWdlczogW1wic3JjL3BhZ2VzL3NhbmRib3gvaW5kZXguaHRtbFwiXSxcbiAgfSxcbiAgYWN0aW9uOiB7XG4gICAgZGVmYXVsdF9wb3B1cDogXCJzcmMvcGFnZXMvcG9wdXAvaW5kZXguaHRtbFwiLFxuICAgIGRlZmF1bHRfaWNvbjogXCJpY29uLTI1MC5wbmdcIixcbiAgfSxcbiAgLypjaHJvbWVfdXJsX292ZXJyaWRlczoge1xuICAgIG5ld3RhYjogXCJzcmMvcGFnZXMvbmV3dGFiL2luZGV4Lmh0bWxcIixcbiAgfSwqL1xuICBpY29uczoge1xuICAgIFwiMjUwXCI6IFwiaWNvbi0yNTAucG5nXCIsXG4gIH0sXG4gIGNvbnRlbnRfc2NyaXB0czogW1xuICAgIHtcbiAgICAgIG1hdGNoZXM6IFtcImh0dHBzOi8vZXh0ZW5zaW9ucGF5LmNvbS8qXCJdLFxuICAgICAganM6IFtcInNyYy9wYWdlcy9jb250ZW50L2luZGV4LmpzXCJdLFxuICAgICAgcnVuX2F0OiBcImRvY3VtZW50X3N0YXJ0XCIsXG4gICAgICBjc3M6IFtcImFzc2V0cy9jc3MvY29udGVudFN0eWxlPEtFWT4uY2h1bmsuY3NzXCJdLFxuICAgIH0sXG4gICAge1xuICAgICAgbWF0Y2hlczogW1wiaHR0cDovLyovKlwiLCBcImh0dHBzOi8vKi8qXCIsIFwiPGFsbF91cmxzPlwiXSxcbiAgICAgIGpzOiBbXCJzcmMvcGFnZXMvY29udGVudC9pbmRleC5qc1wiXSxcbiAgICAgIHJ1bl9hdDogXCJkb2N1bWVudF9zdGFydFwiLFxuICAgICAgLy8gS0VZIGZvciBjYWNoZSBpbnZhbGlkYXRpb25cbiAgICAgIGNzczogW1wiYXNzZXRzL2Nzcy9jb250ZW50U3R5bGU8S0VZPi5jaHVuay5jc3NcIl0sXG4gICAgfSxcbiAgXSxcbiAgZGV2dG9vbHNfcGFnZTogXCJzcmMvcGFnZXMvZGV2dG9vbHMvaW5kZXguaHRtbFwiLFxuICB3ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXM6IFtcbiAgICB7XG4gICAgICByZXNvdXJjZXM6IFtcImFzc2V0cy9qcy8qLmpzXCIsIFwiYXNzZXRzL2Nzcy8qLmNzc1wiLCBcImljb24tMjUwLnBuZ1wiXSxcbiAgICAgIG1hdGNoZXM6IFtcIio6Ly8qLypcIl0sXG4gICAgfSxcbiAgXSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1hbmlmZXN0O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4ZSxTQUFTLGNBQWMsZUFBZTtBQUNwaEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU9BLFNBQVEsV0FBQUMsZ0JBQWU7OztBQ0ZrZ0IsWUFBWSxRQUFRO0FBQ3BqQixZQUFZLFVBQVU7OztBQ0NQLFNBQVIsU0FBMEIsU0FBaUIsTUFBa0I7QUFDbEUsTUFBSSxRQUFnQixRQUFRLE9BQU87QUFFbkMsVUFB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QUFBLFFBQ2xELFNBQVNBLFNBQVEsVUFBVSxXQUFXLFlBQVk7QUFBQSxNQUNwRDtBQUFBLE1BQ0EsT0FBTztBQUFBLFFBQ0wsU0FBUyxDQUFDLFVBQVUsZ0JBQWdCO0FBQUEsUUFDcEMsU0FBUyxDQUFDLG1CQUFtQixrQkFBa0I7QUFBQSxNQUNqRDtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCRyxTQUNaLHdCQUNBO0FBQUEsUUFDSixnQkFBZ0IsQ0FBQyxjQUFjO0FBQzdCLGdCQUFNLEVBQUUsS0FBSyxNQUFNLE1BQU0sSUFBSUMsTUFBSyxNQUFNLFVBQVUsSUFBSTtBQUN0RCxnQkFBTSxjQUFjLElBQUksTUFBTSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQ3hDLGdCQUFNLE9BQU8sY0FBYyxlQUFlLEtBQUs7QUFDL0MsY0FBSSxTQUFTLGdCQUFnQjtBQUMzQixtQkFBTywwQkFBMEI7QUFBQSxVQUNuQztBQUNBLGlCQUFPLGdCQUFnQjtBQUFBLFFBQ3pCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQztBQUVELFNBQVMsZUFBZSxLQUFhO0FBQ25DLFFBQU0sZ0JBQWdCLElBQUksT0FBTyxjQUFjLEdBQUc7QUFDbEQsU0FBTyxJQUFJLFlBQVksRUFBRSxRQUFRLGVBQWUsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDO0FBQ3hFO0FBRUEsSUFBSSx1QkFBK0IsWUFBWTtBQUMvQyxTQUFTLGlDQUFpQztBQUN4Qyx5QkFBdUIsWUFBWTtBQUNuQyxTQUFPO0FBQ1Q7QUFFQSxTQUFTLGNBQXNCO0FBQzdCLFNBQU8sSUFBSSxLQUFLLElBQUksSUFBSSxLQUFLLFFBQVE7QUFDdkM7IiwKICAibmFtZXMiOiBbInBhdGgiLCAicmVzb2x2ZSIsICJtYW5pZmVzdCIsICJtYW5pZmVzdCIsICJtYWtlTWFuaWZlc3QiLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJyZXNvbHZlIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgInB1YmxpY0RpciIsICJpc0RldiIsICJwYXRoIl0KfQo=
