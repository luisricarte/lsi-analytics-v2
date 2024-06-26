import { IsArray, IsString } from 'class-validator';

export class CreateBarChartDto {
  @IsString()
  labelColumn: string;

  @IsArray()
  @IsString({ each: true })
  valueColumn: string[];
}
