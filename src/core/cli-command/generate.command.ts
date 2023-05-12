import { CliCommandInterface } from './cli-command.interface';
import { Command } from '../../constants/cli.js';
import { MockData } from '../../types/mock-data.type';
import got from 'got';
import { OfferGenerator } from '../../modules/offer-generator/offer-generator.js';
import TSVWriter from '../file-writer/tsv-writer.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = Command.Generate;
  private initialData: MockData | undefined;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, saveFilePath, dataURL] = parameters;

    const offersCount = Number.parseInt(count, 10);

    const mockData = await this.fetchData(dataURL);

    if (!mockData) {
      console.log(`No mock data was fetched from this url: ${dataURL}`);
      return;
    }

    this.initialData = mockData;

    const offerGenerator = new OfferGenerator(this.initialData);
    const tsvFileWriter = new TSVWriter(saveFilePath);

    for (let i = 0; i < offersCount; i++) {
      await tsvFileWriter.write(offerGenerator.generate());
    }

    console.log(`File ${saveFilePath} was created!`);
  }

  private async fetchData(url: string): Promise<MockData | null> {
    try {
      return await got.get(url).json();
    } catch (err) {
      console.log(`Can't fetch data from ${url}.`);
      return null;
    }
  }
}
