import CreateCityDto from './dto/create-city.dto';
import { DocumentType } from '@typegoose/typegoose/lib/types.js';
import { CityEntity } from './city.entity';

export interface CityServiceInterface {
  find(): Promise<DocumentType<CityEntity>[] | null>
  create(dto: CreateCityDto): Promise<DocumentType<CityEntity> | null>;
  findByName(name: string): Promise<DocumentType<CityEntity> | null>;
}
