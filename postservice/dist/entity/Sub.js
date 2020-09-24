"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sub = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Sub = class Sub {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid")
], Sub.prototype, "sub_id", void 0);
__decorate([
    typeorm_1.Column("varchar", { unique: true })
], Sub.prototype, "sub", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.uid, { cascade: ["insert"] }),
    typeorm_1.JoinColumn()
], Sub.prototype, "creator", void 0);
Sub = __decorate([
    typeorm_1.Entity()
], Sub);
exports.Sub = Sub;
//# sourceMappingURL=Sub.js.map