import { IsString } from 'class-validator';

export class CreateKPIChartDto {
  @IsString()
  labelColumn: string;

  @IsString()
  valueColumn: string;

  @IsString()
  formattedGoal: string;

  @IsString()
  color: string;
}
