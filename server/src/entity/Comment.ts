import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Photo } from './Photo';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'id' })
  user: User;

  @ManyToOne(type => Photo)
  @JoinColumn({ name: 'photo_id' })
  photo: Photo;

  @Column()
  comment: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  comment_date: Date;
}
