import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '@src/modules/user/repositories/user.repository';
import { CreateUserInput, User } from '@src/core/autogen/schema.graphql';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly userRepository: UserRepository) {}

  /**
   *
   */
  async getUsers(): Promise<User[]> {
    return (await this.userRepository.getAllUsers()).map((user) =>
      user.toUser(),
    );
  }

  /**
   *
   * @param name
   * @param age
   */
  async create({ name, age }: CreateUserInput): Promise<User> {
    const instance = this.userRepository.create({
      name,
      age,
    });

    return (await this.userRepository.save(instance)).toUser();
  }
}
