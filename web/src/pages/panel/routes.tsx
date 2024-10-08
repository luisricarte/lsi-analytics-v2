import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { PanelEditLayout } from './layout';
import { PanelEditPage } from './panel-edit-page';
import { PanelNewViewLayout } from './panel-new-view/layout';
import { PanelNewViewConfig } from './panel-new-view/pages/config';
import { PanelNewViewDataFont } from './panel-new-view/pages/datafont';
import { PanelNewViewObject } from './panel-new-view/pages/object';
import { PanelViewStudioAreaChartPage } from './panel-new-view/pages/studio/pages/area-chart';
import { PanelViewStudioAreaChartLayout } from './panel-new-view/pages/studio/pages/area-chart/layout';
import { PanelViewStudioBarChartPage } from './panel-new-view/pages/studio/pages/bar-chart';
import { PanelViewStudioBarChartLayout } from './panel-new-view/pages/studio/pages/bar-chart/layout';
import { PanelViewStudioDonutChartPage } from './panel-new-view/pages/studio/pages/donut-chart';
import { PanelViewStudioDonutChartLayout } from './panel-new-view/pages/studio/pages/donut-chart/layout';
import { PanelViewStudioHorizontalBarChartPage } from './panel-new-view/pages/studio/pages/horizontal-bar-chart';
import { PanelViewStudioHorizontalBarChartLayout } from './panel-new-view/pages/studio/pages/horizontal-bar-chart/layout';
import { PanelViewStudioKPIChartPage } from './panel-new-view/pages/studio/pages/kpi-chart';
import { PanelViewStudioKPIChartLayout } from './panel-new-view/pages/studio/pages/kpi-chart/layout';
import { PanelViewStudioLineChartPage } from './panel-new-view/pages/studio/pages/line-chart';
import { PanelViewStudioLineChartLayout } from './panel-new-view/pages/studio/pages/line-chart/layout';
import { PanelViewStudioMapChartPage } from './panel-new-view/pages/studio/pages/map-chart';
import { PanelViewStudioMapChartLayout } from './panel-new-view/pages/studio/pages/map-chart/layout';
import { PanelViewStudioNewViewPage } from './panel-new-view/pages/studio/pages/number-view';
import { PanelViewStudioNumberViewLayout } from './panel-new-view/pages/studio/pages/number-view/layout';
import { PanelViewStudioPieChartPage } from './panel-new-view/pages/studio/pages/pie-chart';
import { PanelViewStudioPieChartLayout } from './panel-new-view/pages/studio/pages/pie-chart/layout';
import { PanelViewStudioSelectFilterPage } from './panel-new-view/pages/studio/pages/select-filter';
import { PanelViewStudioWaterfallChartPage } from './panel-new-view/pages/studio/pages/waterfall-chart';
import { PanelViewStudioWaterfallChartLayout } from './panel-new-view/pages/studio/pages/waterfall-chart/layout';
import { PanelPage } from './panel-page';

export const PanelRoutes: React.FC = () => (
  <Routes>
    <Route path=":id" element={<PanelPage />} />
    <Route element={<PanelEditLayout />}>
      <Route path=":id/editar" element={<PanelEditPage />} />
      <Route element={<PanelNewViewLayout />}>
        <Route path=":id/novo/visualizacao" element={<PanelNewViewConfig />} />

        {/* Rota para as fontes de dados */}
        <Route
          path=":id/novo/visualizacao/fonte"
          element={<PanelNewViewDataFont />}
        />

        {/* Rota para acesso ao schema/sql */}
        <Route
          path=":id/novo/visualizacao/objeto"
          element={<PanelNewViewObject />}
        />
        {/* Rotas de visualizações! */}
        <Route element={<PanelViewStudioPieChartLayout />}>
          <Route
            path=":id/novo/visualizacao/studio/pie"
            element={<PanelViewStudioPieChartPage />}
          />
        </Route>
        <Route element={<PanelViewStudioBarChartLayout />}>
          <Route
            path=":id/novo/visualizacao/studio/bar"
            element={<PanelViewStudioBarChartPage />}
          />
        </Route>
        <Route element={<PanelViewStudioHorizontalBarChartLayout />}>
          <Route
            path=":id/novo/visualizacao/studio/horizontalBar"
            element={<PanelViewStudioHorizontalBarChartPage />}
          />
        </Route>
        <Route element={<PanelViewStudioLineChartLayout />}>
          <Route
            path=":id/novo/visualizacao/studio/line"
            element={<PanelViewStudioLineChartPage />}
          />
        </Route>
        <Route element={<PanelViewStudioAreaChartLayout />}>
          <Route
            path=":id/novo/visualizacao/studio/area"
            element={<PanelViewStudioAreaChartPage />}
          />
        </Route>
        <Route element={<PanelViewStudioDonutChartLayout />}>
          <Route
            path=":id/novo/visualizacao/studio/donut"
            element={<PanelViewStudioDonutChartPage />}
          />
        </Route>
        <Route element={<PanelViewStudioKPIChartLayout />}>
          <Route
            path=":id/novo/visualizacao/studio/kpi"
            element={<PanelViewStudioKPIChartPage />}
          />
        </Route>
        <Route element={<PanelViewStudioWaterfallChartLayout />}>
          <Route
            path=":id/novo/visualizacao/studio/waterfall"
            element={<PanelViewStudioWaterfallChartPage />}
          />
        </Route>
        <Route element={<PanelViewStudioMapChartLayout />}>
          <Route
            path=":id/novo/visualizacao/studio/map"
            element={<PanelViewStudioMapChartPage />}
          />
        </Route>
        <Route element={<PanelViewStudioNumberViewLayout />}>
          <Route
            path=":id/novo/visualizacao/studio/number"
            element={<PanelViewStudioNewViewPage />}
          />
        </Route>
        <Route
          path=":id/novo/visualizacao/studio/select"
          element={<PanelViewStudioSelectFilterPage />}
        />
      </Route>
    </Route>
  </Routes>
);
