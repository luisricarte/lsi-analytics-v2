import React from 'react';

import { PanelNewViewStudioMapChartContext } from '../contexts/PanelNewViewStudioMapChartProvider';

export const usePanelNewViewStudioMapChartContext = () => {
  const value = React.useContext(PanelNewViewStudioMapChartContext);

  if (!value) {
    throw new Error(
      'PanelNewViewStudioMapChartContext só pode usado dentro do componente PanelNewViewProvider',
    );
  }

  return value;
};
