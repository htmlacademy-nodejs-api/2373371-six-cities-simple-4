import { Conveniences, Coordinates, RentType } from '../../../types/rent-offer.type.js';
import { Cities } from '../../../types/city.type.js';

export default class UpdateOfferDto {
  name?: string;
  description?: string;
  date?: string;
  city?: Cities;
  preview?: string;
  images?: string[];
  isPremium?: boolean;
  rating?: number;
  type?: RentType;
  roomsNumber?: number;
  guestsNumber?: number;
  price?: number;
  conveniences?: Conveniences[];
  coordinates?: Coordinates;
}
