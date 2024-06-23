import { IsString } from 'class-validator';

export class CreateDonutChartDto {
  @IsString()
  labelColumn: string;

  @IsString()
  valueColumn: string;
}
