import { ContentUpdate, ViewType } from './types';

export const PANEL = {
  VIEW: {
    PIECHART: 'PIECHART' as ViewType,
    BARCHART: 'BARCHART' as ViewType,
    LINECHART: 'LINECHART' as ViewType,
    AREACHART: 'AREACHART' as ViewType,
    DONUTCHART: 'DONUTCHART' as ViewType,
    HORIZONTALBARCHART: 'HORIZONTALBARCHART' as ViewType,
    WATERFALLCHART: 'WATERFALLCHART' as ViewType,
    KPICHART: 'KPICHART' as ViewType,
    MAPCHART: 'MAPCHART' as ViewType,
    NUMBERVIEW: 'NUMBERVIEW' as ViewType,
    SELECTFILTER: 'SELECTFILTER' as ViewType,
  },
  CONTENT_UPDATE: {
    DINAMIC: 'DINAMIC' as ContentUpdate,
    STATIC: 'STATIC' as ContentUpdate,
  },
  SIMPLE_VIEW_TYPE_LABEL_MAPPER: {
    PIECHART: 'Pizza',
    BARCHART: 'Barra',
    LINECHART: 'Linha',
    AREACHART: 'Área',
    NUMBERVIEW: 'Número',
    SELECTFILTER: 'Seleção',
    DONUTCHART: 'Rosca',
    HORIZONTALBARCHART: 'Barra Horrizontal',
    WATERFALLCHART: 'Cascata',
    KPICHART: 'KPI',
    MAPCHART: 'Mapa',
  },
};
