import { Entity, PropsConstructor } from 'src/core/domain/Entity';

export interface MapChartProps {
  labelColumn: string;
  valueColumn: string;
  viewId?: string | null;
}

export class MapChart extends Entity<MapChartProps> {
  constructor(props: PropsConstructor<MapChartProps>) {
    super(props);
  }
}
