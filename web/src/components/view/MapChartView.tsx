import * as echarts from 'echarts';
import React, { useEffect, useState } from 'react';

import { EChart } from '@/lib/echarts-for-react';
import { EMapChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/map-chart/contexts/PanelNewViewStudioMapChartProvider';

interface MapChartViewProps {
  data: EMapChartData[];
}

export const MapChartView: React.FC<MapChartViewProps> = ({ data }) => {
  const [mapLoading, setMapLoading] = useState(true);
  const [option, setOption] = useState({});

  useEffect(() => {
    const values: number[] = [];
    data.map((value) => values.push(parseInt(value.data.value, 10)));
    const maxVV = Math.max(...values);

    const loadMapData = async () => {
      const reqMap = await fetch(
        `/map/geojs-${data[data.length - 1].mapType}-mun.json`,
      );

      const braJson = await reqMap.json();

      echarts.registerMap('Brazil', braJson);
      setOption({
        tooltip: {
          trigger: 'item',
        },
        visualMap: {
          min: 0, // editável
          max: maxVV || 1, // editável
          left: 'left',
          top: 'bottom',
          calculable: true,
          inRange: {
            color: ['#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'], // editável
          },
        },
        series: [
          {
            name: 'Data',
            type: 'map',
            map: 'Brazil',
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
      });
    };

    loadMapData();
    setMapLoading(false);
  }, []);

  return (
    <>
      {mapLoading ? (
        <div>carregando...</div>
      ) : (
        <EChart
          style={{
            width: '100%',
            height: '100%',
          }}
          option={option}
        />
      )}
    </>
  );
};
