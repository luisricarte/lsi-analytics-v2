import React from 'react';

import { EChart } from '@/lib/echarts-for-react';
import { EAreaChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/area-chart/contexts/PanelNewViewStudioAreaChartProvider';

interface AreaChartViewProps {
  data: EAreaChartData;
}

export const AreaChartView: React.FC<AreaChartViewProps> = ({ data }) => (
  <EChart
    style={{
      width: '100%',
      height: '100%',
    }}
    option={{
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.xAxis.data,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: data.series[0].data,
          type: 'line',
          areaStyle: {},
        },
      ],
    }}
  />
);
