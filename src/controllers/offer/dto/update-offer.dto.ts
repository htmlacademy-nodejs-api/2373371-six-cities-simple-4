import { Coordinates, RentType } from '../../../types/rent-offer.type.js';

export default class UpdateOfferDto {
  name?: string;
  description?: string;
  date?: string;
  cityId?: string;
  preview?: string;
  images?: string[];
  isPremium?: boolean;
  rating?: number;
  type?: RentType;
  roomsNumber?: number;
  guestsNumber?: number;
  price?: number;
  coordinates?: Coordinates;
}
