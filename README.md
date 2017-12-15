# Serverless Rekognition Example

![Celebrities](https://raw.githubusercontent.com/sean-hill/serverless-rekognition/master/celebrities.jpg)

This repository provides a code sample of how to accept an image via `POST`
request and process that image to see if any celebrities are contained within
it.

## Known Issues

The `multer` library does not seem to work with the `serverless-http` library.
When the express app is tested by itself by uncommenting the `app.listen` line
and running `node index.js` the image uploads work perfectly and Rekognition can
process the image as it should. However, when the express app is wrapped with
the `serverless-http` library, the image uploads are corrupted and are not
parsed as an image.

This was tested using `serverless-offline` as well as in AWS with Postman as
seen below.

![Postman](https://raw.githubusercontent.com/sean-hill/serverless-rekognition/master/postman.png)
