import React from 'react';

import { EChart } from '@/lib/echarts-for-react';
import { EDonutChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/donut-chart/contexts/PanelNewViewStudioDonutChartProvider';

interface DonutChartViewProps {
  data: EDonutChartData[];
}

export const PieChartView: React.FC<DonutChartViewProps> = ({ data }) => (
  <EChart
    style={{
      width: '100%',
      height: '100%',
    }}
    option={{
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          data,
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
        },
      ],
    }}
  />
);
