import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import * as echarts from 'echarts';
import React, { useEffect, useState } from 'react';

import { EChart } from '@/lib/echarts-for-react';
import { EMapChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/map-chart/contexts/PanelNewViewStudioMapChartProvider';

interface MapChartViewProps {
  data: EMapChartData[];
  id: string;
}

export const MapChartView: React.FC<MapChartViewProps> = ({ data, id }) => {
  const configRegister = data[data.length - 1];
  const mapNumber = configRegister.mapType;
  const [option, setOption] = useState<unknown>({});

  useEffect(() => {
    setOption({
      tooltip: {
        trigger: 'item',
      },
      visualMap: {
        min: 0,
        max: configRegister.maxValue || 1,
        left: 'left',
        top: 'bottom',
        calculable: true,
        inRange: {
          color: configRegister.colors || [
            '#e0f3f8',
            '#abd9e9',
            '#74add1',
            '#4575b4',
            '#313695',
          ],
        },
        text: configRegister.label || ['Alto', 'Baixo'],
      },
      series: [
        {
          name: configRegister.hoverDescription || 'Campo',
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
    });
  }, []);

  const { isLoading } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [`geojs-${id}-${mapNumber}`],
    queryFn: () => {
      if (mapNumber) {
        return axios.get(`/map/geojs-${mapNumber}-mun.json`).then((res) => {
          echarts.registerMap(id, res.data);
        });
      }
      return echarts.registerMap(id, configRegister?.fileContent);
    },
  });

  return (
    <>
      {isLoading ? (
        <div>carregando...</div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <EChart
            style={{
              width: '120%',
              height: '100%',
            }}
            option={option}
          />
        </div>
      )}
    </>
  );
};
