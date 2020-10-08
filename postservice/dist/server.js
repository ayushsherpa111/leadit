"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ioredis_1 = __importDefault(require("ioredis"));
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield typeorm_1.createConnection(config_1.DB_OPTION);
        console.log(connection.isConnected);
        const redisClient = new ioredis_1.default(config_1.REDIS_SETTING);
        const app = app_1.default(redisClient);
        app.listen(config_1.PORT, () => {
            console.log(`Listening on ${config_1.PORT}`);
        });
    }
    catch (e) {
        console.log(e);
    }
});
main().catch(console.error);
//# sourceMappingURL=server.js.map