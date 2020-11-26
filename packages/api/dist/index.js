"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const common_1 = require("@pes/common");
const apollo_server_express_1 = require("apollo-server-express");
const resolvers_1 = require("./resolvers");
const app = express_1.default();
const PORT = 4000;
const typeDefs = apollo_server_express_1.gql `
  ${fs_1.default.readFileSync(__dirname + '/schema.graphql', { encoding: 'utf8' })}
`;
const server = new apollo_server_express_1.ApolloServer({
    typeDefs,
    resolvers: resolvers_1.resolvers,
    context: async ({ req, res }) => {
        let db = common_1.getMongoClient().db('musicx_production');
        let ctx = { req, res };
        return ctx;
    },
    playground: true,
    introspection: true,
});
server.applyMiddleware({ app });
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:19006'],
    credentials: true,
};
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.status(200).send('working');
});
app.listen({ port: PORT }, async () => {
    console.log(`🚀 express app listening on port: ${PORT}`);
    console.log(`🚀 apollo app listening on at path: http://localhost:${PORT}${server.graphqlPath}`);
    await common_1.mongoConnect();
});
//# sourceMappingURL=index.js.map