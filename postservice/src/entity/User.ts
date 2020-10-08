import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SharedProp } from "../SharedProp";
import { Post } from "./Post";

@Entity({ name: "users" })
export class User extends SharedProp {
  @PrimaryGeneratedColumn("uuid")
  uid!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  username!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 64 })
  password!: string;

  @OneToMany(() => Post, (post: Post) => post.creator)
  posts!: Post[];
}
