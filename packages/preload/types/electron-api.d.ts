declare interface Window {
  electron: Readonly<import("../src/index").ElectronApi>;
  electronRequire?: NodeRequire;
}
