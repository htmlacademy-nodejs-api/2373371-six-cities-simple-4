import { IsMongoId, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export default class CreateCommentDto {
  @IsString({ message: 'text is required' })
  @Length(5, 1024, {message: 'Min length is 5, max is 1024'})
  public text!: string;

  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(1)
  @Max(5)
  public rating!: number;

  @IsMongoId({ message: 'offerId field must be a valid id' })
  public offerId!: string;

  @IsMongoId({ message: 'offerId field must be a valid id' })
  public userId!: string;
}
