import { JsonValue } from '@prisma/client/runtime/library';

import { Entity, PropsConstructor } from 'src/core/domain/Entity';

export interface MapChartProps {
  labelColumn: string;
  valueColumn: string;
  viewId?: string | null;
  associatedMap?: string | null;
  fileContent?: JsonValue | null;
  fileName?: string | null;
  maxValue: number;
  colors: string[];
  label: string[];
  hoverDescription: string;
}

export class MapChart extends Entity<MapChartProps> {
  constructor(props: PropsConstructor<MapChartProps>) {
    super(props);
  }
}
