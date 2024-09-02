import React from 'react';

import { EChart } from '@/lib/echarts-for-react';
import { EKPIChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/kpi-chart/contexts/PanelNewViewStudioKPIChartProvider';

interface KPIChartViewProps {
  data: EKPIChartData;
}

export const KPIChartView: React.FC<KPIChartViewProps> = ({ data }) => {
  console.log('data from kpi', data);
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
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
              color: data.series[0].color,
              areaStyle: {
                color: data.series[0].color,
              },
            },
          ],
        }}
      />
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: data.series[0].color === '#00ff00' ? '#65c333' : '#c33333',
            fontSize: '3.25rem',
          }}
        >
          {data.lastResult}
        </span>
        <span
          style={{
            color: '#0c0000',
            fontSize: '1.11rem',
          }}
        >
          {data.formattedGoal}
        </span>
      </div>
    </div>
  );
};
