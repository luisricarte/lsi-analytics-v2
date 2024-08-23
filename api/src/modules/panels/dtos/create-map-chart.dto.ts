import {
  IsArray,
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsNumber()
  maxValue: number;

  @IsArray()
  @IsString({ each: true })
  colors: string[];

  @IsArray()
  @IsString({ each: true })
  label: string[];

  @IsString()
  hoverDescription: string;
}
