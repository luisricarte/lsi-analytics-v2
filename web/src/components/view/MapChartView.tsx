import * as echarts from 'echarts';
import React, { useEffect, useState } from 'react';

import { EChart } from '@/lib/echarts-for-react';
import { EMapChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/map-chart/contexts/PanelNewViewStudioMapChartProvider';

interface MapChartViewProps {
  data: EMapChartData[];
}

export const MapChartView: React.FC<MapChartViewProps> = ({ data }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [option, setOption] = useState({});
  useEffect(() => {
    const loadMapData = async () => {
      const braJson = await fetch(
        `/map/geojs-${data[0].mapType}-mun.json`,
      ).then((res) => res.json());

      echarts.registerMap('Brazil', braJson);

      setOption({
        tooltip: {
          trigger: 'item',
        },
        visualMap: {
          min: 0, // editável
          max: 1000, // editável
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

      setMapLoaded(true);
    };

    loadMapData();
  }, []);

  return (
    <>
      {mapLoaded && (
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
