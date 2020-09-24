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
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
const posts_1 = __importDefault(require("./routes/posts"));
const consts_1 = require("./consts");
const morgan_1 = __importDefault(require("morgan"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(process.env.DB_URI);
        const app = express_1.default();
        const connection = yield typeorm_1.createConnection();
        console.log(connection.name);
        app.set("trust proxy", true);
        app.use(cors_1.default());
        app.use(morgan_1.default(":method :url :status :res[content-length] - :response-time ms"));
        app.use(cookie_session_1.default({
            name: consts_1.SESS_NAME,
            keys: [consts_1.AUTH_KEY, consts_1.ENC_KEY],
            maxAge: 60 * 60 * 24 * 2,
            path: "/",
            httpOnly: true,
        }));
        app.use("/post", posts_1.default);
        app.listen(consts_1.PORT, () => {
            console.log(`Listening on ${consts_1.PORT}`);
        });
    }
    catch (e) {
        console.log(e);
    }
});
main().catch(console.error);
//# sourceMappingURL=server.js.map