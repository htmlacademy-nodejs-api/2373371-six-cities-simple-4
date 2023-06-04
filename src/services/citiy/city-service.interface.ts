import CreateCityDto from './dto/create-city.dto.js';
import { DocumentType } from '@typegoose/typegoose/lib/types.js';
import { CityEntity } from './city.entity.js';

export interface CityServiceInterface {
  create(dto: CreateCityDto): Promise<DocumentType<CityEntity> | null>;
  findByName(name: string): Promise<DocumentType<CityEntity> | null>;
}
