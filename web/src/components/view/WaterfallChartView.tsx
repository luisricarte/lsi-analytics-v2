import React from 'react';

import { EChart } from '@/lib/echarts-for-react';
import { EWaterfallChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/waterfall-chart/contexts/PanelNewViewStudioWaterfallChartProvider';

interface WaterfallChartViewProps {
  data: EWaterfallChartData;
}

export const WaterfallChartView: React.FC<WaterfallChartViewProps> = ({ data }) => (
  <EChart
    style={{
      width: '100%',
      height: '100%',
    }}
    option={{
      xAxis: {
        type: 'category',
        data: data.xAxis.data,
      },
      yAxis: {
        type: 'value',
      },
      series: data.series,
    }}
  />
);
