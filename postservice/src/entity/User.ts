import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SharedProp } from "../SharedProp";
import { Sub } from "./Sub";

@Entity({ name: "users" })
export class User extends SharedProp {
  @OneToMany(() => Sub, (sub: Sub) => sub.creator)
  @PrimaryGeneratedColumn("uuid")
  uid!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  username!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 64 })
  password!: string;
}
