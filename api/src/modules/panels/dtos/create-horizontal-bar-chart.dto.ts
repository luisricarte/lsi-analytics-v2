import { IsArray, IsString } from 'class-validator';

export class CreateHorizontalBarChartDto {
  @IsString()
  labelColumn: string;

  @IsArray()
  @IsString({ each: true })
  valueColumn: string[];
}
