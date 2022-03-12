import { Args, Mutation, Resolver, Context, Info } from '@nestjs/graphql';
import { AuthService } from '@src/modules/auth/auth.service';
import { JoinInput, LoginInput, User } from '@src/core/autogen/schema.graphql';
import { Logger } from '@nestjs/common';

@Resolver('auth')
export class AuthResolver {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly authService: AuthService) {}

  @Mutation('join')
  join(@Args('input') input: JoinInput): Promise<User> {
    this.logger.debug(`join(input: ${JSON.stringify(input)})`);
    return this.authService.join(
      input.id,
      input.password,
      input.name,
      input.age,
    );
  }

  @Mutation('login')
  login(@Args('input') input: LoginInput): Promise<User> {
    this.logger.debug(`login(input: ${JSON.stringify(input)})`);
    return this.authService.login(input.id, input.password);
  }
}
