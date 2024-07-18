import React from 'react';
import { Outlet } from 'react-router-dom';

import { PanelNewViewStudioWaterfallChartProvider } from './contexts/PanelNewViewStudioWaterfallChartProvider';

export const PanelViewStudioWaterfallChartLayout: React.FC = () => (
  <PanelNewViewStudioWaterfallChartProvider>
    <Outlet />
  </PanelNewViewStudioWaterfallChartProvider>
);
