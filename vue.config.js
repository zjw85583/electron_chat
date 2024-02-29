const { defineConfig } = require('@vue/cli-service')
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
      builderOptions: {
        productName: "聊天hh",
        appId: `com.electron.${'zj'}`,
        publish: ["github"],
        copyright: `Copyright © year zj`, //版权
        win: {
          target: 'nsis'
        },
        nsis: {
          oneClick: false, // 辅助安装
          perMachine: true,
          allowToChangeInstallationDirectory: true, // 允许用户选择安装目录
        },
        linux: {
          target: 'AppImage',
        }
      }
    }
  }
})
