import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import {
  CreateCsvFontProps,
  CreateDataFontProps,
  DataFontsRepository,
  DeleteDataFontProps,
  FindAllDataFontProps,
  FindDataFontProps,
} from '../abstract/datafonts.repository';
import { DataFont } from '../../entities/datafont.entity';
import { DataFontsMapper } from '../../mappers/datafonts.mapper';
import { Client } from 'pg';

@Injectable()
export class PrismaDataFontsRepository implements DataFontsRepository {
  constructor(private prisma: PrismaService) {}

  public async create(props: CreateDataFontProps): Promise<DataFont> {
    const dataFont = await this.prisma.dataFont.create({
      data: {
        ...props,
      },
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

  public async createCsvClientTable(
    props: CreateCsvFontProps,
  ): Promise<DataFont> {
    const { tableName, columnTypes, csvData } = props;
    const databaseUrl = process.env.CSV_DATABASE_URL;
    let newFont;

    if (!databaseUrl) {
      throw new Error('Não encontrada conexão com o banco no arquivo .env');
    }

    if (!csvData) {
      throw new Error('Não encontrado conteúdo no CSV');
    }

    if (!columnTypes) {
      throw new Error('Necessário especificar os tipos');
    }

    const client = new Client({
      connectionString: databaseUrl,
    });

    try {
      await client.connect();

      if (csvData && columnTypes) {
        const columns = Object.keys(csvData[0]);

        const createTableQuery = `
        CREATE TABLE ${tableName} (
          id SERIAL PRIMARY KEY,
          ${columns.map((column, i) => `${column} ${columnTypes[i]}`).join(',')}
        );
      `;

        await client.query(createTableQuery);

        for (const row of csvData) {
          const columnsString = columns.join(', ');
          const valuesString = columns
            .map((column) => `'${row[column]}'`)
            .join(', ');

          const insertQuery = `
          INSERT INTO ${tableName} (${columnsString})
          VALUES (${valuesString});
        `;

          await client.query(insertQuery);
        }

        newFont = await this.prisma.dataFont.create({
          data: {
            name: props.name,
            typeOfStorage: props.typeOfStorage,
            provider: props.provider,
            userId: props.userId,
            accessKey: databaseUrl,
            tableName,
          },
        });
      }
    } catch (err) {
      throw new Error(
        `Não foi possível conectar com a base de dados - ${err.message}`,
      );
    } finally {
      await client.end();
    }

    return DataFontsMapper.toDomain(newFont);
  }
}
