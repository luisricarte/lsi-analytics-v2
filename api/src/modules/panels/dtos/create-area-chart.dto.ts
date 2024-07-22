import { IsArray, IsString } from 'class-validator';

export class CreateAreaChartDto {
  @IsString()
  labelColumn: string;

  @IsArray()
  @IsString({ each: true })
  valueColumn: string[];
}
