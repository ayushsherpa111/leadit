import { SharedProp } from "../SharedProp";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Sub extends SharedProp {
  @PrimaryGeneratedColumn("uuid")
  sub_id!: string;

  @Column("varchar", { unique: true })
  sub!: string;

  @ManyToOne(() => User, (user: User) => user.uid, { cascade: ["insert"] })
  @JoinColumn()
  creator!: User;
}
