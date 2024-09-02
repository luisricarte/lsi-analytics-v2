import { EAreaChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/area-chart/contexts/PanelNewViewStudioAreaChartProvider';
import { EBarChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/bar-chart/contexts/PanelNewViewStudioBarChartProvider';
import { EDonutChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/donut-chart/contexts/PanelNewViewStudioDonutChartProvider';
import { EHorizontalBarChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/horizontal-bar-chart/contexts/PanelNewViewStudioHorizontalBarChartProvider';
import { EKPIChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/kpi-chart/contexts/PanelNewViewStudioKPIChartProvider';
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
  KPIChartProps,
} from '@/services/models/panel/types';
import { calcularValoresTotais, isConvertibleToFloat } from '@/utils';

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
        const _core = core as unknown as MapChartProps & {
          [key: string]: unknown;
        };
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
      case PANEL.VIEW.KPICHART: {
        const _core = core as KPIChartProps & { [key: string]: unknown };
        return this.kpiChartQueryToData(queryResult, _core);
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
        type: 'category',
      },
      series: [
        {
          data: [],
          type: 'bar',
          stack: 'Total',
          silent: true,
          emphasis: {
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent',
            },
          },
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent',
          },
        },
        {
          data: [],
          type: 'bar',
          stack: 'Total',
          silent: true,
          emphasis: {
            itemStyle: {
              borderColor: 'green',
              color: 'green',
            },
          },
          itemStyle: {
            borderColor: 'green',
            color: 'green',
          },
        },
        {
          data: [],
          type: 'bar',
          stack: 'Total',
          silent: true,
          emphasis: {
            itemStyle: {
              borderColor: 'red',
              color: 'red',
            },
          },
          itemStyle: {
            borderColor: 'red',
            color: 'red',
          },
        },
      ],
      yAxis: {
        type: 'value',
      },
    };

    queryResult.rows.forEach((r) => {
      finalData.xAxis.data.push(r[core.labelColumn]);
      core.valueColumns.forEach((v, index) => {
        finalData.series[index].data.push(r[v]);
      });
    });

    let total = 0;
    const positive: (string | number)[] = [];
    const negative: (string | number)[] = [];
    const dataTotal = finalData.series[0].data;
    dataTotal.forEach((element, i) => {
      const { isConvertible, parsedValue } = isConvertibleToFloat(element);

      if (isConvertible && parsedValue) {
        if (parsedValue >= 0) {
          positive.push(parsedValue);
          negative.push('-');
        } else {
          positive.push('-');
          negative.push(Math.abs(parsedValue));
        }
        total += parsedValue;

        finalData.series[0].data[i] = total;
      }
    });

    finalData.series[2].data = negative;
    finalData.series[1].data = positive;
    finalData.series[0].data = [
      0,
      ...calcularValoresTotais(positive, negative),
    ];
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

    const mapData = {
      data: { name: 'objeto de configuração', value: 0 },
      mapType: core.associatedMap,
      hoverDescription: core.hoverDescription,
      maxValue: core.maxValue,
      label: core.label,
      colors: core.colors,
      ...(core.fileContent && { fileContent: core.fileContent }),
      ...(core.fileName && { fileName: core.fileName }),
    };

    mappedData.push(mapData);

    return mappedData;
  }

  private static kpiChartQueryToData(
    queryResult: SQLResult,
    core: KPIChartProps & { [key: string]: unknown },
  ): EKPIChartData {
    const finalData: EKPIChartData = {
      xAxis: {
        data: [],
      },

      formattedGoal: core.formattedGoal,
      lastResult: core.lastResult,
      series: core.valueColumns.map(() => ({
        data: [],
        type: 'line',
        areaStyle: {
          color: core.color,
        },
        color: core.color,
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
}
