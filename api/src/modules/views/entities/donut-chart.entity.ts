import { Entity, PropsConstructor } from 'src/core/domain/Entity';

export interface DonutChartProps {
  labelColumn: string;
  valueColumn: string;
  viewId?: string | null;
}

export class DonutChart extends Entity<DonutChartProps> {
  constructor(props: PropsConstructor<DonutChartProps>) {
    super(props);
  }
}
