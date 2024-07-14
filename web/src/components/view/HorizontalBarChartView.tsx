import React from 'react';

import { EChart } from '@/lib/echarts-for-react';
import { EHorizontalBarChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/horizontal-bar-chart/contexts/PanelNewViewStudioHorizontalBarChartProvider';

interface HorizontalBarChartViewProps {
  data: EHorizontalBarChartData;
}

export const HorizontalBarChartView: React.FC<HorizontalBarChartViewProps> = ({ data }) => (
  <EChart
    style={{
      width: '100%',
      height: '100%',
    }}
    option={{
      yAxis: {
        type: 'category',
        data: data.yAxis.data,
      },
      xAxis: {
        type: 'value',
      },
      series: data.series,
    }}
  />
);
