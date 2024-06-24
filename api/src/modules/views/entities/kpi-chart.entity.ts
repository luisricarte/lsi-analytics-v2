import { Entity, PropsConstructor } from 'src/core/domain/Entity';

export interface KPIChartProps {
  labelColumn: string;
  valueColumns: string[];
  viewId?: string | null;
}

export class KPIChart extends Entity<KPIChartProps> {
  constructor(props: PropsConstructor<KPIChartProps>) {
    super(props);
  }
}
