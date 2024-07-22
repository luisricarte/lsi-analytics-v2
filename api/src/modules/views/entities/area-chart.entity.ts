import { Entity, PropsConstructor } from 'src/core/domain/Entity';

export interface AreaChartProps {
  labelColumn: string;
  valueColumns: string[];
  viewId?: string | null;
}

export class AreaChart extends Entity<AreaChartProps> {
  constructor(props: PropsConstructor<AreaChartProps>) {
    super(props);
  }
}
