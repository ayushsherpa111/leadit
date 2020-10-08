"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const router = express_1.Router();
router.get("/", middleware_1.auth, (req, res) => {
    var _a;
    console.log(req.user);
    (_a = req.user) === null || _a === void 0 ? void 0 : _a.session().then((data) => {
        res.json(JSON.parse(data !== null && data !== void 0 ? data : "{}"));
    });
});
exports.default = router;
//# sourceMappingURL=posts.js.map