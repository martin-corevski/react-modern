const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })
const webpush = require('web-push')
// const fs = require('fs')
// const Busboy = require('busboy')
// const os = require('os')
// const path = require('path')
// const UUID = require('uuid-v4')

// Set your firebase db url, project id and storage url
const dbUrl = ''
const projectId = ''
const storageUrl = ''

// Set your generated vapid public and private keys
const vapidPublicKey = ''
const vapidPrivateKey = ''
const vapidDetailsEmail = ''

// Set your firebase db url and service account key inside the functions folder
const serviceAccount = require('./serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: dbUrl
})

// Google cloud storage config, keyFilename is the same one used for serviceAccount
const gcConfig = {
  projectId: projectId,
  keyFilename: 'serviceAccountKey.json'
}

const gcs = require('@google-cloud/storage')(gcConfig)

exports.storeData = functions.https.onRequest(function (request, response) {
  cors(request, response, function () {
    // File upload to the firebase storage is commented out
    // Creating public url for storage files
    // var uuid = UUID()

    // const busboy = new Busboy({ headers: request.headers })
    // These objects will store the values (file + fields) extracted from busboy
    // let upload
    // const fields = {}

    // This callback will be invoked for each file uploaded
    // busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    //   console.log(
    //     `File [${fieldname}] filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`
    //   )
    //   const filepath = path.join(os.tmpdir(), filename)
    //   upload = { file: filepath, type: mimetype }
    //   file.pipe(fs.createWriteStream(filepath))
    // })

    // This will be invoked on every field detected
    // busboy.on('field', function(
    //   fieldname,
    //   val,
    //   fieldnameTruncated,
    //   valTruncated,
    //   encoding,
    //   mimetype
    // ) {
    //   fields[fieldname] = val
    // })

    // This callback will be invoked after all uploaded files are saved.
    // busboy.on('finish', () => {
    //   // Permanently move the file in a bucket (on storage)
    //   var bucket = gcs.bucket(storageUrl)
    //   // As second argument we pass configuration for the file
    //   bucket.upload(
    //     upload.file,
    //     {
    //       uploadType: 'media',
    //       metadata: {
    //         metadata: {
    //           contentType: upload.type,
    //           firebaseStorageDownloadTokens: uuid
    //         }
    //       }
    //     },
    //     function(err, uploadedFile) {
    //       if (!err) {
    //         console.log('File uploaded to the storage')
    // admin
    //   .database()
    //   .ref('posts')
    //   .push({
    //     id: fields.id,
    //     title: fields.title,
    //     location: fields.location,
    //     rawLocation: {
    //       lat: fields.rawLocationLat,
    //       lng: fields.rawLocationLng
    //     },
    //     image:
    //       'https://firebasestorage.googleapis.com/v0/b/' +
    //       bucket.name +
    //       '/o/' +
    //       encodeURIComponent(uploadedFile.name) +
    //       '?alt=media&token=' +
    //       uuid
    //   })
    admin
      .database()
      .ref('nums')
      .push({
        id: request.body.id,
        num: request.body.num
      })
      .then(function () {
        // The first argument is an email address to identify yourself, set your
        // address, example 'mailto:my-email@address.com'
        webpush.setVapidDetails(
          vapidDetailsEmail,
          vapidPublicKey,
          vapidPrivateKey
        )
        // Get all subscriptions to push notifications from the database
        return admin
          .database()
          .ref('subscriptions')
          .once('value')
      })
      .then(function (subs) {
        // Each sub will contain the endpoint and keys
        subs.forEach(function (sub) {
          var pushConfig = {
            endpoint: sub.val().endpoint,
            keys: {
              auth: sub.val().keys.auth,
              p256dh: sub.val().keys.p256dh
            }
          }
          // var pushConfig = sub.val() is also going to work, the longer version
          // is written just to show how to extract the data.
          webpush
            .sendNotification(
              pushConfig,
              JSON.stringify({
                title: 'New number',
                content: 'New number added',
                openUrl: '/'
              })
            )
            .catch(function (err) {
              console.log('Push Notification error: ', err)
            })
        })
        response
          .status(201)
          .json({ message: 'Data stored', num: request.body.num })
      })
      .catch(function (err) {
        response.status(500).json({ error: 'Error!' + err })
      })
    // } else {
    //   console.log('File upload to the storage failed: ', err)
    // }
    // }
    //   )
    // })
    // The raw bytes of the upload will be in request.rawBody.  Send it to busboy, and get
    // a callback when it's finished.
    // busboy.end(request.rawBody)
  })
})
