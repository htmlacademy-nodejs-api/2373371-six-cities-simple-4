import { FileReaderInterface } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Conveniences, RentOffer, RentType } from '../../types/rent-offer.type.js';
import { Cities } from '../../types/city.type.js';
import { UserType } from '../../types/user.type.js';

export default class RentReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {
  }

  public read() {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public parseFile(): RentOffer[] {

    if (!this.rawData) {
      return [];
    }

    const lines: string[] = this.rawData.split('\n').filter((line) => line);

    return lines
      .map((line) => {
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
          author,
          commentsNumber,
          coordinates,
        ] = line.split('\t');
        const parsedImages = this.parseGroup(images) ?? [];
        const parsedConveniences = this.parseGroup(conveniences) ?? [];
        const [authorName, authorEmail, authorAvatar, authorPassword, authorType] = this.parseGroup(author) ?? [];
        const [latitude, longitude] = this.parseGroup(coordinates) ?? [];

        return {
          name,
          description,
          date,
          city: city as Cities,
          preview,
          images: parsedImages,
          isPremium: !this.isFiledEmpty(isPremium),
          rating: Number(rating),
          type: type as RentType,
          roomsNumber: Number(roomsNumber),
          guestsNumber: Number(guestsNumber),
          price: Number(price),
          conveniences: parsedConveniences as Conveniences[],
          author: {
            name: authorName,
            email: authorEmail,
            type: authorType as UserType,
            password: authorPassword,
            avatar: this.isFiledEmpty(authorAvatar) ? undefined : authorAvatar,
          },
          commentsNumber: Number(commentsNumber),
          coordinates: {
            latitude: Number(latitude),
            longitude: Number(longitude),
          },
        };
      });
  }

  private isFiledEmpty(field: string): boolean {
    return field === '-';
  }

  private parseGroup(group: string): string[] {
    return group.split(';');
  }
}
