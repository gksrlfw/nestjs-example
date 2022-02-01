/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

import { CtDayjs } from '@src/common/date/ct-dayjs';

export class CreatePostInput {
  userId: number;
  title: string;
  content: string;
}

export class UpdatePostInput {
  id: number;
  title: string;
  content: string;
}

export class CreateUserInput {
  name: string;
  age: number;
}

export abstract class IQuery {
  abstract getPosts(): Nullable<Post>[] | Promise<Nullable<Post>[]>;

  abstract getUsers(): Nullable<User>[] | Promise<Nullable<User>[]>;
}

export abstract class IMutation {
  abstract createPost(input: CreatePostInput): Post | Promise<Post>;

  abstract updatePost(input: UpdatePostInput): Post | Promise<Post>;

  abstract createUser(input: CreateUserInput): User | Promise<User>;
}

export class Post {
  id?: Nullable<number>;
  title?: Nullable<string>;
  content?: Nullable<string>;
  createdAt?: Nullable<CtDatetime>;
  updatedAt?: Nullable<CtDatetime>;
  userId?: Nullable<number>;
}

export class User {
  id?: Nullable<number>;
  name?: Nullable<string>;
  age?: Nullable<number>;
  createdAt?: Nullable<CtDatetime>;
  updatedAt?: Nullable<CtDatetime>;
  posts?: Nullable<Nullable<Post>[]>;
}

export type CtDate = CtDayjs;
export type CtDatetime = CtDayjs;
type Nullable<T> = T | null;
