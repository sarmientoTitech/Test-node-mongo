"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoClient = exports.mongoConnect = void 0;
const mongodb_1 = __importDefault(require("mongodb"));
let mongoclient;
function getMongoURI() {
    let mongoURI = process.env.NODE_ENV === 'production'
        ? process.env.MONGO_URI
        : 'mongodb+srv://sarmiento:aljilaas@cluster0.sqfsh.mongodb.net/test?retryWrites=true&w=majority';
    // : 'mongodb://localhost'
    return mongoURI;
}
async function mongoConnect() {
    try {
        const client = await mongodb_1.default.MongoClient.connect(getMongoURI(), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('🚀 MongoDB: connected successfully!');
        mongoclient = client;
        return;
    }
    catch (error) {
        console.error('❌ error:', error);
        throw error;
    }
}
exports.mongoConnect = mongoConnect;
function getMongoClient() {
    return mongoclient;
}
exports.getMongoClient = getMongoClient;
//# sourceMappingURL=index.js.map