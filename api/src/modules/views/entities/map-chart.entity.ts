import { AssociatedMap } from '@prisma/client';
import { Entity, PropsConstructor } from 'src/core/domain/Entity';

export interface MapChartProps {
  labelColumn: string;
  valueColumn: string;
  viewId?: string | null;
  associatedMap: AssociatedMap;
}

export class MapChart extends Entity<MapChartProps> {
  constructor(props: PropsConstructor<MapChartProps>) {
    super(props);
  }
}
