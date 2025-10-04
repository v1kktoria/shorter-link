import { Link } from 'src/modules/link/entities/link.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'clicks' })
export class Click {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Link, (link) => link.clicks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'linkId' })
  link: Link;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @Column({ type: 'varchar', length: 45 })
  ip: string;

  @Column({ type: 'varchar', length: 128 })
  browser: string;

  @Column({ type: 'varchar', length: 128 })
  browserVersion: string;

  @Column({ type: 'varchar', length: 128 })
  os: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  country?: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  region?: string;
}
