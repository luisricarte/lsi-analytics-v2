import React from 'react';
import { Outlet } from 'react-router-dom';

import { PanelNewViewStudioDonutChartProvider } from './contexts/PanelNewViewStudioDonutChartProvider';

export const PanelViewStudioDonutChartLayout: React.FC = () => (
  <PanelNewViewStudioDonutChartProvider>
    <Outlet />
  </PanelNewViewStudioDonutChartProvider>
);
