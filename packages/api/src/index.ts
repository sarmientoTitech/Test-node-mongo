import fs from 'fs'
import cors from 'cors'
import express from 'express'
import { mongoConnect, getMongoClient } from '@pes/common'
import { ApolloServer, gql } from 'apollo-server-express'
import { resolvers } from './resolvers'
import { ObjectID } from 'mongodb'
const app = express()
const PORT = 4000

const typeDefs = gql`
  ${fs.readFileSync(__dirname + '/schema.graphql', { encoding: 'utf8' })}
`

const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers as any,
  context: async ({ req, res }) => {
    let db = getMongoClient().db('musicx_production')

    let ctx = { req, res }
    return ctx
  },
  playground: true,
  introspection: true,
})

server.applyMiddleware({ app })

const corsOptions: cors.CorsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:19006'],
  credentials: true,
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.status(200).send('working')
})

app.listen({ port: PORT }, async () => {
  console.log(`🚀 express app listening on port: ${PORT}`)
  console.log(
    `🚀 apollo app listening on at path: http://localhost:${PORT}${server.graphqlPath}`,
  )
  await mongoConnect()
})
