import { Entity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export abstract class SharedProp {
  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
