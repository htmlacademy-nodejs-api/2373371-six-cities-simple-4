import { RentType } from '../../../types/rent-offer.type.js';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';

export default class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
    name?: string;

  @IsOptional()
  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
    description?: string;

  @IsOptional()
  @IsDateString({}, {message: 'postDate must be valid ISO date'})
    date?: string;

  @IsOptional()
  @IsMongoId({message: 'userId field must be valid an id'})
    cityId?: string;

  @IsOptional()
  @IsString()
    preview?: string;

  @IsOptional()
  @IsArray({message: 'Field categories must be an array'})
  @ArrayMinSize(6, {message: 'Min images length is 6'})
  @ArrayMaxSize(6, {message: 'Max images length is 6'})
    images?: string[];

  @IsOptional()
  @IsBoolean({ message: 'Must be of type boolean' })
    isPremium?: boolean;

  @IsOptional()
  @IsEnum(RentType, {message: 'type must be RentType'})
    type?: RentType;

  @IsOptional()
  @IsInt({message: 'roomsNumber must be an integer'})
  @Min(1, {message: 'Minimum roomsNumber is 1'})
  @Max(8, {message: 'Maximum roomsNumber is 8'})
    roomsNumber?: number;

  @IsOptional()
  @IsInt({message: 'guestsNumber must be an integer'})
  @Min(1, {message: 'Minimum guestsNumber is 1'})
  @Max(10, {message: 'Maximum guestsNumber is 10'})
    guestsNumber?: number;

  @IsOptional()
  @IsInt({message: 'price must be an integer'})
  @Min(100, {message: 'Minimum price is 100'})
  @Max(100000, {message: 'Maximum price is 100000'})
    price?: number;
}
