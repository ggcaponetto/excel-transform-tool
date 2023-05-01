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
  version: "0.1.2",
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
  name: "Excel Transformation Tool",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0LnRzIiwgInV0aWxzL2xvZy50cyIsICJ1dGlscy9tYW5pZmVzdC1wYXJzZXIvaW5kZXgudHMiLCAidXRpbHMvcGx1Z2lucy9jdXN0b20tZHluYW1pYy1pbXBvcnQudHMiLCAidXRpbHMvcGx1Z2lucy9hZGQtaG1yLnRzIiwgIm1hbmlmZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ2djYXBcXFxcV2Vic3Rvcm1Qcm9qZWN0c1xcXFxjaHJvbWUtZXh0ZW5zaW9uLXBsYXlncm91bmRcXFxcc3JjXFxcXGV4dGVuc2lvbnNcXFxcZXhjZWwtdHJhbnNmb3JtYXRpb24tdG9vbFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ2djYXBcXFxcV2Vic3Rvcm1Qcm9qZWN0c1xcXFxjaHJvbWUtZXh0ZW5zaW9uLXBsYXlncm91bmRcXFxcc3JjXFxcXGV4dGVuc2lvbnNcXFxcZXhjZWwtdHJhbnNmb3JtYXRpb24tdG9vbFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvZ2djYXAvV2Vic3Rvcm1Qcm9qZWN0cy9jaHJvbWUtZXh0ZW5zaW9uLXBsYXlncm91bmQvc3JjL2V4dGVuc2lvbnMvZXhjZWwtdHJhbnNmb3JtYXRpb24tdG9vbC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcclxuaW1wb3J0IHBhdGgsIHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBtYWtlTWFuaWZlc3QgZnJvbSBcIi4vdXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0XCI7XHJcbmltcG9ydCBjdXN0b21EeW5hbWljSW1wb3J0IGZyb20gXCIuL3V0aWxzL3BsdWdpbnMvY3VzdG9tLWR5bmFtaWMtaW1wb3J0XCI7XHJcbmltcG9ydCBhZGRIbXIgZnJvbSBcIi4vdXRpbHMvcGx1Z2lucy9hZGQtaG1yXCI7XHJcbmltcG9ydCBtYW5pZmVzdCBmcm9tIFwiLi9tYW5pZmVzdFwiO1xyXG5pbXBvcnQgZG90ZW52IGZyb20gXCJkb3RlbnZcIjtcclxuZG90ZW52LmNvbmZpZygpOyAvLyBsb2FkIGVudiB2YXJzIGZyb20gLmVudlxyXG5cclxuY29uc3Qgcm9vdCA9IHJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKTtcclxuY29uc3QgcGFnZXNEaXIgPSByZXNvbHZlKHJvb3QsIFwicGFnZXNcIik7XHJcbmNvbnN0IGFzc2V0c0RpciA9IHJlc29sdmUocm9vdCwgXCJhc3NldHNcIik7XHJcbmNvbnN0IG91dERpciA9IHJlc29sdmUoX19kaXJuYW1lLCBcImRpc3RcIik7XHJcbmNvbnN0IHB1YmxpY0RpciA9IHJlc29sdmUoX19kaXJuYW1lLCBcInB1YmxpY1wiKTtcclxuXHJcbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuX19ERVZfXyA9PT0gXCJ0cnVlXCI7XHJcbmNvbnN0IGlzUHJvZHVjdGlvbiA9ICFpc0RldjtcclxuXHJcbi8vIEVOQUJMRSBITVIgSU4gQkFDS0dST1VORCBTQ1JJUFRcclxuY29uc3QgZW5hYmxlSG1ySW5CYWNrZ3JvdW5kU2NyaXB0ID0gdHJ1ZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgZGVmaW5lOiB7XHJcbiAgICBcInByb2Nlc3MuZW52XCI6IE9iamVjdC5lbnRyaWVzKFxyXG4gICAgICBsb2FkRW52KFwibW9ja1wiLCBwcm9jZXNzLmN3ZCgpLCBcIlZJVEVfXCIpXHJcbiAgICApLnJlZHVjZSgocHJldiwgW2tleSwgdmFsXSkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnByZXYsXHJcbiAgICAgICAgW2tleV06IHZhbCxcclxuICAgICAgfTtcclxuICAgIH0sIHt9KSxcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQHNyY1wiOiByb290LFxyXG4gICAgICBcIkBhc3NldHNcIjogYXNzZXRzRGlyLFxyXG4gICAgICBcIkBwYWdlc1wiOiBwYWdlc0RpcixcclxuICAgIH0sXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgbWFrZU1hbmlmZXN0KG1hbmlmZXN0LCB7XHJcbiAgICAgIGlzRGV2LFxyXG4gICAgICBjb250ZW50U2NyaXB0Q3NzS2V5OiByZWdlbmVyYXRlQ2FjaGVJbnZhbGlkYXRpb25LZXkoKSxcclxuICAgIH0pLFxyXG4gICAgY3VzdG9tRHluYW1pY0ltcG9ydCgpLFxyXG4gICAgYWRkSG1yKHsgYmFja2dyb3VuZDogZW5hYmxlSG1ySW5CYWNrZ3JvdW5kU2NyaXB0LCB2aWV3OiB0cnVlIH0pLFxyXG4gIF0sXHJcbiAgcHVibGljRGlyLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBvdXREaXIsXHJcbiAgICAvKiogQ2FuIHNsb3dEb3duIGJ1aWxkIHNwZWVkLiAqL1xyXG4gICAgLy8gc291cmNlbWFwOiBpc0RldixcclxuICAgIG1pbmlmeTogaXNQcm9kdWN0aW9uLFxyXG4gICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IGlzUHJvZHVjdGlvbixcclxuICAgIHNvdXJjZW1hcDogaXNEZXYgPyBcImlubGluZVwiIDogdHJ1ZSxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgaW5wdXQ6IHtcclxuICAgICAgICBkZXZ0b29sczogcmVzb2x2ZShwYWdlc0RpciwgXCJkZXZ0b29sc1wiLCBcImluZGV4Lmh0bWxcIiksXHJcbiAgICAgICAgcGFuZWw6IHJlc29sdmUocGFnZXNEaXIsIFwicGFuZWxcIiwgXCJpbmRleC5odG1sXCIpLFxyXG4gICAgICAgIGNvbnRlbnQ6IHJlc29sdmUocGFnZXNEaXIsIFwiY29udGVudFwiLCBcImluZGV4LnRzXCIpLFxyXG4gICAgICAgIGJhY2tncm91bmQ6IHJlc29sdmUocGFnZXNEaXIsIFwiYmFja2dyb3VuZFwiLCBcImluZGV4LnRzXCIpLFxyXG4gICAgICAgIGNvbnRlbnRTdHlsZTogcmVzb2x2ZShwYWdlc0RpciwgXCJjb250ZW50XCIsIFwic3R5bGUuc2Nzc1wiKSxcclxuICAgICAgICBwb3B1cDogcmVzb2x2ZShwYWdlc0RpciwgXCJwb3B1cFwiLCBcImluZGV4Lmh0bWxcIiksXHJcbiAgICAgICAgbmV3dGFiOiByZXNvbHZlKHBhZ2VzRGlyLCBcIm5ld3RhYlwiLCBcImluZGV4Lmh0bWxcIiksXHJcbiAgICAgICAgb3B0aW9uczogcmVzb2x2ZShwYWdlc0RpciwgXCJvcHRpb25zXCIsIFwiaW5kZXguaHRtbFwiKSxcclxuICAgICAgICBzYW5kYm94OiByZXNvbHZlKHBhZ2VzRGlyLCBcInNhbmRib3hcIiwgXCJpbmRleC5odG1sXCIpLFxyXG4gICAgICB9LFxyXG4gICAgICB3YXRjaDoge1xyXG4gICAgICAgIGluY2x1ZGU6IFtcInNyYy8qKlwiLCBcInZpdGUuY29uZmlnLnRzXCJdLFxyXG4gICAgICAgIGV4Y2x1ZGU6IFtcIm5vZGVfbW9kdWxlcy8qKlwiLCBcInNyYy8qKi8qLnNwZWMudHNcIl0sXHJcbiAgICAgIH0sXHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcInNyYy9wYWdlcy9bbmFtZV0vaW5kZXguanNcIixcclxuICAgICAgICBjaHVua0ZpbGVOYW1lczogaXNEZXZcclxuICAgICAgICAgID8gXCJhc3NldHMvanMvW25hbWVdLmpzXCJcclxuICAgICAgICAgIDogXCJhc3NldHMvanMvW25hbWVdLltoYXNoXS5qc1wiLFxyXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB7IGRpciwgbmFtZTogX25hbWUgfSA9IHBhdGgucGFyc2UoYXNzZXRJbmZvLm5hbWUpO1xyXG4gICAgICAgICAgY29uc3QgYXNzZXRGb2xkZXIgPSBkaXIuc3BsaXQoXCIvXCIpLmF0KC0xKTtcclxuICAgICAgICAgIGNvbnN0IG5hbWUgPSBhc3NldEZvbGRlciArIGZpcnN0VXBwZXJDYXNlKF9uYW1lKTtcclxuICAgICAgICAgIGlmIChuYW1lID09PSBcImNvbnRlbnRTdHlsZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgYXNzZXRzL2Nzcy9jb250ZW50U3R5bGUke2NhY2hlSW52YWxpZGF0aW9uS2V5fS5jaHVuay5jc3NgO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGBhc3NldHMvW2V4dF0vJHtuYW1lfS5jaHVuay5bZXh0XWA7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcblxyXG5mdW5jdGlvbiBmaXJzdFVwcGVyQ2FzZShzdHI6IHN0cmluZykge1xyXG4gIGNvbnN0IGZpcnN0QWxwaGFiZXQgPSBuZXcgUmVnRXhwKC8oIHxeKVthLXpdLywgXCJnXCIpO1xyXG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKGZpcnN0QWxwaGFiZXQsIChMKSA9PiBMLnRvVXBwZXJDYXNlKCkpO1xyXG59XHJcblxyXG5sZXQgY2FjaGVJbnZhbGlkYXRpb25LZXk6IHN0cmluZyA9IGdlbmVyYXRlS2V5KCk7XHJcbmZ1bmN0aW9uIHJlZ2VuZXJhdGVDYWNoZUludmFsaWRhdGlvbktleSgpIHtcclxuICBjYWNoZUludmFsaWRhdGlvbktleSA9IGdlbmVyYXRlS2V5KCk7XHJcbiAgcmV0dXJuIGNhY2hlSW52YWxpZGF0aW9uS2V5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZUtleSgpOiBzdHJpbmcge1xyXG4gIHJldHVybiBgJHsoRGF0ZS5ub3coKSAvIDEwMCkudG9GaXhlZCgpfWA7XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxnZ2NhcFxcXFxXZWJzdG9ybVByb2plY3RzXFxcXGNocm9tZS1leHRlbnNpb24tcGxheWdyb3VuZFxcXFxzcmNcXFxcZXh0ZW5zaW9uc1xcXFxleGNlbC10cmFuc2Zvcm1hdGlvbi10b29sXFxcXHV0aWxzXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGdnY2FwXFxcXFdlYnN0b3JtUHJvamVjdHNcXFxcY2hyb21lLWV4dGVuc2lvbi1wbGF5Z3JvdW5kXFxcXHNyY1xcXFxleHRlbnNpb25zXFxcXGV4Y2VsLXRyYW5zZm9ybWF0aW9uLXRvb2xcXFxcdXRpbHNcXFxccGx1Z2luc1xcXFxtYWtlLW1hbmlmZXN0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9nZ2NhcC9XZWJzdG9ybVByb2plY3RzL2Nocm9tZS1leHRlbnNpb24tcGxheWdyb3VuZC9zcmMvZXh0ZW5zaW9ucy9leGNlbC10cmFuc2Zvcm1hdGlvbi10b29sL3V0aWxzL3BsdWdpbnMvbWFrZS1tYW5pZmVzdC50c1wiO2ltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBjb2xvckxvZyBmcm9tIFwiLi4vbG9nXCI7XHJcbmltcG9ydCB7IFBsdWdpbk9wdGlvbiB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCBNYW5pZmVzdFBhcnNlciBmcm9tIFwiLi4vbWFuaWZlc3QtcGFyc2VyXCI7XHJcblxyXG5jb25zdCB7IHJlc29sdmUgfSA9IHBhdGg7XHJcblxyXG5jb25zdCBkaXN0RGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi5cIiwgXCIuLlwiLCBcImRpc3RcIik7XHJcbmNvbnN0IHB1YmxpY0RpciA9IHJlc29sdmUoX19kaXJuYW1lLCBcIi4uXCIsIFwiLi5cIiwgXCJwdWJsaWNcIik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlTWFuaWZlc3QoXHJcbiAgbWFuaWZlc3Q6IGNocm9tZS5ydW50aW1lLk1hbmlmZXN0VjMsXHJcbiAgY29uZmlnOiB7IGlzRGV2OiBib29sZWFuOyBjb250ZW50U2NyaXB0Q3NzS2V5Pzogc3RyaW5nIH1cclxuKTogUGx1Z2luT3B0aW9uIHtcclxuICBmdW5jdGlvbiBtYWtlTWFuaWZlc3QodG86IHN0cmluZykge1xyXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKHRvKSkge1xyXG4gICAgICBmcy5ta2RpclN5bmModG8pO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbWFuaWZlc3RQYXRoID0gcmVzb2x2ZSh0bywgXCJtYW5pZmVzdC5qc29uXCIpO1xyXG5cclxuICAgIC8vIE5hbWluZyBjaGFuZ2UgZm9yIGNhY2hlIGludmFsaWRhdGlvblxyXG4gICAgaWYgKGNvbmZpZy5jb250ZW50U2NyaXB0Q3NzS2V5KSB7XHJcbiAgICAgIG1hbmlmZXN0LmNvbnRlbnRfc2NyaXB0cy5mb3JFYWNoKChzY3JpcHQpID0+IHtcclxuICAgICAgICBzY3JpcHQuY3NzID0gc2NyaXB0LmNzcy5tYXAoKGNzcykgPT5cclxuICAgICAgICAgIGNzcy5yZXBsYWNlKFwiPEtFWT5cIiwgY29uZmlnLmNvbnRlbnRTY3JpcHRDc3NLZXkpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnMud3JpdGVGaWxlU3luYyhcclxuICAgICAgbWFuaWZlc3RQYXRoLFxyXG4gICAgICBNYW5pZmVzdFBhcnNlci5jb252ZXJ0TWFuaWZlc3RUb1N0cmluZyhtYW5pZmVzdClcclxuICAgICk7XHJcblxyXG4gICAgY29sb3JMb2coYE1hbmlmZXN0IGZpbGUgY29weSBjb21wbGV0ZTogJHttYW5pZmVzdFBhdGh9YCwgXCJzdWNjZXNzXCIpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6IFwibWFrZS1tYW5pZmVzdFwiLFxyXG4gICAgYnVpbGRTdGFydCgpIHtcclxuICAgICAgaWYgKGNvbmZpZy5pc0Rldikge1xyXG4gICAgICAgIG1ha2VNYW5pZmVzdChkaXN0RGlyKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJ1aWxkRW5kKCkge1xyXG4gICAgICBpZiAoY29uZmlnLmlzRGV2KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIG1ha2VNYW5pZmVzdChwdWJsaWNEaXIpO1xyXG4gICAgfSxcclxuICB9O1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ2djYXBcXFxcV2Vic3Rvcm1Qcm9qZWN0c1xcXFxjaHJvbWUtZXh0ZW5zaW9uLXBsYXlncm91bmRcXFxcc3JjXFxcXGV4dGVuc2lvbnNcXFxcZXhjZWwtdHJhbnNmb3JtYXRpb24tdG9vbFxcXFx1dGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ2djYXBcXFxcV2Vic3Rvcm1Qcm9qZWN0c1xcXFxjaHJvbWUtZXh0ZW5zaW9uLXBsYXlncm91bmRcXFxcc3JjXFxcXGV4dGVuc2lvbnNcXFxcZXhjZWwtdHJhbnNmb3JtYXRpb24tdG9vbFxcXFx1dGlsc1xcXFxsb2cudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2dnY2FwL1dlYnN0b3JtUHJvamVjdHMvY2hyb21lLWV4dGVuc2lvbi1wbGF5Z3JvdW5kL3NyYy9leHRlbnNpb25zL2V4Y2VsLXRyYW5zZm9ybWF0aW9uLXRvb2wvdXRpbHMvbG9nLnRzXCI7dHlwZSBDb2xvclR5cGUgPSBcInN1Y2Nlc3NcIiB8IFwiaW5mb1wiIHwgXCJlcnJvclwiIHwgXCJ3YXJuaW5nXCIgfCBrZXlvZiB0eXBlb2YgQ09MT1JTO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29sb3JMb2cobWVzc2FnZTogc3RyaW5nLCB0eXBlPzogQ29sb3JUeXBlKSB7XHJcbiAgbGV0IGNvbG9yOiBzdHJpbmcgPSB0eXBlIHx8IENPTE9SUy5GZ0JsYWNrO1xyXG5cclxuICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgIGNhc2UgXCJzdWNjZXNzXCI6XHJcbiAgICAgIGNvbG9yID0gQ09MT1JTLkZnR3JlZW47XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImluZm9cIjpcclxuICAgICAgY29sb3IgPSBDT0xPUlMuRmdCbHVlO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJlcnJvclwiOlxyXG4gICAgICBjb2xvciA9IENPTE9SUy5GZ1JlZDtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwid2FybmluZ1wiOlxyXG4gICAgICBjb2xvciA9IENPTE9SUy5GZ1llbGxvdztcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmxvZyhjb2xvciwgbWVzc2FnZSk7XHJcbn1cclxuXHJcbmNvbnN0IENPTE9SUyA9IHtcclxuICBSZXNldDogXCJcXHgxYlswbVwiLFxyXG4gIEJyaWdodDogXCJcXHgxYlsxbVwiLFxyXG4gIERpbTogXCJcXHgxYlsybVwiLFxyXG4gIFVuZGVyc2NvcmU6IFwiXFx4MWJbNG1cIixcclxuICBCbGluazogXCJcXHgxYls1bVwiLFxyXG4gIFJldmVyc2U6IFwiXFx4MWJbN21cIixcclxuICBIaWRkZW46IFwiXFx4MWJbOG1cIixcclxuICBGZ0JsYWNrOiBcIlxceDFiWzMwbVwiLFxyXG4gIEZnUmVkOiBcIlxceDFiWzMxbVwiLFxyXG4gIEZnR3JlZW46IFwiXFx4MWJbMzJtXCIsXHJcbiAgRmdZZWxsb3c6IFwiXFx4MWJbMzNtXCIsXHJcbiAgRmdCbHVlOiBcIlxceDFiWzM0bVwiLFxyXG4gIEZnTWFnZW50YTogXCJcXHgxYlszNW1cIixcclxuICBGZ0N5YW46IFwiXFx4MWJbMzZtXCIsXHJcbiAgRmdXaGl0ZTogXCJcXHgxYlszN21cIixcclxuICBCZ0JsYWNrOiBcIlxceDFiWzQwbVwiLFxyXG4gIEJnUmVkOiBcIlxceDFiWzQxbVwiLFxyXG4gIEJnR3JlZW46IFwiXFx4MWJbNDJtXCIsXHJcbiAgQmdZZWxsb3c6IFwiXFx4MWJbNDNtXCIsXHJcbiAgQmdCbHVlOiBcIlxceDFiWzQ0bVwiLFxyXG4gIEJnTWFnZW50YTogXCJcXHgxYls0NW1cIixcclxuICBCZ0N5YW46IFwiXFx4MWJbNDZtXCIsXHJcbiAgQmdXaGl0ZTogXCJcXHgxYls0N21cIixcclxufSBhcyBjb25zdDtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxnZ2NhcFxcXFxXZWJzdG9ybVByb2plY3RzXFxcXGNocm9tZS1leHRlbnNpb24tcGxheWdyb3VuZFxcXFxzcmNcXFxcZXh0ZW5zaW9uc1xcXFxleGNlbC10cmFuc2Zvcm1hdGlvbi10b29sXFxcXHV0aWxzXFxcXG1hbmlmZXN0LXBhcnNlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ2djYXBcXFxcV2Vic3Rvcm1Qcm9qZWN0c1xcXFxjaHJvbWUtZXh0ZW5zaW9uLXBsYXlncm91bmRcXFxcc3JjXFxcXGV4dGVuc2lvbnNcXFxcZXhjZWwtdHJhbnNmb3JtYXRpb24tdG9vbFxcXFx1dGlsc1xcXFxtYW5pZmVzdC1wYXJzZXJcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2dnY2FwL1dlYnN0b3JtUHJvamVjdHMvY2hyb21lLWV4dGVuc2lvbi1wbGF5Z3JvdW5kL3NyYy9leHRlbnNpb25zL2V4Y2VsLXRyYW5zZm9ybWF0aW9uLXRvb2wvdXRpbHMvbWFuaWZlc3QtcGFyc2VyL2luZGV4LnRzXCI7dHlwZSBNYW5pZmVzdCA9IGNocm9tZS5ydW50aW1lLk1hbmlmZXN0VjM7XHJcblxyXG5jbGFzcyBNYW5pZmVzdFBhcnNlciB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvblxyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBzdGF0aWMgY29udmVydE1hbmlmZXN0VG9TdHJpbmcobWFuaWZlc3Q6IE1hbmlmZXN0KTogc3RyaW5nIHtcclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShtYW5pZmVzdCwgbnVsbCwgMik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5pZmVzdFBhcnNlcjtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxnZ2NhcFxcXFxXZWJzdG9ybVByb2plY3RzXFxcXGNocm9tZS1leHRlbnNpb24tcGxheWdyb3VuZFxcXFxzcmNcXFxcZXh0ZW5zaW9uc1xcXFxleGNlbC10cmFuc2Zvcm1hdGlvbi10b29sXFxcXHV0aWxzXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGdnY2FwXFxcXFdlYnN0b3JtUHJvamVjdHNcXFxcY2hyb21lLWV4dGVuc2lvbi1wbGF5Z3JvdW5kXFxcXHNyY1xcXFxleHRlbnNpb25zXFxcXGV4Y2VsLXRyYW5zZm9ybWF0aW9uLXRvb2xcXFxcdXRpbHNcXFxccGx1Z2luc1xcXFxjdXN0b20tZHluYW1pYy1pbXBvcnQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2dnY2FwL1dlYnN0b3JtUHJvamVjdHMvY2hyb21lLWV4dGVuc2lvbi1wbGF5Z3JvdW5kL3NyYy9leHRlbnNpb25zL2V4Y2VsLXRyYW5zZm9ybWF0aW9uLXRvb2wvdXRpbHMvcGx1Z2lucy9jdXN0b20tZHluYW1pYy1pbXBvcnQudHNcIjtpbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3VzdG9tRHluYW1pY0ltcG9ydCgpOiBQbHVnaW5PcHRpb24ge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiBcImN1c3RvbS1keW5hbWljLWltcG9ydFwiLFxyXG4gICAgcmVuZGVyRHluYW1pY0ltcG9ydCgpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBsZWZ0OiBgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgY29uc3QgZHluYW1pY0ltcG9ydCA9IChwYXRoKSA9PiBpbXBvcnQocGF0aCk7XHJcbiAgICAgICAgICBkeW5hbWljSW1wb3J0KFxyXG4gICAgICAgICAgYCxcclxuICAgICAgICByaWdodDogXCIpfVwiLFxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICB9O1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ2djYXBcXFxcV2Vic3Rvcm1Qcm9qZWN0c1xcXFxjaHJvbWUtZXh0ZW5zaW9uLXBsYXlncm91bmRcXFxcc3JjXFxcXGV4dGVuc2lvbnNcXFxcZXhjZWwtdHJhbnNmb3JtYXRpb24tdG9vbFxcXFx1dGlsc1xcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxnZ2NhcFxcXFxXZWJzdG9ybVByb2plY3RzXFxcXGNocm9tZS1leHRlbnNpb24tcGxheWdyb3VuZFxcXFxzcmNcXFxcZXh0ZW5zaW9uc1xcXFxleGNlbC10cmFuc2Zvcm1hdGlvbi10b29sXFxcXHV0aWxzXFxcXHBsdWdpbnNcXFxcYWRkLWhtci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvZ2djYXAvV2Vic3Rvcm1Qcm9qZWN0cy9jaHJvbWUtZXh0ZW5zaW9uLXBsYXlncm91bmQvc3JjL2V4dGVuc2lvbnMvZXhjZWwtdHJhbnNmb3JtYXRpb24tdG9vbC91dGlscy9wbHVnaW5zL2FkZC1obXIudHNcIjtpbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IFBsdWdpbk9wdGlvbiB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gXCJmc1wiO1xyXG5cclxuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5fX0RFVl9fID09PSBcInRydWVcIjtcclxuXHJcbmNvbnN0IERVTU1ZX0NPREUgPSBgZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKXt9O2A7XHJcblxyXG5mdW5jdGlvbiBnZXRJbmplY3Rpb25Db2RlKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIHJldHVybiByZWFkRmlsZVN5bmMoXHJcbiAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uXCIsIFwicmVsb2FkXCIsIFwiaW5qZWN0aW9uc1wiLCBmaWxlTmFtZSksXHJcbiAgICB7IGVuY29kaW5nOiBcInV0ZjhcIiB9XHJcbiAgKTtcclxufVxyXG5cclxudHlwZSBDb25maWcgPSB7XHJcbiAgYmFja2dyb3VuZD86IGJvb2xlYW47XHJcbiAgdmlldz86IGJvb2xlYW47XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRIbXIoY29uZmlnPzogQ29uZmlnKTogUGx1Z2luT3B0aW9uIHtcclxuICBjb25zdCB7IGJhY2tncm91bmQgPSBmYWxzZSwgdmlldyA9IHRydWUgfSA9IGNvbmZpZyB8fCB7fTtcclxuICBjb25zdCBpZEluQmFja2dyb3VuZFNjcmlwdCA9IFwidmlydHVhbDpyZWxvYWQtb24tdXBkYXRlLWluLWJhY2tncm91bmQtc2NyaXB0XCI7XHJcbiAgY29uc3QgaWRJblZpZXcgPSBcInZpcnR1YWw6cmVsb2FkLW9uLXVwZGF0ZS1pbi12aWV3XCI7XHJcblxyXG4gIGNvbnN0IHNjcmlwdEhtckNvZGUgPSBpc0RldiA/IGdldEluamVjdGlvbkNvZGUoXCJzY3JpcHQuanNcIikgOiBEVU1NWV9DT0RFO1xyXG4gIGNvbnN0IHZpZXdIbXJDb2RlID0gaXNEZXYgPyBnZXRJbmplY3Rpb25Db2RlKFwidmlldy5qc1wiKSA6IERVTU1ZX0NPREU7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiBcImFkZC1obXJcIixcclxuICAgIHJlc29sdmVJZChpZCkge1xyXG4gICAgICBpZiAoaWQgPT09IGlkSW5CYWNrZ3JvdW5kU2NyaXB0IHx8IGlkID09PSBpZEluVmlldykge1xyXG4gICAgICAgIHJldHVybiBnZXRSZXNvbHZlZElkKGlkKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGxvYWQoaWQpIHtcclxuICAgICAgaWYgKGlkID09PSBnZXRSZXNvbHZlZElkKGlkSW5CYWNrZ3JvdW5kU2NyaXB0KSkge1xyXG4gICAgICAgIHJldHVybiBiYWNrZ3JvdW5kID8gc2NyaXB0SG1yQ29kZSA6IERVTU1ZX0NPREU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpZCA9PT0gZ2V0UmVzb2x2ZWRJZChpZEluVmlldykpIHtcclxuICAgICAgICByZXR1cm4gdmlldyA/IHZpZXdIbXJDb2RlIDogRFVNTVlfQ09ERTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRSZXNvbHZlZElkKGlkOiBzdHJpbmcpIHtcclxuICByZXR1cm4gXCJcXDBcIiArIGlkO1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ2djYXBcXFxcV2Vic3Rvcm1Qcm9qZWN0c1xcXFxjaHJvbWUtZXh0ZW5zaW9uLXBsYXlncm91bmRcXFxcc3JjXFxcXGV4dGVuc2lvbnNcXFxcZXhjZWwtdHJhbnNmb3JtYXRpb24tdG9vbFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ2djYXBcXFxcV2Vic3Rvcm1Qcm9qZWN0c1xcXFxjaHJvbWUtZXh0ZW5zaW9uLXBsYXlncm91bmRcXFxcc3JjXFxcXGV4dGVuc2lvbnNcXFxcZXhjZWwtdHJhbnNmb3JtYXRpb24tdG9vbFxcXFxtYW5pZmVzdC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvZ2djYXAvV2Vic3Rvcm1Qcm9qZWN0cy9jaHJvbWUtZXh0ZW5zaW9uLXBsYXlncm91bmQvc3JjL2V4dGVuc2lvbnMvZXhjZWwtdHJhbnNmb3JtYXRpb24tdG9vbC9tYW5pZmVzdC50c1wiO2ltcG9ydCBwYWNrYWdlSnNvbiBmcm9tIFwiLi9wYWNrYWdlLmpzb25cIjtcclxuXHJcbi8qKlxyXG4gKiBBZnRlciBjaGFuZ2luZywgcGxlYXNlIHJlbG9hZCB0aGUgZXh0ZW5zaW9uIGF0IGBjaHJvbWU6Ly9leHRlbnNpb25zYFxyXG4gKi9cclxuY29uc3QgbWFuaWZlc3Q6IGNocm9tZS5ydW50aW1lLk1hbmlmZXN0VjMgPSB7XHJcbiAgbWFuaWZlc3RfdmVyc2lvbjogMyxcclxuICBuYW1lOiBcIkV4Y2VsIFRyYW5zZm9ybWF0aW9uIFRvb2xcIixcclxuICB2ZXJzaW9uOiBwYWNrYWdlSnNvbi52ZXJzaW9uLFxyXG4gIGRlc2NyaXB0aW9uOiBwYWNrYWdlSnNvbi5kZXNjcmlwdGlvbixcclxuICBvcHRpb25zX3BhZ2U6IFwic3JjL3BhZ2VzL29wdGlvbnMvaW5kZXguaHRtbFwiLFxyXG4gIHBlcm1pc3Npb25zOiBbXCJ0YWJzXCIsIFwic3RvcmFnZVwiLCBcImFjdGl2ZVRhYlwiLCBcInNjcmlwdGluZ1wiLCBcIndlYlJlcXVlc3RcIl0sXHJcbiAgYmFja2dyb3VuZDoge1xyXG4gICAgc2VydmljZV93b3JrZXI6IFwic3JjL3BhZ2VzL2JhY2tncm91bmQvaW5kZXguanNcIixcclxuICAgIHR5cGU6IFwibW9kdWxlXCIsXHJcbiAgfSxcclxuICBjb250ZW50X3NlY3VyaXR5X3BvbGljeToge1xyXG4gICAgc2FuZGJveDpcclxuICAgICAgXCJzYW5kYm94IGFsbG93LXNjcmlwdHMgYWxsb3ctZm9ybXMgYWxsb3ctcG9wdXBzIGFsbG93LW1vZGFsczsgc2NyaXB0LXNyYyAnc2VsZicgJ3Vuc2FmZS1pbmxpbmUnICd1bnNhZmUtZXZhbCc7IGNoaWxkLXNyYyAnc2VsZic7XCIsXHJcbiAgfSxcclxuICBzYW5kYm94OiB7XHJcbiAgICBwYWdlczogW1wic3JjL3BhZ2VzL3NhbmRib3gvaW5kZXguaHRtbFwiXSxcclxuICB9LFxyXG4gIGFjdGlvbjoge1xyXG4gICAgZGVmYXVsdF9wb3B1cDogXCJzcmMvcGFnZXMvcG9wdXAvaW5kZXguaHRtbFwiLFxyXG4gICAgZGVmYXVsdF9pY29uOiBcImljb24tMjUwLnBuZ1wiLFxyXG4gIH0sXHJcbiAgLypjaHJvbWVfdXJsX292ZXJyaWRlczoge1xyXG4gICAgbmV3dGFiOiBcInNyYy9wYWdlcy9uZXd0YWIvaW5kZXguaHRtbFwiLFxyXG4gIH0sKi9cclxuICBpY29uczoge1xyXG4gICAgXCIyNTBcIjogXCJpY29uLTI1MC5wbmdcIixcclxuICB9LFxyXG4gIGNvbnRlbnRfc2NyaXB0czogW1xyXG4gICAge1xyXG4gICAgICBtYXRjaGVzOiBbXCJodHRwczovL2V4dGVuc2lvbnBheS5jb20vKlwiXSxcclxuICAgICAganM6IFtcInNyYy9wYWdlcy9jb250ZW50L2luZGV4LmpzXCJdLFxyXG4gICAgICBydW5fYXQ6IFwiZG9jdW1lbnRfc3RhcnRcIixcclxuICAgICAgY3NzOiBbXCJhc3NldHMvY3NzL2NvbnRlbnRTdHlsZTxLRVk+LmNodW5rLmNzc1wiXSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG1hdGNoZXM6IFtcImh0dHA6Ly8qLypcIiwgXCJodHRwczovLyovKlwiLCBcIjxhbGxfdXJscz5cIl0sXHJcbiAgICAgIGpzOiBbXCJzcmMvcGFnZXMvY29udGVudC9pbmRleC5qc1wiXSxcclxuICAgICAgcnVuX2F0OiBcImRvY3VtZW50X3N0YXJ0XCIsXHJcbiAgICAgIC8vIEtFWSBmb3IgY2FjaGUgaW52YWxpZGF0aW9uXHJcbiAgICAgIGNzczogW1wiYXNzZXRzL2Nzcy9jb250ZW50U3R5bGU8S0VZPi5jaHVuay5jc3NcIl0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgZGV2dG9vbHNfcGFnZTogXCJzcmMvcGFnZXMvZGV2dG9vbHMvaW5kZXguaHRtbFwiLFxyXG4gIHdlYl9hY2Nlc3NpYmxlX3Jlc291cmNlczogW1xyXG4gICAge1xyXG4gICAgICByZXNvdXJjZXM6IFtcImFzc2V0cy9qcy8qLmpzXCIsIFwiYXNzZXRzL2Nzcy8qLmNzc1wiLCBcImljb24tMjUwLnBuZ1wiXSxcclxuICAgICAgbWF0Y2hlczogW1wiKjovLyovKlwiXSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1hbmlmZXN0O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThlLFNBQVMsY0FBYyxlQUFlO0FBQ3BoQixPQUFPLFdBQVc7QUFDbEIsT0FBT0EsU0FBUSxXQUFBQyxnQkFBZTs7O0FDRmtnQixZQUFZLFFBQVE7QUFDcGpCLFlBQVksVUFBVTs7O0FDQ1AsU0FBUixTQUEwQixTQUFpQixNQUFrQjtBQUNsRSxNQUFJLFFBQWdCLFFBQVEsT0FBTztBQUVuQyxVQUFRLE1BQU07QUFBQSxJQUNaLEtBQUs7QUFDSCxjQUFRLE9BQU87QUFDZjtBQUFBLElBQ0YsS0FBSztBQUNILGNBQVEsT0FBTztBQUNmO0FBQUEsSUFDRixLQUFLO0FBQ0gsY0FBUSxPQUFPO0FBQ2Y7QUFBQSxJQUNGLEtBQUs7QUFDSCxjQUFRLE9BQU87QUFDZjtBQUFBLEVBQ0o7QUFFQSxVQUFRLElBQUksT0FBTyxPQUFPO0FBQzVCO0FBRUEsSUFBTSxTQUFTO0FBQUEsRUFDYixPQUFPO0FBQUEsRUFDUCxRQUFRO0FBQUEsRUFDUixLQUFLO0FBQUEsRUFDTCxZQUFZO0FBQUEsRUFDWixPQUFPO0FBQUEsRUFDUCxTQUFTO0FBQUEsRUFDVCxRQUFRO0FBQUEsRUFDUixTQUFTO0FBQUEsRUFDVCxPQUFPO0FBQUEsRUFDUCxTQUFTO0FBQUEsRUFDVCxVQUFVO0FBQUEsRUFDVixRQUFRO0FBQUEsRUFDUixXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsRUFDUixTQUFTO0FBQUEsRUFDVCxTQUFTO0FBQUEsRUFDVCxPQUFPO0FBQUEsRUFDUCxTQUFTO0FBQUEsRUFDVCxVQUFVO0FBQUEsRUFDVixRQUFRO0FBQUEsRUFDUixXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsRUFDUixTQUFTO0FBQ1g7OztBQzdDQSxJQUFNLGlCQUFOLE1BQXFCO0FBQUEsRUFFWCxjQUFjO0FBQUEsRUFBQztBQUFBLEVBRXZCLE9BQU8sd0JBQXdCQyxXQUE0QjtBQUN6RCxXQUFPLEtBQUssVUFBVUEsV0FBVSxNQUFNLENBQUM7QUFBQSxFQUN6QztBQUNGO0FBRUEsSUFBTywwQkFBUTs7O0FGWGYsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTSxFQUFFLFFBQVEsSUFBSTtBQUVwQixJQUFNLFVBQVUsUUFBUSxrQ0FBVyxNQUFNLE1BQU0sTUFBTTtBQUNyRCxJQUFNLFlBQVksUUFBUSxrQ0FBVyxNQUFNLE1BQU0sUUFBUTtBQUUxQyxTQUFSLGFBQ0xDLFdBQ0EsUUFDYztBQUNkLFdBQVNDLGNBQWEsSUFBWTtBQUNoQyxRQUFJLENBQUksY0FBVyxFQUFFLEdBQUc7QUFDdEIsTUFBRyxhQUFVLEVBQUU7QUFBQSxJQUNqQjtBQUNBLFVBQU0sZUFBZSxRQUFRLElBQUksZUFBZTtBQUdoRCxRQUFJLE9BQU8scUJBQXFCO0FBQzlCLE1BQUFELFVBQVMsZ0JBQWdCLFFBQVEsQ0FBQyxXQUFXO0FBQzNDLGVBQU8sTUFBTSxPQUFPLElBQUk7QUFBQSxVQUFJLENBQUMsUUFDM0IsSUFBSSxRQUFRLFNBQVMsT0FBTyxtQkFBbUI7QUFBQSxRQUNqRDtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFFQSxJQUFHO0FBQUEsTUFDRDtBQUFBLE1BQ0Esd0JBQWUsd0JBQXdCQSxTQUFRO0FBQUEsSUFDakQ7QUFFQSxhQUFTLGdDQUFnQyxnQkFBZ0IsU0FBUztBQUFBLEVBQ3BFO0FBRUEsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sYUFBYTtBQUNYLFVBQUksT0FBTyxPQUFPO0FBQ2hCLFFBQUFDLGNBQWEsT0FBTztBQUFBLE1BQ3RCO0FBQUEsSUFDRjtBQUFBLElBQ0EsV0FBVztBQUNULFVBQUksT0FBTyxPQUFPO0FBQ2hCO0FBQUEsTUFDRjtBQUNBLE1BQUFBLGNBQWEsU0FBUztBQUFBLElBQ3hCO0FBQUEsRUFDRjtBQUNGOzs7QUdsRGUsU0FBUixzQkFBcUQ7QUFDMUQsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sc0JBQXNCO0FBQ3BCLGFBQU87QUFBQSxRQUNMLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBS04sT0FBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOzs7QUNoQm9oQixZQUFZQyxXQUFVO0FBRTFpQixTQUFTLG9CQUFvQjtBQUY3QixJQUFNQyxvQ0FBbUM7QUFJekMsSUFBTSxRQUFRLFFBQVEsSUFBSSxZQUFZO0FBRXRDLElBQU0sYUFBYTtBQUVuQixTQUFTLGlCQUFpQixVQUEwQjtBQUNsRCxTQUFPO0FBQUEsSUFDQSxjQUFRQyxtQ0FBVyxNQUFNLFVBQVUsY0FBYyxRQUFRO0FBQUEsSUFDOUQsRUFBRSxVQUFVLE9BQU87QUFBQSxFQUNyQjtBQUNGO0FBT2UsU0FBUixPQUF3QixRQUErQjtBQUM1RCxRQUFNLEVBQUUsYUFBYSxPQUFPLE9BQU8sS0FBSyxJQUFJLFVBQVUsQ0FBQztBQUN2RCxRQUFNLHVCQUF1QjtBQUM3QixRQUFNLFdBQVc7QUFFakIsUUFBTSxnQkFBZ0IsUUFBUSxpQkFBaUIsV0FBVyxJQUFJO0FBQzlELFFBQU0sY0FBYyxRQUFRLGlCQUFpQixTQUFTLElBQUk7QUFFMUQsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sVUFBVSxJQUFJO0FBQ1osVUFBSSxPQUFPLHdCQUF3QixPQUFPLFVBQVU7QUFDbEQsZUFBTyxjQUFjLEVBQUU7QUFBQSxNQUN6QjtBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUssSUFBSTtBQUNQLFVBQUksT0FBTyxjQUFjLG9CQUFvQixHQUFHO0FBQzlDLGVBQU8sYUFBYSxnQkFBZ0I7QUFBQSxNQUN0QztBQUVBLFVBQUksT0FBTyxjQUFjLFFBQVEsR0FBRztBQUNsQyxlQUFPLE9BQU8sY0FBYztBQUFBLE1BQzlCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLFNBQVMsY0FBYyxJQUFZO0FBQ2pDLFNBQU8sT0FBTztBQUNoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUNBLElBQU0sV0FBc0M7QUFBQSxFQUMxQyxrQkFBa0I7QUFBQSxFQUNsQixNQUFNO0FBQUEsRUFDTixTQUFTLGdCQUFZO0FBQUEsRUFDckIsYUFBYSxnQkFBWTtBQUFBLEVBQ3pCLGNBQWM7QUFBQSxFQUNkLGFBQWEsQ0FBQyxRQUFRLFdBQVcsYUFBYSxhQUFhLFlBQVk7QUFBQSxFQUN2RSxZQUFZO0FBQUEsSUFDVixnQkFBZ0I7QUFBQSxJQUNoQixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EseUJBQXlCO0FBQUEsSUFDdkIsU0FDRTtBQUFBLEVBQ0o7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU8sQ0FBQyw4QkFBOEI7QUFBQSxFQUN4QztBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sZUFBZTtBQUFBLElBQ2YsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFJQSxPQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsaUJBQWlCO0FBQUEsSUFDZjtBQUFBLE1BQ0UsU0FBUyxDQUFDLDRCQUE0QjtBQUFBLE1BQ3RDLElBQUksQ0FBQyw0QkFBNEI7QUFBQSxNQUNqQyxRQUFRO0FBQUEsTUFDUixLQUFLLENBQUMsd0NBQXdDO0FBQUEsSUFDaEQ7QUFBQSxJQUNBO0FBQUEsTUFDRSxTQUFTLENBQUMsY0FBYyxlQUFlLFlBQVk7QUFBQSxNQUNuRCxJQUFJLENBQUMsNEJBQTRCO0FBQUEsTUFDakMsUUFBUTtBQUFBLE1BRVIsS0FBSyxDQUFDLHdDQUF3QztBQUFBLElBQ2hEO0FBQUEsRUFDRjtBQUFBLEVBQ0EsZUFBZTtBQUFBLEVBQ2YsMEJBQTBCO0FBQUEsSUFDeEI7QUFBQSxNQUNFLFdBQVcsQ0FBQyxrQkFBa0Isb0JBQW9CLGNBQWM7QUFBQSxNQUNoRSxTQUFTLENBQUMsU0FBUztBQUFBLElBQ3JCO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTyxtQkFBUTs7O0FObERmLE9BQU8sWUFBWTtBQVBuQixJQUFNQyxvQ0FBbUM7QUFRekMsT0FBTyxPQUFPO0FBRWQsSUFBTSxPQUFPQyxTQUFRQyxtQ0FBVyxLQUFLO0FBQ3JDLElBQU0sV0FBV0QsU0FBUSxNQUFNLE9BQU87QUFDdEMsSUFBTSxZQUFZQSxTQUFRLE1BQU0sUUFBUTtBQUN4QyxJQUFNLFNBQVNBLFNBQVFDLG1DQUFXLE1BQU07QUFDeEMsSUFBTUMsYUFBWUYsU0FBUUMsbUNBQVcsUUFBUTtBQUU3QyxJQUFNRSxTQUFRLFFBQVEsSUFBSSxZQUFZO0FBQ3RDLElBQU0sZUFBZSxDQUFDQTtBQUd0QixJQUFNLDhCQUE4QjtBQUVwQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixlQUFlLE9BQU87QUFBQSxNQUNwQixRQUFRLFFBQVEsUUFBUSxJQUFJLEdBQUcsT0FBTztBQUFBLElBQ3hDLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTTtBQUM3QixhQUFPO0FBQUEsUUFDTCxHQUFHO0FBQUEsUUFDSCxDQUFDLE1BQU07QUFBQSxNQUNUO0FBQUEsSUFDRixHQUFHLENBQUMsQ0FBQztBQUFBLEVBQ1A7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFdBQVc7QUFBQSxNQUNYLFVBQVU7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sYUFBYSxrQkFBVTtBQUFBLE1BQ3JCLE9BQUFBO0FBQUEsTUFDQSxxQkFBcUIsK0JBQStCO0FBQUEsSUFDdEQsQ0FBQztBQUFBLElBQ0Qsb0JBQW9CO0FBQUEsSUFDcEIsT0FBTyxFQUFFLFlBQVksNkJBQTZCLE1BQU0sS0FBSyxDQUFDO0FBQUEsRUFDaEU7QUFBQSxFQUNBLFdBQUFEO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTDtBQUFBLElBR0EsUUFBUTtBQUFBLElBQ1Isc0JBQXNCO0FBQUEsSUFDdEIsV0FBV0MsU0FBUSxXQUFXO0FBQUEsSUFDOUIsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsVUFBVUgsU0FBUSxVQUFVLFlBQVksWUFBWTtBQUFBLFFBQ3BELE9BQU9BLFNBQVEsVUFBVSxTQUFTLFlBQVk7QUFBQSxRQUM5QyxTQUFTQSxTQUFRLFVBQVUsV0FBVyxVQUFVO0FBQUEsUUFDaEQsWUFBWUEsU0FBUSxVQUFVLGNBQWMsVUFBVTtBQUFBLFFBQ3RELGNBQWNBLFNBQVEsVUFBVSxXQUFXLFlBQVk7QUFBQSxRQUN2RCxPQUFPQSxTQUFRLFVBQVUsU0FBUyxZQUFZO0FBQUEsUUFDOUMsUUFBUUEsU0FBUSxVQUFVLFVBQVUsWUFBWTtBQUFBLFFBQ2hELFNBQVNBLFNBQVEsVUFBVSxXQUFXLFlBQVk7QUFBQSxRQUNsRCxTQUFTQSxTQUFRLFVBQVUsV0FBVyxZQUFZO0FBQUEsTUFDcEQ7QUFBQSxNQUNBLE9BQU87QUFBQSxRQUNMLFNBQVMsQ0FBQyxVQUFVLGdCQUFnQjtBQUFBLFFBQ3BDLFNBQVMsQ0FBQyxtQkFBbUIsa0JBQWtCO0FBQUEsTUFDakQ7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQkcsU0FDWix3QkFDQTtBQUFBLFFBQ0osZ0JBQWdCLENBQUMsY0FBYztBQUM3QixnQkFBTSxFQUFFLEtBQUssTUFBTSxNQUFNLElBQUlDLE1BQUssTUFBTSxVQUFVLElBQUk7QUFDdEQsZ0JBQU0sY0FBYyxJQUFJLE1BQU0sR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUN4QyxnQkFBTSxPQUFPLGNBQWMsZUFBZSxLQUFLO0FBQy9DLGNBQUksU0FBUyxnQkFBZ0I7QUFDM0IsbUJBQU8sMEJBQTBCO0FBQUEsVUFDbkM7QUFDQSxpQkFBTyxnQkFBZ0I7QUFBQSxRQUN6QjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7QUFFRCxTQUFTLGVBQWUsS0FBYTtBQUNuQyxRQUFNLGdCQUFnQixJQUFJLE9BQU8sY0FBYyxHQUFHO0FBQ2xELFNBQU8sSUFBSSxZQUFZLEVBQUUsUUFBUSxlQUFlLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQztBQUN4RTtBQUVBLElBQUksdUJBQStCLFlBQVk7QUFDL0MsU0FBUyxpQ0FBaUM7QUFDeEMseUJBQXVCLFlBQVk7QUFDbkMsU0FBTztBQUNUO0FBRUEsU0FBUyxjQUFzQjtBQUM3QixTQUFPLElBQUksS0FBSyxJQUFJLElBQUksS0FBSyxRQUFRO0FBQ3ZDOyIsCiAgIm5hbWVzIjogWyJwYXRoIiwgInJlc29sdmUiLCAibWFuaWZlc3QiLCAibWFuaWZlc3QiLCAibWFrZU1hbmlmZXN0IiwgInBhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAicmVzb2x2ZSIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJwdWJsaWNEaXIiLCAiaXNEZXYiLCAicGF0aCJdCn0K
