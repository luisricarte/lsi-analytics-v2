import * as echarts from 'echarts';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { Layout } from '@/components/layout';
import { NotFoundPage } from '@/components/not-found-page';
import { APP_ROUTES } from '@/constants/app-routes';
import { EChart } from '@/lib/echarts-for-react';
import { usePanelNewViewContext } from '@/pages/panel/panel-new-view/hooks/usePanelNewViewContext';
import { usePanelQuery } from '@/pages/panel/panel-new-view/hooks/usePanelQuery';

import { EditBar } from './components/EditBar';
import { usePanelNewViewStudioMapChartContext } from './hooks/usePanelNewViewStudioMapChartContext';

export const PanelViewStudioMapChartPage: React.FC = () => {
  const { id } = useParams();
  const [option, setOption] = useState({});
  const { canAccessStep, viewCreation } = usePanelNewViewContext();
  const { echartData } = usePanelNewViewStudioMapChartContext();

  const { data, error } = usePanelQuery({ id });
  const renderBreadbrumb = () => {
    if (data && id) {
      return (
        <Breadcrumb>
          <BreadcrumbHome />
          <BreadcrumbLink to={APP_ROUTES.panels.index}>Paineis</BreadcrumbLink>
          <BreadcrumbLink to={APP_ROUTES.panel.index.replace(':id', id)}>
            {data.name}
          </BreadcrumbLink>
          <BreadcrumbLink to={APP_ROUTES.panel.edit.replace(':id', id)}>
            Editar
          </BreadcrumbLink>
          <BreadcrumbNeutral>Nova visualização</BreadcrumbNeutral>
          <BreadcrumbNeutral>Estúdio</BreadcrumbNeutral>
        </Breadcrumb>
      );
    }
    return null;
  };

  const render = () => {
    if (data && canAccessStep(4, data.id)) {
      const getMap = async () => {
        try {
          const braJson = await fetch(
            `./public/map/geojs-${viewCreation.mapType}-mun.json`,
          ).then((res) => res.json());

          echarts.registerMap('Brazil', braJson);

          const optionSeries = {
            tooltip: {
              trigger: 'item',
            },
            visualMap: {
              left: 'right',
              min: 0, // ajustar!
              max: 1000, // ajustar!
              inRange: {
                color: ['#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'], // ajustar!
              },
              text: ['High', 'Low'], // ajustar!
              calculable: true,
            },
            series: [
              {
                type: 'map',
                map: 'Brazil',
                roam: true,
                emphasis: {
                  label: {
                    show: true,
                  },
                },
                data: echartData,
              },
            ],
          };

          setOption(optionSeries);
        } catch (e) {
          console.error('Failed to load map data', error);
        }
      };
      getMap();
      return (
        <EChart
          style={{
            height: 'calc(100vh - 3.5rem)',
          }}
          option={option}
        />
      );
    }

    if (error || !id) {
      <NotFoundPage />;
    }

    return null;
  };

  return (
    <Layout
      footer={null}
      title="Estúdio"
      breadcrumb={renderBreadbrumb()}
      rightBar={<EditBar />}
    >
      {render()}
    </Layout>
  );
};
