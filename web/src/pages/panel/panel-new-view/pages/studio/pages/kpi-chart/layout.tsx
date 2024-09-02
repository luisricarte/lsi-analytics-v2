import React from 'react';
import { Outlet } from 'react-router-dom';

import { PanelNewViewStudioKPIChartProvider } from './contexts/PanelNewViewStudioKPIChartProvider';

export const PanelViewStudioKPIChartLayout: React.FC = () => (
  <PanelNewViewStudioKPIChartProvider>
    <Outlet />
  </PanelNewViewStudioKPIChartProvider>
);
