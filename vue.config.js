const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: '127.0.0.1',
    port: 8888
  },
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
  },
  pluginOptions: {
    electronBuilder: {
      preload: path.join(__dirname, 'src/preload/index.js'),
      builderOptions: {
        productName: "聊天hh",
        appId: `com.electron.${'zj'}`,
        copyright: `Copyright © year zj`, //版权
        // 暴露资源
        extraResources: [
          { from: 'config.json', to: '.' },
          { from: 'server', to: './server' }
        ],
        win: {
          target: 'nsis',
        },
        nsis: {
          oneClick: false, // 辅助安装
          perMachine: true,
          allowToChangeInstallationDirectory: true, // 允许用户选择安装目录
        },
        linux: {
          target: 'AppImage',
        },
        publish: {
          provider: "github",
          owner: "zjw85583",
          repo: "electron_chat",
          releaseType: "release",
        }
      }
    }
  }
})
