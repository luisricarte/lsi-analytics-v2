import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Layout as GridLayout } from 'react-grid-layout';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { Layout } from '@/components/layout';
import { NotFoundPage } from '@/components/not-found-page';
import { Button } from '@/components/ui/button';
import { View } from '@/components/view';
import { APP_ROUTES } from '@/constants/app-routes';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { ResponsiveGridLayout } from '@/lib/echarts-for-react';
import { panelsService } from '@/services/panels';
import { getViewData, objectsAreEqual } from '@/utils';

import { BREAKPOINTS, Breakpoints } from '../contexts/PanelEditProvider';
import { useSavePanelMutation } from '../hooks/mutations/useSavePanelMutation';
import { usePanelEditContext } from '../hooks/usePanelEditContext';
import { PanelPageLoading } from '../panel-page/loading';
import { EditBar } from './components/EditBar';

export const PanelEditPage: React.FC = () => {
  const [responsive] = React.useState<Breakpoints>(BREAKPOINTS.LARGE);
  const [hasFilledLayoutWithResponse, setHasFilledLayoutWithResponse] =
    React.useState<boolean>(false);

  const {
    newViewsPreview,
    layouts,
    getCreateViews,
    setLayouts,
    name,
    setName,
    description,
    setDescription,
  } = usePanelEditContext();

  const { id } = useParams();

  const { mutate: savePanel, isPending: savePanelIsPending } =
    useSavePanelMutation();

  const navigate = useNavigate();

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: [reactQueryKeys.queries.findPanelChartViews, id],
    queryFn: () => {
      if (id) {
        return panelsService.findPanelChartViews({ path: { id } });
      }
      return null;
    },
  });

  React.useEffect(() => {
    if (data) {
      setName(data.panel.name);
      setDescription(data.panel.description);
    }
    if (isSuccess) {
      if (data && data.panel.layout && newViewsPreview.length === 0) {
        setLayouts(data.panel.layout);
      }
      setHasFilledLayoutWithResponse(true);
    }
  }, [
    isSuccess,
    data,
    setLayouts,
    newViewsPreview.length,
    setName,
    setDescription,
  ]);

  if (isLoading) {
    return <PanelPageLoading />;
  }

  if (error || !id) {
    return <NotFoundPage />;
  }

  const handleSavePanel = () => {
    if (data) {
      savePanel(
        {
          path: {
            id: data.panel.id,
          },
          body: {
            name,
            description,
            layout: layouts,
            createViews: getCreateViews(),
          },
        },
        {
          onSuccess: () => {
            toast('Painel salvo com sucesso', { type: 'success' });
            navigate(APP_ROUTES.panel.index.replace(':id', data.panel.id));
          },
        },
      );
    }
  };

  const saveIsDisabled = () => {
    if (newViewsPreview.length > 0) {
      return false;
    }

    if (data?.panel.layout) {
      if (!objectsAreEqual(data?.panel.layout, layouts)) {
        return false;
      }
    }

    if (data?.panel.name !== name) {
      return false;
    }

    if (data.panel.description !== description) {
      return false;
    }

    return true;
  };
  const handleLayoutChange = (layout: GridLayout[]) => {
    switch (responsive) {
      case BREAKPOINTS.LARGE:
        setLayouts((prevState) => ({
          ...prevState,
          LARGE: layout,
        }));
        break;
      case BREAKPOINTS.MEDIUM:
        setLayouts((prevState) => ({
          ...prevState,
          MEDIUM: layout,
        }));
        break;
      case BREAKPOINTS.SMALL:
        setLayouts((prevState) => ({
          ...prevState,
          SMALL: layout,
        }));
        break;
      default:
        break;
    }
  };

  const render = () => {
    if (data && hasFilledLayoutWithResponse) {
      return (
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          onLayoutChange={handleLayoutChange}
          breakpoints={{ LARGE: 1200, MEDIUM: 996, SMALL: 768 }}
          cols={{ LARGE: 12, MEDIUM: 10, SMALL: 6 }}
          rowHeight={30}
        >
          {newViewsPreview.map((v) => (
            <div key={v.view.id}>
              <View data={v.toViewData} type={v.view.type} name={v.view.name} />
            </div>
          ))}
          {data.views.map((v) => {
            const vData = getViewData(v);

            if (vData) {
              return (
                <div key={v.view.id}>
                  <View data={vData} type={v.view.type} name={v.view.name} />
                </div>
              );
            }

            return null;
          })}
        </ResponsiveGridLayout>
      );
    }

    return null;
  };

  if (data) {
    return (
      <Layout
        blockUIisloading={savePanelIsPending}
        title="Editar"
        footer={null}
        className="min-h-layout-page"
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbHome />
            <BreadcrumbLink to={APP_ROUTES.panels.index}>
              Paineis
            </BreadcrumbLink>
            <BreadcrumbLink to={APP_ROUTES.panel.index.replace(':id', id)}>
              {data.panel.name}
            </BreadcrumbLink>
            <BreadcrumbNeutral>Editar</BreadcrumbNeutral>
          </Breadcrumb>
        }
        rightBar={<EditBar data={data.panel} />}
        rightContent={
          <div className="flex items-center gap-2">
            <Button
              variant="positive"
              disabled={saveIsDisabled()}
              onClick={handleSavePanel}
            >
              Salvar
            </Button>
          </div>
        }
      >
        {render()}
      </Layout>
    );
  }

  return null;
};
