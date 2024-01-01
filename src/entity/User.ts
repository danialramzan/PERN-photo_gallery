import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()             //          ||
  firstName: string;    //    [use ambiguous]
                        //          ||  
  @Column()             //          ||
  lastName: string;     //           

  @Column()
  username: string;

  @Column()
  password: string;


}