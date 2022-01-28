/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

import { CtDayjs } from '@src/common/date/ct-dayjs';

export class CreateUserInput {
  name: string;
  age: number;
}

export abstract class IQuery {
  abstract getUsers(): Nullable<User>[] | Promise<Nullable<User>[]>;
}

export abstract class IMutation {
  abstract createUser(input: CreateUserInput): User | Promise<User>;
}

export class User {
  id: number;
  name: string;
  age: number;
  createdAt: CtDatetime;
  updatedAt: CtDatetime;
}

export type CtDate = CtDayjs;
export type CtDatetime = CtDayjs;
type Nullable<T> = T | null;
