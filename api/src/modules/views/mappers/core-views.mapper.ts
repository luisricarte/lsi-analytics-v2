import {
  BarChart as PrismaBarChart,
  LineChart as PrismaLineChart,
  AreaChart as PrismaAreaChart,
  NumberView as PrismaNumberView,
  PieChart as PrismaPieChart,
  MapChart as PrismaMapChart,
  SelectFilter as PrismaSelectFilter,
  View as PrismaView,
  DonutChart as PrismaDonutChart,
  HorizontalBarChart as PrismaHorizontalBarChart,
  WaterfallChart as PrismaWaterfallChart,
  KPIChart as PrismaKPIChart,
} from '@prisma/client';
import { BarChart } from '../entities/bar-chart.entity';
import { LineChart } from '../entities/line-chart.entity';
import { AreaChart } from '../entities/area-chart.entity';
import { NumberView } from '../entities/number-view.entity';
import { PieChart } from '../entities/pie-chart.entity';
import { MapChart } from '../entities/map-chart.entity';
import { SelectFilter } from '../entities/select-filter';
import { DonutChart } from '../entities/donut-chart.entity';
import { WaterfallChart } from '../entities/waterfall-chart.entity';
import { KPIChart } from '../entities/kpi-chart.entity';
import { View } from '../entities/view.entity';
import { HorizontalBarChart } from './../entities/horizontal-bar-chart.entity';
import { ItWasNotPossibleToCreateViewInstanceError } from '../../panels/errors/it-was-not-possible-to-create-view-instance.error';

export type FullRelationView = PrismaView & {
  pieChart?: PrismaPieChart | null;
  barChart?: PrismaBarChart | null;
  mapChart?: PrismaMapChart | null;
  lineChart?: PrismaLineChart | null;
  areaChart?: PrismaAreaChart | null;
  numberView?: PrismaNumberView | null;
  selectFilter?: PrismaSelectFilter | null;
  donutChart?: PrismaDonutChart | null;
  horizontalBarChart?: PrismaHorizontalBarChart | null;
  waterfallChart?: PrismaWaterfallChart | null;
  kpiChart?: PrismaKPIChart | null;
};

export class CoreViewsMapper {
  public static selectFilterToDomain(selectFilter: PrismaSelectFilter) {
    return new SelectFilter({
      id: selectFilter.id,
      labelColumn: selectFilter.labelColumn,
      filterViews: selectFilter.filterViews,
      viewId: selectFilter.viewId,
      createdAt: selectFilter.createdAt,
      updatedAt: selectFilter.updatedAt,
    });
  }

  public static toDomain(view: FullRelationView) {
    return new View({
      id: view.id,
      name: view.name,
      type: view.type,
      contentUpdate: view.contentUpdate,
      sql: view.sql,
      panelId: view.panelId,
      datafontId: view.datafontId,
      createdAt: view.createdAt,
      updatedAt: view.updatedAt,
      core: this.getDomainCore(view),
    });
  }

  public static toHttp(view: View) {
    return {
      id: view.id,
      name: view.props.name,
      type: view.props.type,
      contentUpdate: view.props.contentUpdate,
      sql: view.props.sql,
      panelId: view.props.panelId,
      datafontId: view.props.datafontId,
      createdAt: view.createdAt,
      updatedAt: view.updatedAt,
      core: this.getHttpCore(view),
    };
  }

  private static getHttpCore(view: View) {
    switch (view.props.type) {
      case 'PIECHART':
        const pieCore = view.props.core as PieChart;
        return {
          id: pieCore.id,
          labelColumn: pieCore.props.labelColumn,
          valueColumn: pieCore.props.valueColumn,
          viewId: pieCore.props.viewId,
          createdAt: pieCore.createdAt,
          updatedAt: pieCore.updatedAt,
        };
      case 'BARCHART':
        const barCore = view.props.core as BarChart;
        return {
          id: barCore.id,
          labelColumn: barCore.props.labelColumn,
          valueColumns: barCore.props.valueColumns,
          viewId: barCore.props.viewId,
          createdAt: barCore.createdAt,
          updatedAt: barCore.updatedAt,
        };
      case 'MAPCHART':
        const mapCore = view.props.core as MapChart;
        return {
          id: mapCore.id,
          labelColumn: mapCore.props.labelColumn,
          valueColumn: mapCore.props.valueColumn,
          associatedMap: mapCore.props.associatedMap,
          fileName: mapCore.props.fileName,
          fileContent: mapCore.props.fileContent,
          viewId: mapCore.props.viewId,
          maxValue: mapCore.props.maxValue,
          colors: mapCore.props.colors,
          label: mapCore.props.label,
          hoverDescription: mapCore.props.hoverDescription,
          createdAt: mapCore.createdAt,
          updatedAt: mapCore.updatedAt,
        };
      case 'LINECHART':
        const lineCore = view.props.core as LineChart;
        return {
          id: lineCore.id,
          labelColumn: lineCore.props.labelColumn,
          valueColumns: lineCore.props.valueColumns,
          viewId: lineCore.props.viewId,
          createdAt: lineCore.createdAt,
          updatedAt: lineCore.updatedAt,
        };
      case 'AREACHART':
        const areaCore = view.props.core as AreaChart;
        return {
          id: areaCore.id,
          labelColumn: areaCore.props.labelColumn,
          valueColumns: areaCore.props.valueColumns,
          viewId: areaCore.props.viewId,
          createdAt: areaCore.createdAt,
          updatedAt: areaCore.updatedAt,
        };
      case 'NUMBERVIEW':
        const numberViewCore = view.props.core as NumberView;
        return {
          id: numberViewCore.id,
          labelColumn: numberViewCore.props.labelColumn,
          subTitle: numberViewCore.props.subTitle,
          isPercentage: numberViewCore.props.isPercentage,
          numberOfDecimalPlaces: numberViewCore.props.numberOfDecimalPlaces,
          viewId: numberViewCore.props.viewId,
          createdAt: numberViewCore.createdAt,
          updatedAt: numberViewCore.updatedAt,
        };
      case 'SELECTFILTER':
        const selectFilterCore = view.props.core as SelectFilter;
        return {
          id: selectFilterCore.id,
          labelColumn: selectFilterCore.props.labelColumn,
          filterViews: selectFilterCore.props.filterViews,
          viewId: selectFilterCore.props.viewId,
          createdAt: selectFilterCore.createdAt,
          updatedAt: selectFilterCore.updatedAt,
        };
      case 'DONUTCHART':
        const donutCore = view.props.core as DonutChart;
        return {
          id: donutCore.id,
          labelColumn: donutCore.props.labelColumn,
          valueColumn: donutCore.props.valueColumn,
          viewId: donutCore.props.viewId,
          createdAt: donutCore.createdAt,
          updatedAt: donutCore.updatedAt,
        };
      case 'HORIZONTALBARCHART':
        const horizontalBarCore = view.props.core as HorizontalBarChart;
        return {
          id: horizontalBarCore.id,
          labelColumn: horizontalBarCore.props.labelColumn,
          valueColumns: horizontalBarCore.props.valueColumns,
          viewId: horizontalBarCore.props.viewId,
          createdAt: horizontalBarCore.createdAt,
          updatedAt: horizontalBarCore.updatedAt,
        };
      case 'WATERFALLCHART':
        const waterfallCore = view.props.core as WaterfallChart;
        return {
          id: waterfallCore.id,
          labelColumn: waterfallCore.props.labelColumn,
          valueColumns: waterfallCore.props.valueColumns,
          viewId: waterfallCore.props.viewId,
          createdAt: waterfallCore.createdAt,
          updatedAt: waterfallCore.updatedAt,
        };
      default:
        throw new ItWasNotPossibleToCreateViewInstanceError();
    }
  }

  private static getDomainCore(view: FullRelationView) {
    switch (view.type) {
      case 'PIECHART':
        if (!view.pieChart) {
          throw new ItWasNotPossibleToCreateViewInstanceError();
        }
        const pieCore = view.pieChart;
        return new PieChart({
          id: pieCore.id,
          labelColumn: pieCore.labelColumn,
          valueColumn: pieCore.valueColumn,
          viewId: pieCore.viewId,
          createdAt: pieCore.createdAt,
          updatedAt: pieCore.updatedAt,
        });
      case 'BARCHART':
        if (!view.barChart) {
          throw new ItWasNotPossibleToCreateViewInstanceError();
        }
        const barCore = view.barChart;
        return new BarChart({
          id: barCore.id,
          labelColumn: barCore.labelColumn,
          valueColumns: barCore.valueColumns,
          viewId: barCore.viewId,
          createdAt: barCore.createdAt,
          updatedAt: barCore.updatedAt,
        });
      case 'MAPCHART':
        if (!view.mapChart) {
          throw new ItWasNotPossibleToCreateViewInstanceError();
        }
        const mapCore = view.mapChart;
        return new MapChart({
          id: mapCore.id,
          labelColumn: mapCore.labelColumn,
          valueColumn: mapCore.valueColumn,
          associatedMap: mapCore.associatedMap,
          fileContent: mapCore.fileContent,
          fileName: mapCore.fileName,
          viewId: mapCore.viewId,
          createdAt: mapCore.createdAt,
          updatedAt: mapCore.updatedAt,
          maxValue: mapCore.maxValue,
          colors: mapCore.colors,
          label: mapCore.label,
          hoverDescription: mapCore.hoverDescription,
        });
      case 'LINECHART':
        if (!view.lineChart) {
          throw new ItWasNotPossibleToCreateViewInstanceError();
        }
        const lineCore = view.lineChart;
        return new LineChart({
          id: lineCore.id,
          labelColumn: lineCore.labelColumn,
          valueColumns: lineCore.valueColumns,
          viewId: lineCore.viewId,
          createdAt: lineCore.createdAt,
          updatedAt: lineCore.updatedAt,
        });
      case 'AREACHART':
        if (!view.areaChart) {
          throw new ItWasNotPossibleToCreateViewInstanceError();
        }
        const areaCore = view.areaChart;
        return new AreaChart({
          id: areaCore.id,
          labelColumn: areaCore.labelColumn,
          valueColumns: areaCore.valueColumns,
          viewId: areaCore.viewId,
          createdAt: areaCore.createdAt,
          updatedAt: areaCore.updatedAt,
        });
      case 'NUMBERVIEW':
        if (!view.numberView) {
          throw new ItWasNotPossibleToCreateViewInstanceError();
        }
        const numberViewCore = view.numberView;
        return new NumberView({
          id: numberViewCore.id,
          labelColumn: numberViewCore.labelColumn,
          subTitle: numberViewCore.subTitle,
          isPercentage: numberViewCore.isPercentage,
          numberOfDecimalPlaces: numberViewCore.numberOfDecimalPlaces,
          viewId: numberViewCore.viewId,
          createdAt: numberViewCore.createdAt,
          updatedAt: numberViewCore.updatedAt,
        });
      case 'SELECTFILTER': {
        if (!view.selectFilter) {
          throw new ItWasNotPossibleToCreateViewInstanceError();
        }
        const selectFilterCore = view.selectFilter;
        return this.selectFilterToDomain(selectFilterCore);
      }
      case 'DONUTCHART':
        if (!view.donutChart) {
          throw new ItWasNotPossibleToCreateViewInstanceError();
        }
        const donutCore = view.donutChart;
        return new DonutChart({
          id: donutCore.id,
          labelColumn: donutCore.labelColumn,
          valueColumn: donutCore.valueColumn,
          viewId: donutCore.viewId,
          createdAt: donutCore.createdAt,
          updatedAt: donutCore.updatedAt,
        });

      case 'HORIZONTALBARCHART':
        if (!view.horizontalBarChart) {
          throw new ItWasNotPossibleToCreateViewInstanceError();
        }
        const horizontalBarCore = view.horizontalBarChart;
        return new HorizontalBarChart({
          id: horizontalBarCore.id,
          labelColumn: horizontalBarCore.labelColumn,
          valueColumns: horizontalBarCore.valueColumns,
          viewId: horizontalBarCore.viewId,
          createdAt: horizontalBarCore.createdAt,
          updatedAt: horizontalBarCore.updatedAt,
        });

      case 'KPICHART':
        if (!view.kpiChart) {
          throw new ItWasNotPossibleToCreateViewInstanceError();
        }
        const kpiCore = view.kpiChart;
        return new KPIChart({
          id: kpiCore.id,
          labelColumn: kpiCore.labelColumn,
          valueColumns: kpiCore.valueColumns,
          viewId: kpiCore.viewId,
          createdAt: kpiCore.createdAt,
          updatedAt: kpiCore.updatedAt,
        });

      case 'WATERFALLCHART':
        if (!view.waterfallChart) {
          throw new ItWasNotPossibleToCreateViewInstanceError();
        }
        const waterfallCore = view.waterfallChart;
        return new WaterfallChart({
          id: waterfallCore.id,
          labelColumn: waterfallCore.labelColumn,
          valueColumns: waterfallCore.valueColumns,
          viewId: waterfallCore.viewId,
          createdAt: waterfallCore.createdAt,
          updatedAt: waterfallCore.updatedAt,
        });
      default:
        throw new ItWasNotPossibleToCreateViewInstanceError();
    }
  }
}
