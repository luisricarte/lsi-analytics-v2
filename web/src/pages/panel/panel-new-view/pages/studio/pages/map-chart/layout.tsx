import React from 'react';
import { Outlet } from 'react-router-dom';

import { PanelNewViewStudioMapChartProvider } from './contexts/PanelNewViewStudioMapChartProvider';

export const PanelViewStudioMapChartLayout: React.FC = () => (
  <PanelNewViewStudioMapChartProvider>
    <Outlet />
  </PanelNewViewStudioMapChartProvider>
);
