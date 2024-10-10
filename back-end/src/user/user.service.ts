import { v4 as uuidv4 } from 'uuid';
// import { ConfigurationService } from '../config/configuration.service';
import { Service } from 'typedi';
import { ConfigService } from '../config/config-service';

@Service()
export class UserService {
  constructor(
    // @InjectRepository(UserEntity)
    // private userRepository: Repository<UserEntity>,
    // private readonly configService: ConfigurationService,
    // @Inject(forwardRef(() => SessionService))
    // private readonly sessionService: SessionService,
    // private readonly emailService: EmailService,
    // private dataSourceService: DataSourceService
    private readonly configService: ConfigService
  ) {}




 async getUserByEmailAndPassword(email?: string, password?: string) {
    const userEmail = email || this.configService.user.userEmail;
    const userPassword = password || this.configService.user.userPassword;

    
    if (userEmail === this.configService.user.userEmail && userPassword === this.configService.user.userPassword) {
      return {
        id: '0',
        email: userEmail  as string,
      };

      

    } else {
      return null; 
    }
  }



  async getUserByEmail(email: string) {
    // Get the user ID from the environment variables
    const userEmail = process.env.USER_EMAIL;

    // Check if the provided ID matches the one in the .env file
    if (email === userEmail) {
      return {
        id: "0",
        email: userEmail,
        // password: process.env.USER_PASSWORD,
      };
    } else {
      return null; // User not found
    }
  }




// async getUserById1(id: string){
//   return await this.dataSourceService.dataSource.getRepository(UserEntity).findOne({
//     where: {
//       id: id,
//     },
//   });
// }



}














  // async getUserByEmailAndPassword(
  //   email?: string,
  //   password?: string,
  // ) {
  //   const findParameters: FindOneOptions<UserEntity> = {
  //     where: {
  //       email: email,
  //       password: password,
  //       isVerified: true,
  //     },
  //   };

  //   return await this.dataSourceService.dataSource.getRepository(UserEntity).findOne(findParameters);
  // }
















  // async getUserByEmail(email: string) {
  //   const findParameters: FindOneOptions<UserEntity> = {
  //     where: {
  //       email: email,
  //       isVerified: true,
  //     },
  //   };

  //   return await this.dataSourceService.dataSource.getRepository(UserEntity).findOne(findParameters);
  // }

  // async countUsers(): Promise<number> {
  //   const count = await this.dataSourceService.dataSource.getRepository(UserEntity).count();
  //   return count;
  // }

  // async getUserById(id: string){
  //   return await this.dataSourceService.dataSource.getRepository(UserEntity).findOne({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }

  // async getAllUsers(options: FindManyOptions<UserEntity>): Promise<{
  //   totalCount: number;
  //   data: UserEntity[];
  // }> {
  //   const [data, totalCount] = await this.dataSourceService.dataSource.getRepository(UserEntity).findAndCount(options);

  //   return {
  //     data: data,
  //     totalCount: totalCount,
  //   };
  // }

  // async getUser(options: FindOptionsWhere<UserEntity>) {
  //   return await this.dataSourceService.dataSource.getRepository(UserEntity).findOne({ where: options });
  // }

  // async getEncryptedPassword(password: string) {
  //   const passwordSalt = '$2b$10$sAiRCNbK2s/xSGFV2rQtdu';
  //   return await hash(password, passwordSalt);
  // }

