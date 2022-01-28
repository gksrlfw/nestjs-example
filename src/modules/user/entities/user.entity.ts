import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CtDayjs } from '@src/common/date/ct-dayjs';
import { CtDatetimeColumnTransformer } from '@src/common/typeorm/ct-datetime-column-transformer';
import { User } from '@src/core/autogen/schema.graphql';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '이름',
    type: 'varchar',
    length: '20',
  })
  name: string;

  @Column({
    comment: '나이',
    type: 'int',
    precision: 6,
  })
  age: number;

  @Column({
    comment: '생성일자',
    type: 'datetime',
    transformer: CtDatetimeColumnTransformer,
  })
  createdAt: CtDayjs;

  @Column({
    comment: '수정일자',
    type: 'datetime',
    transformer: CtDatetimeColumnTransformer,
  })
  updatedAt: CtDayjs;

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = CtDayjs.now();
    this.updatedAt = CtDayjs.now();
  }

  /**
   *
   */
  toUser(): User {
    return Object.assign(new User(), {
      id: this.id,
      name: this.name,
      age: this.age,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }
}
