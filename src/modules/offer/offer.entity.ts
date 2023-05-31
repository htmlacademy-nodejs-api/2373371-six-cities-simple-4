import typegoose, { defaultClasses, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose';
import { Coordinates, RentType } from '../../types/rent-offer.type.js';
import { Convenience } from '../../types/convenience.type.js';
import { UserEntity } from '../user/user.entity.js';

const { prop } = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public name!: string;

  @prop({trim: true, required: true })
  public description!: string;

  @prop({ required: true })
  public date!: string;

  @prop({ required: true })
  public preview!: string;

  @prop({ required: true })
  public images!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
    enum: RentType
  })
  public type!: RentType;

  @prop({ required: true })
  public roomsNumber!: number;

  @prop({ required: true })
  public guestsNumber!: number;

  @prop({ required: true })
  public price!: number;

  @prop({ required: true, default: [] })
  public conveniences!: Convenience[];

  @prop({ required: true, default: 0 })
  public commentsNumber!: number;

  @prop({
    required: true,
    set: ({ latitude, longitude }: Coordinates) => `${latitude};${longitude}`,
    get: (val) => {
      const [latitude, longitude] = val.split(';');
      return { latitude, longitude };
    }
  })
  public coordinates!: string;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
