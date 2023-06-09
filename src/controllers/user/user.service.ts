import { DocumentType } from '@typegoose/typegoose/lib/types.js';
import CreateUserDto from './dto/create-user.dto.js';
import { UserServiceInterface } from './user-service.interface.js';
import { inject, injectable } from 'inversify';
import { Service } from '../../types/service.js';
import { LoggerInterface } from '../../services/logger/logger.interface.js';
import { UserEntity } from './user.entity.js';
import { types } from '@typegoose/typegoose';
import UpdateUserDto from './dto/update-user.dto.js';
import LoginUserDto from './dto/login-user.dto.js';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(Service.Logger) private readonly logger: LoggerInterface,
    @inject(Service.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ email });
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, dto, {new: true})
      .exec();
  }

  public async verifyUser(dto: LoginUserDto, salt: string): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findByEmail(dto.email);

    if (! user) {
      return null;
    }

    if (user.verifyPassword(dto.password, salt)) {
      return user;
    }

    return null;
  }
}
