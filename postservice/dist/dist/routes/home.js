"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get("/", function (req, res) {
    console.log(req.header(name));
    res.json({
        ips: req.ips,
    });
});
exports.default = router;
//# sourceMappingURL=home.js.map