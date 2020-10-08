import { SharedProp } from "../SharedProp";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

export enum Category {
  TEXT,
  MEDIA,
  URL,
}

@Entity({ name: "posts" })
export class Post extends SharedProp {
  @PrimaryGeneratedColumn("uuid")
  post_id!: string;

  @Column("varchar", { length: 400 })
  post_title!: string;

  @Column("varchar", { length: 1000 })
  post_data!: string;

  @Column("int")
  category!: Category;

  @Column("varchar")
  userid!: string;

  @ManyToOne(() => User, (user: User) => user.posts, { cascade: ["insert"] })
  @JoinColumn({ name: "userid" })
  creator!: User;
}

