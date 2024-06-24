import { Entity, PropsConstructor } from 'src/core/domain/Entity';

export interface HorizontalBarChartProps {
  labelColumn: string;
  valueColumns: string[];
  viewId?: string | null;
}

export class HorizontalBarChart extends Entity<HorizontalBarChartProps> {
  constructor(props: PropsConstructor<HorizontalBarChartProps>) {
    super(props);
  }
}
