import { Entity, PropsConstructor } from 'src/core/domain/Entity';
import { ViewContentUpdate, ViewType } from 'src/core/domain/types/common';
import { BarChart } from './bar-chart.entity';
import { LineChart } from './line-chart.entity';
import { NumberView } from './number-view.entity';
import { PieChart } from './pie-chart.entity';
import { SelectFilter } from './select-filter';
import { DonutChart } from './donut-chart.entity';
import { WaterfallChart } from './waterfall-chart.entity';
import { HorizontalBarChart } from './horizontal-bar-chart.entity';
import { KPIChart } from './kpi-chart.entity';
import { AreaChart } from './area-chart.entity';
import { MapChart } from './map-chart.entity';

export interface ViewProps {
  type: ViewType;
  contentUpdate: ViewContentUpdate;
  sql?: string | null;
  core?:
    | PieChart
    | AreaChart
    | BarChart
    | LineChart
    | MapChart
    | NumberView
    | SelectFilter
    | DonutChart
    | WaterfallChart
    | HorizontalBarChart
    | KPIChart
    | null;
  datafontId: string;
  panelId: string;
  name: string;
}

export class View extends Entity<ViewProps> {
  constructor(props: PropsConstructor<ViewProps>) {
    super(props);
  }
}
