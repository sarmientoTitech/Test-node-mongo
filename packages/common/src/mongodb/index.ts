import mongodb from 'mongodb'

let mongoclient: mongodb.MongoClient

function getMongoURI() {
  let mongoURI =
    process.env.NODE_ENV === 'production'
      ? process.env.MONGO_URI!
      : 'mongodb://localhost'
  return mongoURI
}

async function mongoConnect() {
  try {
    const client = await mongodb.MongoClient.connect(getMongoURI(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('🚀 MongoDB: connected successfully!')
    mongoclient = client
    return
  } catch (error) {
    console.error('❌ error:', error)
    throw error
  }
}

function getMongoClient() {
  return mongoclient
}

export { mongoConnect, getMongoClient }
