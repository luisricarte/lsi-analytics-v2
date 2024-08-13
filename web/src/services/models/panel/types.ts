import { Layout } from 'react-grid-layout';

import { Breakpoints } from '@/pages/panel/contexts/PanelEditProvider';

import { BaseModel } from '../types';

export type PanelModel = BaseModel & {
  name: string;
  description?: string | null;
  layout?: Record<Breakpoints, Layout[]> | null;
  imageURL?: string;
};

export type PanelProps = {
  name: string;
  description?: string | null;
  layout?: Record<Breakpoints, Layout[]> | null;
  imageURL?: string;
};

export type ViewType =
  | 'PIECHART'
  | 'BARCHART'
  | 'LINECHART'
  | 'AREACHART'
  | 'DONUTCHART'
  | 'HORIZONTALBARCHART'
  | 'WATERFALLCHART'
  | 'KPICHART'
  | 'MAPCHART'
  | 'NUMBERVIEW'
  | 'SELECTFILTER';

export type ContentUpdate = 'DYNAMIC' | 'STATIC';

export type BarChart = {
  id: string;
  labelColumn: string;
  valueColumns: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type PieChart = {
  id: string;
  labelColumn: string;
  valueColumn: string;
  createdAt: Date;
  updatedAt: Date;
};

export type DonutChart = {
  id: string;
  labelColumn: string;
  valueColumn: string;
  createdAt: Date;
  updatedAt: Date;
};

export type HorizontalBarChart = {
  id: string;
  labelColumn: string;
  valueColumns: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type WaterfallChart = {
  id: string;
  labelColumn: string;
  valueColumns: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type KPIChart = {
  id: string;
  labelColumn: string;
  valueColumns: string[];
  createdAt: Date;
  updatedAt: Date;
};

export enum AssociatedMap {
  BRASIL,
  ESTADOS_UNIDOS,
  PARAIBA,
}

export type MapChart = {
  id: string;
  labelColumn: string;
  valueColumns: string;
  associatedMap: AssociatedMap;
  createdAt: Date;
  updatedAt: Date;
};

export type LineChart = {
  id: string;
  labelColumn: string;
  valueColumns: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type AreaChart = {
  id: string;
  labelColumn: string;
  valueColumns: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type NumberView = {
  id: string;
  labelColumn: string;
  subTitle?: string | null;
  isPercentage: boolean;
  numberOfDecimalPlaces?: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type SelectFilter = {
  id: string;
  labelColumn: string;
  filterViews: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type SelectFilterProps = {
  labelColumn: string;
  filterViews: string[];
};

export type NumberViewProps = {
  labelColumn: string;
  subTitle?: string | null;
  isPercentage: boolean;
  numberOfDecimalPlaces?: number | null;
};

export type LineChartProps = {
  labelColumn: string;
  valueColumns: string[];
};

export type AreaChartProps = {
  labelColumn: string;
  valueColumns: string[];
};

export type MapChartProps = {
  labelColumn: string;
  valueColumn: string;
  // associatedMap: AssociatedMap;
};

export type PieChartProps = {
  labelColumn: string;
  valueColumn: string;
};

export type DonutChartProps = {
  labelColumn: string;
  valueColumn: string;
};

export type HorizontalBarChartProps = {
  labelColumn: string;
  valueColumns: string[];
};

export type WaterfallChartProps = {
  labelColumn: string;
  valueColumns: string[];
};

export type KPIChartProps = {
  labelColumn: string;
  valueColumns: string[];
};

export type BarChartProps = {
  labelColumn: string;
  valueColumns: string[];
};

export type CoreType =
  | PieChart
  | BarChart
  | LineChart
  | AreaChart
  | NumberView
  | SelectFilter
  | HorizontalBarChart
  | DonutChart
  | KPIChart
  | WaterfallChart;

export type GraphTypeCore =
  | PieChart
  | BarChart
  | LineChart
  | AreaChart
  | WaterfallChart
  | DonutChart
  | MapChart
  | HorizontalBarChart
  | KPIChart;

export type ViewModel = {
  id: string;
  name: string;
  type: ViewType;
  mapType: string;
  contentUpdate: ContentUpdate;
  datafontId: string;
  sql: string;
  panelId: string;
  core: CoreType;
  createdAt: Date;
  updatedAt: Date;
};

export type ViewProps = Omit<ViewModel, 'createdAt' | 'updatedAt' | 'core'> & {
  core:
    | PieChartProps
    | BarChartProps
    | LineChartProps
    | AreaChartProps
    | NumberViewProps
    | MapChartProps
    | HorizontalBarChartProps
    | WaterfallChartProps
    | DonutChartProps
    | KPIChartProps;
};
