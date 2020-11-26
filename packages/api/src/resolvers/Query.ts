import { Resolvers } from '../generated/graphql'

const resolvers: Resolvers = {
  Query: {
    hello: (parent, args, ctx) => {
      return 'Hello World!!'
    },
  },
}
export const Query = resolvers.Query
