import { IsArray, IsString } from 'class-validator';

export class CreateWaterfallChartDto {
  @IsString()
  labelColumn: string;

  @IsArray()
  @IsString({ each: true })
  valueColumn: string[];
}
