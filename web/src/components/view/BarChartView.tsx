import React from 'react';

import { EChart } from '@/lib/echarts-for-react';
import { EBarChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/bar-chart/contexts/PanelNewViewStudioBarChartProvider';

interface BarChartViewProps {
  data: EBarChartData;
}

export const BarChartView: React.FC<BarChartViewProps> = ({ data }) => (
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
