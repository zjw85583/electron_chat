const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('ipc', {
  getBaseUrl1: () => ipcRenderer.invoke('getBaseUrl')
})