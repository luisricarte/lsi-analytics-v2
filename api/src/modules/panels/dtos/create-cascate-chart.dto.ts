import { IsArray, IsString } from 'class-validator';

export class CreateCascateChartDto {
  @IsString()
  labelColumn: string;

  @IsArray()
  @IsString({ each: true })
  valueColumn: string[];
}
