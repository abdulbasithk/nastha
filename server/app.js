require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const multer = require('multer')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const moment = require('moment')

const eventController = require('./Controllers/eventController')

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors())

const s3 = new aws.S3();

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY,
  region: 'ap-southeast-1'
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'photos-hrq-upload',
    key: (req, file, cb) => {
      cb(null, "upload/" + moment(new Date()) + file.originalname)
    }
  })
})


app.post('/upload', upload.single('image'), (req, res, next) => {
  res.status(201).json({fileName: req.file})
})
app.get('/event', eventController.findAll)
app.post('/event', eventController.create)
app.put('/event/:id', eventController.update)
app.delete('/event/:id', eventController.delete)

app.listen(process.env.PORT, () => console.log('Listening to port: ' + process.env.PORT))