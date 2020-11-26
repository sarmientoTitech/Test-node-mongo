"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const resolvers = {
    Query: {
        hello: (parent, args, ctx) => {
            return 'Hello World!!';
        },
    },
};
exports.Query = resolvers.Query;
//# sourceMappingURL=Query.js.map