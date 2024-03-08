const { spawn } = require('child_process')
const path = require("path")
// 配置项
const EXECUTION_OPTIONS = {
  windowsHide: true, // 隐藏运行子进程(spawn启动的进程不会衍生shell)
  detached: true, // 让子进程独立于父进程运行
};
let ChildProcess
function startProcess() {
  const serverPath = path.join(__dirname, '../../', 'server', 'index.js')
  ChildProcess = spawn('node', [serverPath], EXECUTION_OPTIONS)
}
function exitProcess() {
  // 如果进程还在运行，则 exitCode === null
  if (ChildProcess.exitCode === null) {
    ChildProcess.kill()
  }
}
startProcess()
module.exports = { startProcess, exitProcess }