const express = require("express")
const multer = require("multer")
const server = express()
const multer = multer({ fileFilter })

server.post(buildUrl("/file/upload"), (req, res) => {
  res.send('ok')
})

const buildUrl = (url) => {
  return "/api" + url;
}

const fileFilter = (req, file, cb) => {
  console.log(file)
  cb(null, true)
}