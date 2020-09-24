"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get("/", (req, res) => {
    console.log(req.header(name));
    res.json({
        ips: req.ips,
    });
});
exports.default = router;
//# sourceMappingURL=home.js.map