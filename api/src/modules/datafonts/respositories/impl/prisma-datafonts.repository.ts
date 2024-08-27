import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import {
  CreateDataFontProps,
  DataFontsRepository,
  DeleteDataFontProps,
  FindAllDataFontProps,
  FindDataFontProps,
} from '../abstract/datafonts.repository';
import { DataFont } from '../../entities/datafont.entity';
import { DataFontsMapper } from '../../mappers/datafonts.mapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaDataFontsRepository implements DataFontsRepository {
  constructor(private prisma: PrismaService) {}

  public async create(props: CreateDataFontProps): Promise<DataFont> {
    const csvName = props.csvName;
    let processedCsvData = props.csvData;

    if (csvName != '' && processedCsvData && props.accessKey == '') {
      const rawCsvData = props?.csvData;
      if (typeof rawCsvData === 'string') {
        processedCsvData = JSON.parse(rawCsvData);
      }
    }

    const dataFont = await this.prisma.dataFont.create({
      data: { ...props, csvData: processedCsvData as Prisma.InputJsonValue },
    });

    return DataFontsMapper.toDomain(dataFont);
  }

  public async findAll({
    userId,
    filters,
  }: FindAllDataFontProps): Promise<DataFont[]> {
    const dataFonts = await this.prisma.dataFont.findMany({
      where: {
        userId,
        ...filters,
      },
    });

    return dataFonts.map(DataFontsMapper.toDomain);
  }

  public async delete(props: DeleteDataFontProps): Promise<void> {
    await this.prisma.dataFont.delete({
      where: {
        id: props.dataFontId,
        userId: props.userId,
      },
    });
  }

  public async find(props: FindDataFontProps): Promise<DataFont | null> {
    const dataFont = await this.prisma.dataFont.findFirst({
      where: {
        userId: props.userId,
        id: props.dataFontId,
      },
    });

    if (!dataFont) {
      return null;
    }

    return DataFontsMapper.toDomain(dataFont);
  }

  // public async handleCsvUpload(props: CreateDataFontProps): Promise<DataFont> {
  //   const { tableName, csvData } = props;
  //   let newFont;

  //   if (csvData) {
  //     const parsedData = JSON.parse(csvData);
  //     const columns = Object.keys(parsedData[0]);

  //     const createTableQuery = `
  //     CREATE TABLE ${tableName} (
  //       id SERIAL PRIMARY KEY,
  //       ${columns.map((column) => `${column} TEXT`).join(',')}
  //     );
  //   `;

  //     await this.prisma.$executeRawUnsafe(createTableQuery);

  //     for (const row of parsedData) {
  //       const columnsString = columns.join(', ');
  //       const valuesString = columns
  //         .map((column) => `'${row[column]}'`)
  //         .join(', ');

  //       const insertQuery = `
  //       INSERT INTO ${tableName} (${columnsString})
  //       VALUES (${valuesString});
  //     `;

  //       await this.prisma.$executeRawUnsafe(insertQuery);
  //     }

  //     newFont = await this.prisma.dataFont.create({
  //       data: {
  //         name: props.name,
  //         typeOfStorage: props.typeOfStorage,
  //         provider: props.provider,
  //         userId: props.userId,
  //         csvName: tableName,
  //       },
  //     });
  //   }

  //   return DataFontsMapper.toDomain(newFont);
  // }
}
