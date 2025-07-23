import { MongoClient } from "mongodb"

const uri = process.env.MONGO_URI!
const options = {}

let client
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (!process.env.MONGO_URI) {
  throw new Error("Please define MONGO_URI in your .env")
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect().then((client) => {
      console.log("✅ MongoDB connected (dev)")
      return client
    })
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect().then((client) => {
    console.log("✅ MongoDB connected (prod)")
    return client
  })
}

export default clientPromise
