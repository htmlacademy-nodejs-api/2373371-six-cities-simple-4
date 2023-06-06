import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { Coordinates } from '../../types/rent-offer.type.js';

const { prop, modelOptions } = typegoose;

export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'cities'
  }
})
export class CityEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public coordinates!: Coordinates;
}

export const CityModel = getModelForClass(CityEntity);
