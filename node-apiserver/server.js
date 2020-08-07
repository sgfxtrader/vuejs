const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
// MongoDB variable
const MongoClient = require('mongodb').MongoClient
// use it for local testing only
// const dbURL = 'mongodb://localhost:27017/'
// use it for container only
const dbURL = process.env.MONGO_CONNSTR || 'mongodb://mongo:27017/'
const dbName = 'webappdb'
const dbCollectionName = 'accesslogs'
// setting up OktaJwtVerifier
const OktaJwtVerifier = require('@okta/jwt-verifier')
const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: process.env.OKTA_CLIENT_ID,
  issuer: process.env.OKTA_ISSUER
})

// create express app
let app = express()
const port = process.env.PORT || 8081
app.use(cors())
app.use(bodyParser.json())
var clientDB, clientCollection

// verify JWT token middleware
function authenticationRequired (req, res, next) {
  const authHeader = req.headers.authorization || ''
  const match = authHeader.match(/Bearer (.+)/)

  if (!match) {
    res.status(401)
    return next('Unauthorized')
  }

  const accessToken = match[1]
  const audience = 'api://default'
  return oktaJwtVerifier.verifyAccessToken(accessToken, audience)
    .then((jwt) => {
      req.jwt = jwt
      next()
    })
    .catch((err) => {
      res.status(401).send(err.message)
    })
}

app.post('/access-log', authenticationRequired, (request, response) => {
  clientCollection.insertOne(request.body, (error, result) => {
    if (error) {
      return response.status(500).send(error)
    }
    response.send(result.result)
  })
})

app.get('/access-logs', authenticationRequired, (request, response) => {
  clientCollection.find({}).toArray((error, result) => {
    if (error) {
      return response.status(500).send(error)
    }
    response.send(result)
  })
})

app.get('/access-logs/:id', authenticationRequired, (request, response) => {
  clientCollection.findOne({
    // eslint-disable-next-line no-undef
    '_id': new ObjectId(request.params.id)
  }, (error, result) => {
    if (error) {
      return response.status(500).send(error)
    }
    response.send(result)
  })
})

app.delete('/access-logs', authenticationRequired, (request, response) => {
  clientCollection.deleteMany({}, (error, result) => {
    if (error) {
      return response.status(500).send(error)
    }
    response.send(result)
  })
})

// launches the express app on :8081
app.listen(port, () => {
  console.log('listening to port localhost:' + port)
  // create db and collection
  MongoClient.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      throw error
    }
    clientDB = client.db(dbName)
    clientCollection = clientDB.collection(dbCollectionName)
    console.log('Connected to `' + dbName + '`!')
  })
})
