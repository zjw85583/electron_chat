'use strict'

import { app, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'
import { autoUpdater } from "electron-updater"
const { getBaseUrl } = require('./utils/getBaseUrl.js')
const path = require('path')
const { startProcess, exitProcess } = require('./server/index.js')
async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 550,
    // height: 300,
    webPreferences: {

      preload: path.join(__dirname, 'preload.js'),
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      // enableRemoteModule: true, // 是否允许使用remote
      webSecurity: false, // 允许跨域
    },
    // autoHideMenuBar: true,

  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// 自动更新
autoUpdater.on('update-available', () => {
  // 处理更新提示或者自动下载更新
});

autoUpdater.on('update-downloaded', () => {
  // 提示用户安装更新
  autoUpdater.quitAndInstall();
});

// 检查更新
autoUpdater.checkForUpdatesAndNotify();

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
    exitProcess()
  }
})

// app.on('activate', () => {
//   // On macOS it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (BrowserWindow.getAllWindows().length === 0) createWindow()
// })

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  createWindow()
  startProcess()
  getBaseUrl()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
        exitProcess()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
      exitProcess()
    })
  }
}
