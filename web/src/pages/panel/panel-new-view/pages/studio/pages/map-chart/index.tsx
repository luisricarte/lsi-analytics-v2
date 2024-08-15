import * as echarts from 'echarts';
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const getMap = async () => {
      try {
        const braJson = await fetch(
          `/map/geojs-${viewCreation.mapType}-mun.json`,
        ).then((res) => res.json());

        echarts.registerMap('Brazil', braJson);

        const optionSeries = {
          tooltip: {
            trigger: 'item',
          },
          visualMap: {
            left: 'right',
            min: 0, // ajustar!
            max: 1, // ajustar!
            inRange: {
              color: ['#313695'], // ajustar!
            },
            text: ['Campos com valor'], // ajustar!
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
              data: echartData.map((e) => ({
                value: e.data.value,
                name: e.data.name,
              })),
            },
          ],
        };

        setOption(optionSeries);
      } catch (e) {
        console.error('Failed to load map data', e);
      }
    };

    if (data && canAccessStep(4, data.id)) {
      getMap();
    }
  }, [data, canAccessStep, echartData, viewCreation.mapType]);

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

  if (error || !id) {
    return <NotFoundPage />;
  }

  return (
    <Layout
      footer={null}
      title="Estúdio"
      breadcrumb={renderBreadbrumb()}
      rightBar={<EditBar />}
    >
      <EChart
        style={{
          height: 'calc(100vh - 3.5rem)',
        }}
        option={option}
      />
    </Layout>
  );
};
