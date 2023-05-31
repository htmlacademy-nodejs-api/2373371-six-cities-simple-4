import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { MockData } from '../../types/mock-data.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { Conveniences, RentType } from '../../types/rent-offer.type.js';
import dayjs from 'dayjs';
import { CITY_TO_COORDINATES } from '../../constants/city.js';
import { Cities } from '../../types/city.type.js';

const CONSTRAINS = {
  minPrice: 200,
  maxPrice: 10000,

  minRooms: 1,
  maxRooms: 6,

  minGuests: 1,
  maxGuests: 10,

  minRating: 1,
  maxRating: 5,

  minComments: 1,
  maxComments: 10,
};

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  generate(): string {
    const name = getRandomItem<string>(this.mockData.names);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const date = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const preview = getRandomItem<string>(this.mockData.previews);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = Boolean(generateRandomValue(0, 1));
    const rating = generateRandomValue(CONSTRAINS.minRating, CONSTRAINS.maxRating);
    const type = getRandomItem<string>(Object.values(RentType));
    const roomsNumber = generateRandomValue(CONSTRAINS.minRooms, CONSTRAINS.maxRooms);
    const guestsNumber = generateRandomValue(CONSTRAINS.minGuests, CONSTRAINS.maxGuests);
    const price = generateRandomValue(CONSTRAINS.minPrice, CONSTRAINS.maxPrice).toString();
    const conveniencesList: Conveniences[] = ['Breakfast', 'Air conditioning', 'Fridge', 'Towels', 'Laptop friendly workspace', 'Baby seat', 'Washer'];
    const conveniences = getRandomItems(conveniencesList).join(';');
    const userId = getRandomItem(this.mockData.authors);
    const commentsNumber = generateRandomValue(CONSTRAINS.minComments, CONSTRAINS.maxComments);
    const coordinates = CITY_TO_COORDINATES[city as Cities].join(';');

    return [
      name, description, date, city, preview,
      images, isPremium, rating, type, roomsNumber,
      guestsNumber, price, conveniences, userId, commentsNumber,
      coordinates,
    ].join('\t');
  }
}
