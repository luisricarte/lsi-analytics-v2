import { Entity, PropsConstructor } from 'src/core/domain/Entity';

export interface KPIChartProps {
  labelColumn: string;
  valueColumns: string[];
  color: string;
  formattedGoal: string;
  viewId?: string | null;
  lastResult: number;
}

export class KPIChart extends Entity<KPIChartProps> {
  constructor(props: PropsConstructor<KPIChartProps>) {
    super(props);
  }
}
