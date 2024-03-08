const fs = require('fs')
const path = require('path')
const { ipcMain } = require('electron')
function getBaseUrl() {
  const pathUrl = path.resolve(__dirname, '..', 'config.json')
  const config = JSON.parse(fs.readFileSync(pathUrl, 'utf8'))

  ipcMain.handle('getBaseUrl', () => {
    return config.baseUrl
  })
  return config.baseUrl
}

module.exports = { getBaseUrl }