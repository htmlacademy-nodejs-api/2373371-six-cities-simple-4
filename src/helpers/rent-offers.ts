import { Cities } from '../types/city.type';
import { Conveniences, RentOffer, RentType } from '../types/rent-offer.type';

export function createRentOffer(offerData: string): RentOffer {
  const [
    name,
    description,
    date,
    city,
    preview,
    images,
    isPremium,
    rating,
    type,
    roomsNumber,
    guestsNumber,
    price,
    conveniences,
    userId,
    commentsNumber,
    coordinates,
  ] = offerData.split('\t');
  const parsedImages = parseGroup(images) ?? [];
  const parsedConveniences = parseGroup(conveniences) ?? [];
  const [latitude, longitude] = parseGroup(coordinates) ?? [];

  return {
    name,
    description,
    date,
    city: city as Cities,
    preview,
    images: parsedImages,
    isPremium: Boolean(isPremium),
    rating: Number(rating),
    type: type as RentType,
    roomsNumber: Number(roomsNumber),
    guestsNumber: Number(guestsNumber),
    price: Number(price),
    conveniences: parsedConveniences as Conveniences[],
    userId,
    commentsNumber: Number(commentsNumber),
    coordinates: {
      latitude: Number(latitude),
      longitude: Number(longitude),
    },
  };
}

export function parseGroup(group: string): string[] {
  return group.split(';');
}
