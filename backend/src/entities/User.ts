import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import {
  IsAlphanumeric,
  MinLength,
  IsOptional,
  IsString,
} from "class-validator";
import * as bcrypt from "bcrypt";

@Entity()
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsAlphanumeric()
  @MinLength(6, {
    message: "Username deve ter pelo menos 6 caracteres alfanuméricos.",
  })
  username: string;

  @Column()
  @IsString()
  @MinLength(8, { message: "Senha deve ter pelo menos 8 caracteres." })
  password: string;

  @Column({ nullable: true })
  @IsOptional()
  @MinLength(2, {
    message: "Estado deve ter pelo menos 2 caracteres.",
  })
  state: string;

  @Column({ nullable: true })
  @IsOptional()
  @MinLength(3, {
    message: "Cidade deve ter pelo menos 3 caracteres.",
  })
  city: string;

  @Column({ nullable: true })
  @IsOptional()
  @MinLength(3, {
    message: "País deve ter pelo menos 3 caracteres.",
  })
  country: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
  searchHistories: any;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
