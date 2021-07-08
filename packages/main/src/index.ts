import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import { URL } from "url";
import { createHandlers, installHandlers } from "./modules/ipc";

const isSingleInstance = app.requestSingleInstanceLock();

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

// NOTE: why tho?
app.disableHardwareAcceleration();

/**
 * Workaround for TypeScript bug
 * @see https://github.com/microsoft/TypeScript/issues/41468#issuecomment-727543400
 */
const env = import.meta.env;

const handlers = createHandlers();

// Install handlers on IpcMain
installHandlers(ipcMain, handlers);

// Install devtools
if (env.MODE === "development") {
  app
    .whenReady()
    .then(() => import("electron-devtools-installer"))
    .then(({ default: installExtension, REACT_DEVELOPER_TOOLS }) =>
      installExtension(REACT_DEVELOPER_TOOLS)
    )
    .catch((e) => console.error("Failed install extension:", e));
}

let mainWindow: BrowserWindow | null = null;

const safeWebPref = {
  preload: join(__dirname, "../../preload/dist/index.cjs"),
  contextIsolation: env.MODE !== "test", // Spectron tests can't work with contextIsolation: true
  enableRemoteModule: env.MODE === "test", // Spectron tests can't work with enableRemoteModule: false
};

async function createWindow() {
  mainWindow = new BrowserWindow({
    show: false, // Use 'ready-to-show' event to show window
    webPreferences: safeWebPref,
    titleBarStyle: "hiddenInset",
  });

  /**
   * Add `inactive` class to `<body>` when main window went inactive
   *
   * @see https://www.electronjs.org/docs/api/web-contents#contentsexecutejavascriptcode-usergesture
   */
  function toggleWindowInactivity(inactive: boolean) {
    mainWindow?.webContents.executeJavaScript(
      `document.body.classList.toggle('inactive', ${inactive})`
    );
  }
  mainWindow
    .on("focus", () => toggleWindowInactivity(false))
    .on("blur", () => toggleWindowInactivity(true));

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  mainWindow.on("ready-to-show", () => {
    mainWindow?.show();

    if (env.MODE === "development") {
      mainWindow?.webContents.openDevTools();
    }
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl =
    env.MODE === "development"
      ? String(env.VITE_DEV_SERVER_URL)
      : new URL(
          "../renderer/dist/index.html",
          "file://" + __dirname
        ).toString();

  await mainWindow.loadURL(pageUrl);
}

app.on("second-instance", () => {
  console.log("second-instance");
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on("activate", () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  } else {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  mainWindow = null;
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app
  .whenReady()
  .then(createWindow)
  .catch((e) => console.error("Failed create window:", e));

// Auto-updates
if (env.PROD) {
  app
    .whenReady()
    .then(() => import("electron-updater"))
    .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
    .catch((e) => console.error("Failed check updates:", e));
}
