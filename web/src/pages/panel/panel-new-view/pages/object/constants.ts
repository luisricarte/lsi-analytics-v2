import { APP_ROUTES } from '@/constants/app-routes';
import { ViewType } from '@/services/models/panel/types';

export const TYPE_STUDIO_LINK_MAPPER: Record<ViewType, string> = {
  PIECHART: APP_ROUTES.panel.new.studio.pie,
  BARCHART: APP_ROUTES.panel.new.studio.bar,
  LINECHART: APP_ROUTES.panel.new.studio.line,
  HORIZONTALBARCHART: APP_ROUTES.panel.new.studio.horizontalBar,
  DONUTCHART: APP_ROUTES.panel.new.studio.donut,
  WATERFALLCHART: APP_ROUTES.panel.new.studio.waterfall,
  MAPCHART: APP_ROUTES.panel.new.studio.map,
  KPICHART: APP_ROUTES.panel.new.studio.kpi,
  NUMBERVIEW: APP_ROUTES.panel.new.studio.number,
  SELECTFILTER: APP_ROUTES.panel.new.studio.select,
};
