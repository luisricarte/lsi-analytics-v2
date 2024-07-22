import React from 'react';
import { Outlet } from 'react-router-dom';

import { PanelNewViewStudioAreaChartProvider } from './contexts/PanelNewViewStudioAreaChartProvider';

export const PanelViewStudioAreaChartLayout: React.FC = () => (
  <PanelNewViewStudioAreaChartProvider>
    <Outlet />
  </PanelNewViewStudioAreaChartProvider>
);
