import React from 'react';

import { PanelNewViewStudioHorizontalBarChartContext } from '../contexts/PanelNewViewStudioHorizontalBarChartProvider';

export const usePanelNewViewStudioHorizontalBarChartContext = () => {
  const value = React.useContext(PanelNewViewStudioHorizontalBarChartContext);

  if (!value) {
    throw new Error(
      'PanelNewViewStudioHorizontalBarChartContext só pode usado dentro do componente PanelNewViewProvider',
    );
  }

  return value;
};
