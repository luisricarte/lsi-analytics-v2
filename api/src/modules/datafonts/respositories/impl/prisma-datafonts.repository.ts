import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import {
  CreateDataFontProps,
  DataFontsRepository,
} from '../abstract/datafonts.repository';
import { DataFont } from '../../entities/datafont.entity';
import { DataFontsMapper } from '../../mappers/datafonts.mapper';

@Injectable()
export class PrismaDataFontsRepository implements DataFontsRepository {
  constructor(private prisma: PrismaService) {}

  public async create(props: CreateDataFontProps): Promise<DataFont> {
    const dataFont = await this.prisma.dataFont.create({
      data: { ...props.data, userId: props.userId },
    });

    return DataFontsMapper.toDomain(dataFont);
  }

  public async findAll(userId: string): Promise<DataFont[]> {
    const dataFonts = await this.prisma.dataFont.findMany({
      where: {
        userId,
      },
    });

    return dataFonts.map(DataFontsMapper.toDomain);
  }
}
