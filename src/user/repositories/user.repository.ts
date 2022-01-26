// import { EntityRepository, Repository } from 'typeorm';
// import { UserEntity } from '../entities/user.entity';
//
// @EntityRepository(UserEntity)
// export class UserRepository extends Repository<UserEntity> {
//   /**
//    *
//    * @param name
//    */
//   async findByName(name: string): Promise<UserEntity[]> {
//     return this.createQueryBuilder('user')
//       .where('name = :name', { name })
//       .getMany();
//   }
// }
