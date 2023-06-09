import { inject, injectable } from 'inversify';
import { Service } from '../../types/service.js';
import { types } from '@typegoose/typegoose';
import { CityServiceInterface } from './city-service.interface';
import { CityEntity } from './city.entity';
import CreateCityDto from './dto/create-city.dto';
import { DocumentType } from '@typegoose/typegoose/lib/types.js';

@injectable()
export default class CityService implements CityServiceInterface {
  constructor(
    @inject(Service.CityModel) private readonly cityModel: types.ModelType<CityEntity>
  ) {}

  public find(): Promise<DocumentType<CityEntity>[] | null> {
    return this.cityModel.find();
  }

  public create(dto: CreateCityDto): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.create(dto);
  }

  public findByName(name: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({ name });
  }
}
