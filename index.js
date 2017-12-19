const serverless = require('serverless-http')
const express = require('express')
const multer = require('multer')
const fs = require('fs')
const AWS = require('aws-sdk')
const app = express()
const storage = multer.memoryStorage()
const upload = multer({ storage })

/*
 *  Accepts an image and sends the image to Rekognition to detect any celebrities
 */
app.post('/lookup-celebrities', upload.single('image'), (req, res) => {
  const rekognition = new AWS.Rekognition()
  const image = req.file

  if (!image) {
    return res.status(400).json({ message: 'Please provide an image.' })
  }

  const params = {
    Image: {
      Bytes: image.buffer
    }
  }

  rekognition.recognizeCelebrities(params, (err, response) => {
    if (err) {
      return res.status(400).json({ message: err.message })
    }

    const celebrities = response.CelebrityFaces.map(celebrity => ({
      name: celebrity.Name
    }))

    res.status(200).json(celebrities)
  })
})

/*
 *  Uncomment to test locally without serverless-http, it works
 */
// app.listen(3000, () => console.log('Listening on port 3000'))

module.exports.handler = serverless(app, {
  binary: ['image/png', 'image/jpeg']
})
