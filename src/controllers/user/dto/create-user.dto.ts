import { UserType } from '../../../types/user.type.js';
import { IsEmail, IsEnum, IsString, Length, IsOptional } from 'class-validator';

export default class CreateUserDto {
  @IsString({message: 'name is required'})
  @Length(1, 15, {message: 'Min length is 1, max is 15'})
  public name!: string;

  @IsEmail({}, {message: 'email must be valid address'})
  public email!: string;

  @IsOptional()
  @IsString({message: 'avatar must be string'})
  public avatar?: string;

  @IsEnum(UserType, { message: 'type must by обычный или pro' })
  public type!: UserType;

  @IsString({message: 'password is required'})
  @Length(6, 12, {message: 'Min length for password is 6, max is 12'})
  public password!: string;
}
