import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/core/base/base.entity';
import { TABLE_NAME } from 'src/shared/enum/database';

import { Entity, Column, Index } from 'typeorm';

@Entity({ name: TABLE_NAME.USER })
export class User extends BaseEntity {
  @ApiProperty({ example: 'john' })
  @Column({ length: 250, nullable: false })
  name: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @Column({ length: 250, unique: true, nullable: false })
  @Index({ unique: true })
  email: string;

  @Exclude()
  @Column({ length: 250, nullable: false })
  password: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', required: false })
  @Column({ length: 250, nullable: true })
  avatar?: string;

  @Exclude()
  @Column({ default: false })
  verified: boolean;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  refresh_token?: string;
}
