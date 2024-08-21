import { IsArray, IsJSON, IsOptional, IsString } from 'class-validator';

export class CreateMapChartDto {
  @IsString()
  labelColumn: string;

  @IsArray()
  @IsString({ each: true })
  valueColumn: string;

  @IsOptional()
  @IsString()
  associatedMap: string;

  @IsOptional()
  @IsJSON()
  fileContent: Record<string, any>;

  @IsOptional()
  @IsString()
  fileName: string;
}
