import { ApolloError } from 'apollo-server-express';

/**
 *
 */
export enum CtErrorType {
  //
  InternalServerError = 'InternalServerError',

  //
  ResourceNotFound = 'ResourceNotFound',

  //
  PermissionDenied = 'PermissionDenied',

  // 처리도지 않은 오류
  UnhandledError = 'UnhandledError',
}

export class CtError extends ApolloError {
  constructor(code: CtErrorType, message?: string) {
    super(message || code, code);
  }
}
