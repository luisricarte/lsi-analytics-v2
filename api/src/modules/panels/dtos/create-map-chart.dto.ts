import { AssociatedMap } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';

export class CreateMapChartDto {
  @IsString()
  labelColumn: string;

  @IsArray()
  @IsString({ each: true })
  valueColumn: string;

  @IsString()
  associatedMap: AssociatedMap;
}
