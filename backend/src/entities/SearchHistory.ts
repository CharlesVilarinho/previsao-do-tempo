import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity("search_history")
export class SearchHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column("float")
  temperature: number;

  @Column("float")
  humidity: number;

  @Column()
  description: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => User, (user) => user.searchHistories)
  user: User;
}
