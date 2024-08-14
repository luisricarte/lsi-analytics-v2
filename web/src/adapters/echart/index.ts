import { EAreaChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/area-chart/contexts/PanelNewViewStudioAreaChartProvider';
import { EBarChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/bar-chart/contexts/PanelNewViewStudioBarChartProvider';
import { EDonutChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/donut-chart/contexts/PanelNewViewStudioDonutChartProvider';
import { EHorizontalBarChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/horizontal-bar-chart/contexts/PanelNewViewStudioHorizontalBarChartProvider';
import { ELineChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/line-chart/contexts/PanelNewViewStudioLineChartProvider';
import { EMapChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/map-chart/contexts/PanelNewViewStudioMapChartProvider';
import { EPieChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/pie-chart/contexts/PanelNewViewStudioPieChartProvider';
import { EWaterfallChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/waterfall-chart/contexts/PanelNewViewStudioWaterfallChartProvider';
import { SQLResult } from '@/services/models/datafont/types';
import { PANEL } from '@/services/models/panel/constants';
import {
  BarChartProps,
  DonutChartProps,
  GraphTypeCore,
  HorizontalBarChartProps,
  LineChartProps,
  PieChartProps,
  ViewType,
  AreaChartProps,
  WaterfallChartProps,
  MapChartProps,
} from '@/services/models/panel/types';

export class EchartAdapter {
  public static queryToData({
    queryResult,
    type,
    core,
  }: {
    queryResult: SQLResult;
    type: ViewType;
    core: GraphTypeCore & {
      [key: string]: unknown;
    };
  }) {
    switch (type) {
      case PANEL.VIEW.PIECHART: {
        const _core = core as PieChartProps & { [key: string]: unknown };
        return this.pieChartQueryToData(queryResult, _core);
      }
      case PANEL.VIEW.BARCHART: {
        const _core = core as BarChartProps & { [key: string]: unknown };
        return this.barChartQueryToData(queryResult, _core);
      }
      case PANEL.VIEW.LINECHART: {
        const _core = core as LineChartProps & { [key: string]: unknown };
        return this.lineChartQueryToData(queryResult, _core);
      }
      case PANEL.VIEW.DONUTCHART: {
        const _core = core as DonutChartProps & { [key: string]: unknown };
        return this.donutChartQueryToData(queryResult, _core);
      }
      case PANEL.VIEW.HORIZONTALBARCHART: {
        const _core = core as HorizontalBarChartProps & {
          [key: string]: unknown;
        };
        return this.horizontalBarChartQueryToData(queryResult, _core);
      }
      case PANEL.VIEW.MAPCHART: {
        const _core = core as MapChartProps & { [key: string]: unknown };
        return this.mapChartQueryToData(queryResult, _core);
      }
      case PANEL.VIEW.WATERFALLCHART: {
        const _core = core as WaterfallChartProps & { [key: string]: unknown };
        return this.waterfallChartQueryToData(queryResult, _core);
      }
      case PANEL.VIEW.AREACHART: {
        const _core = core as AreaChartProps & { [key: string]: unknown };
        return this.areaChartQueryToData(queryResult, _core);
      }
      default:
        return null;
    }
  }

  private static pieChartQueryToData(
    queryResult: SQLResult,
    core: PieChartProps & { [key: string]: unknown },
  ): EPieChartData[] {
    return queryResult.rows.map((r) => ({
      value: r[core.valueColumn],
      name: r[core.labelColumn],
    }));
  }

  private static barChartQueryToData(
    queryResult: SQLResult,
    core: BarChartProps & { [key: string]: unknown },
  ) {
    const finalData: EBarChartData = {
      xAxis: {
        data: [],
      },
      series: core.valueColumns.map(() => ({ data: [], type: 'bar' })),
    };

    queryResult.rows.forEach((r) => {
      finalData.xAxis.data.push(r[core.labelColumn]);
      core.valueColumns.forEach((v, index) => {
        finalData.series[index].data.push(r[v]);
      });
    });

    return finalData;
  }

  private static horizontalBarChartQueryToData(
    queryResult: SQLResult,
    core: HorizontalBarChartProps & { [key: string]: unknown },
  ) {
    const finalData: EHorizontalBarChartData = {
      yAxis: {
        data: [],
      },
      series: core.valueColumns.map(() => ({ data: [], type: 'bar' })),
    };

    queryResult.rows.forEach((r) => {
      finalData.yAxis.data.push(r[core.labelColumn]);
      core.valueColumns.forEach((v, index) => {
        finalData.series[index].data.push(r[v]);
      });
    });

    return finalData;
  }

  private static donutChartQueryToData(
    queryResult: SQLResult,
    core: DonutChartProps & { [key: string]: unknown },
  ): EDonutChartData[] {
    return queryResult.rows.map((r) => ({
      value: r[core.valueColumn],
      name: r[core.labelColumn],
    }));
  }

  private static lineChartQueryToData(
    queryResult: SQLResult,
    core: LineChartProps & { [key: string]: unknown },
  ) {
    const finalData: ELineChartData = {
      xAxis: {
        data: [],
      },
      series: core.valueColumns.map(() => ({ data: [], type: 'line' })),
    };

    queryResult.rows.forEach((r) => {
      finalData.xAxis.data.push(r[core.labelColumn]);
      core.valueColumns.forEach((v, index) => {
        finalData.series[index].data.push(r[v]);
      });
    });

    return finalData;
  }

  private static areaChartQueryToData(
    queryResult: SQLResult,
    core: AreaChartProps & { [key: string]: unknown },
  ) {
    const finalData: EAreaChartData = {
      xAxis: {
        data: [],
      },
      series: core.valueColumns.map(() => ({
        data: [],
        type: 'line',
        areaStyle: {},
      })),
    };

    queryResult.rows.forEach((r) => {
      finalData.xAxis.data.push(r[core.labelColumn]);
      core.valueColumns.forEach((v, index) => {
        finalData.series[index].data.push(r[v]);
      });
    });

    return finalData;
  }

  private static waterfallChartQueryToData(
    queryResult: SQLResult,
    core: WaterfallChartProps & { [key: string]: unknown },
  ) {
    const finalData: EWaterfallChartData = {
      xAxis: {
        data: [],
      },
      yAxis: {
        type: 'value',
      },
      series: core.valueColumns.map(() => ({
        stack: 'stack',
        type: 'bar',
        silent: true,
        itemStyle: {
          borderColor: 'transparent',
          color: 'white',
        },
        label: {
          show: true,
          position: 'top',
        },
        data: [],
      })),
    };

    queryResult.rows.forEach((r) => {
      finalData.xAxis.data.push(r[core.labelColumn]);
      core.valueColumns.forEach((v, index) => {
        finalData.series[index].data.push(r[v]);
      });
    });

    if (finalData.series.length > 0) {
      const income: number[] = [];
      const expenses: number[] = [];
      const stackData: number[] = [];

      finalData.series[0].data.map((value) =>
        +value > 0
          ? (income.push(+value), expenses.push(0))
          : (expenses.push(Math.abs(+value)), income.push(0)),
      );

      const incomeObj = {
        type: 'bar',
        stack: 'stack',
        itemStyle: {
          color: 'red',
        },
        data: income,
      };
      const expensesObj = {
        type: 'bar',
        stack: 'stack',
        itemStyle: {
          color: 'green',
        },
        data: expenses,
      };

      finalData.series.push(incomeObj);
      finalData.series.push(expensesObj);

      stackData.push(0);
      let total = 0;
      income.forEach((element, index) => {
        const soma = element - expenses[index];
        total += soma;
        stackData.push(total);
      });

      finalData.series[0].data = stackData;
    }
    return finalData;
  }

  private static mapChartQueryToData(
    queryResult: SQLResult,
    core: MapChartProps & { [key: string]: unknown },
  ): EMapChartData[] {
    const mappedData = queryResult.rows.map((r) => ({
      data: {
        value: r[core.valueColumn],
        name: r[core.labelColumn],
      },
    }));

    return mappedData.map((item) => ({
      ...item,
      mapType: core.associatedMap,
    }));
  }
}
