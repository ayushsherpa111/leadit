"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Sub_1 = require("src/entities/Sub");
const typeorm_1 = require("typeorm");
const router = express_1.Router();
const connection = typeorm_1.getConnection();
router.get("/", (req, res) => {
    console.log(req.session);
    console.log(req.cookies);
    connection
        .getRepository(Sub_1.Sub)
        .find({ select: ["sub", "creator"] })
        .then((value) => {
        res.json({
            value,
        });
    });
});
router.post("/", (req, res) => {
    res.send(req.body);
});
exports.default = router;
//# sourceMappingURL=posts.js.map