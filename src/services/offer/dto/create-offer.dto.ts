import { Conveniences, RentType } from '../../../types/rent-offer.type.js';

export default class CreateOfferDto {
  name!: string;
  description!: string;
  date!: string;
  cityId!: string;
  preview!: string;
  images!: string[];
  isPremium!: boolean;
  rating!: number;
  type!: RentType;
  roomsNumber!: number;
  guestsNumber!: number;
  price!: number;
  conveniences?: Conveniences[];
  userId!: string;
  commentsNumber?: number;
}
