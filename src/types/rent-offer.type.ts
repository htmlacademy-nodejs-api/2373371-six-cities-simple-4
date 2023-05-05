import { Cities } from './city.type.js';
import { User } from './user.type.js';

export enum RentType {
  Apartment = 'apartment',
  House = 'house',
  Room = 'room',
  Hotel = 'hotel',
}

export type Conveniences =
  'Breakfast'
  | 'Air conditioning'
  | 'Laptop friendly workspace'
  | 'Baby seat'
  | 'Washer'
  | 'Towels'
  | 'Fridge';

export type Coordinates = {
  latitude: number;
  longitude: number;
}

export type RentOffer = {
  name: string;
  description: string;
  date: string;
  city: Cities;
  preview: string;
  images: string[];
  isPremium: boolean;
  rating: number;
  type: RentType;
  roomsNumber: number;
  guestsNumber: number;
  price: number;
  conveniences: Conveniences[];
  author: User;
  commentsNumber: number;
  coordinates: Coordinates;
}
