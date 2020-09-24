"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENC_KEY = exports.AUTH_KEY = exports.SESS_NAME = exports.PORT = void 0;
exports.PORT = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : "5000");
exports.SESS_NAME = (_b = process.env.SESS_NAME) !== null && _b !== void 0 ? _b : "_sess_id";
exports.AUTH_KEY = (_c = process.env.AUTH_KEY) !== null && _c !== void 0 ? _c : "secret";
exports.ENC_KEY = (_d = process.env.ENC_KEY) !== null && _d !== void 0 ? _d : "enc";
//# sourceMappingURL=consts.js.map