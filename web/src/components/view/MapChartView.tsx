import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import * as echarts from 'echarts';
import React from 'react';

import { EChart } from '@/lib/echarts-for-react';
import { EMapChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/map-chart/contexts/PanelNewViewStudioMapChartProvider';

interface MapChartViewProps {
  data: EMapChartData[];
  id: string;
}

export const MapChartView: React.FC<MapChartViewProps> = ({ data, id }) => {
  const mapNumber = data[data.length - 1].mapType;
  const { isLoading } = useQuery({
    queryKey: [`geojs-${mapNumber}`],
    queryFn: () =>
      axios.get(`/map/geojs-${mapNumber}-mun.json`).then((res) => {
        echarts.registerMap(id, res.data);
      }),
  });

  const values: number[] = [];
  data.map((value) => values.push(parseInt(value.data.value, 10)));
  const maxValue = Math.max(...values);

  return (
    <>
      {isLoading ? (
        <div>carregando...</div>
      ) : (
        <EChart
          style={{
            width: '100%',
            height: '100%',
          }}
          option={{
            tooltip: {
              trigger: 'item',
            },
            visualMap: {
              min: 0,
              max: maxValue || 1,
              left: 'left',
              top: 'bottom',
              calculable: true,
              inRange: {
                color: ['#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
              },
            },
            series: [
              {
                name: 'Data',
                type: 'map',
                map: id,
                roam: true,
                label: {
                  show: false,
                },
                data: data.map((item) => ({
                  name: item.data.name,
                  value: item.data.value,
                })),
              },
            ],
          }}
        />
      )}
    </>
  );
};
