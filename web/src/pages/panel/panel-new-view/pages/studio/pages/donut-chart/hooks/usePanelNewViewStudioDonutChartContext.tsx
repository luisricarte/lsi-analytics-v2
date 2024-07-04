import React from 'react';

import { PanelNewViewStudioDonutChartContext } from '../contexts/PanelNewViewStudioDonutChartProvider';

export const usePanelNewViewStudioDonutChartContext = () => {
  const value = React.useContext(PanelNewViewStudioDonutChartContext);

  if (!value) {
    throw new Error(
      'PanelNewViewStudioDonutChartContext só pode usado dentro do componente PanelNewViewProvider',
    );
  }

  return value;
};
