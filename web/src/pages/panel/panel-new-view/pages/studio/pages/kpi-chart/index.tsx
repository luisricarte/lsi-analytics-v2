import React from 'react';
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
// import { formatMoney } from '@/utils';

// import { formatMoney } from '@/utils';

import { EditBar } from './components/EditBar';
import { usePanelNewViewStudioKPIChartContext } from './hooks/usePanelNewViewStudioKPIChartContext';

export const PanelViewStudioKPIChartPage: React.FC = () => {
  const { id } = useParams();

  const { canAccessStep } = usePanelNewViewContext();

  const { echartData, color, formattedGoal, /* isMoney, */ lastResult } =
    usePanelNewViewStudioKPIChartContext();

  const { data, error } = usePanelQuery({ id });
  const [option, setOption] = React.useState({});
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

  // React.useEffect(() => {
  //   if (isMoney) {
  //     if (typeof lastValue !== 'string') {
  //       setLastValue(formatMoney(parseFloat(lastValue.toString())));
  //     }
  //   }
  // }, [isMoney, lastValue, setLastValue]);

  React.useEffect(() => {
    if (lastResult && color && echartData) {
      let optionSeries = {
        xAxis: {
          type: 'category',
          data: echartData?.xAxis?.data || [],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: [] as any[],
            type: 'line',
            color,
            areaStyle: {
              color,
            },
          },
        ],
      };
      if (echartData.series[0].data.length > 0) {
        optionSeries = {
          xAxis: {
            type: 'category',
            data: echartData?.xAxis?.data,
          },
          yAxis: {
            type: 'value',
          },

          series: [
            {
              data: echartData.series[0].data,
              type: 'line',
              color,
              areaStyle: {
                color,
              },
            },
          ],
        };
      }
      if (data && canAccessStep(4, data.id)) {
        setOption(optionSeries);
      }
    }
  }, [color, lastResult, formattedGoal, echartData, data, canAccessStep]);

  if (error || !id) {
    <NotFoundPage />;
  }
  return (
    <Layout
      footer={null}
      title="Estúdio"
      breadcrumb={renderBreadbrumb()}
      rightBar={<EditBar />}
    >
      <div style={{ position: 'relative' }}>
        <EChart
          style={{
            height: 'calc(100vh - 3.5rem)',
          }}
          option={option}
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
              color: color === '#00ff00' ? '#65c333' : '#c33333',
              fontSize: '5.75rem',
            }}
          >
            {lastResult}
          </span>
          <span
            style={{
              color: '#0c0000',
              fontSize: '1.11rem',
            }}
          >
            {formattedGoal}
          </span>
        </div>
      </div>
    </Layout>
  );
};
