import React from 'react';
import { Outlet } from 'react-router-dom';

import { PanelNewViewStudioHorizontalBarChartProvider } from './contexts/PanelNewViewStudioHorizontalBarChartProvider';

export const PanelViewStudioHorizontalBarChartLayout: React.FC = () => (
  <PanelNewViewStudioHorizontalBarChartProvider>
    <Outlet />
  </PanelNewViewStudioHorizontalBarChartProvider>
);
