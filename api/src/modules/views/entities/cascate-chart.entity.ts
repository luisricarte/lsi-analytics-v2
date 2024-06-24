import { Entity, PropsConstructor } from 'src/core/domain/Entity';

export interface CascateChartProps {
  labelColumn: string;
  valueColumns: string[];
  viewId?: string | null;
}

export class CascateChart extends Entity<CascateChartProps> {
  constructor(props: PropsConstructor<CascateChartProps>) {
    super(props);
  }
}
