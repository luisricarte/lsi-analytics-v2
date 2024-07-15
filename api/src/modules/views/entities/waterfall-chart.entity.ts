import { Entity, PropsConstructor } from 'src/core/domain/Entity';

export interface WaterfallChartProps {
  labelColumn: string;
  valueColumns: string[];
  viewId?: string | null;
}

export class WaterfallChart extends Entity<WaterfallChartProps> {
  constructor(props: PropsConstructor<WaterfallChartProps>) {
    super(props);
  }
}
