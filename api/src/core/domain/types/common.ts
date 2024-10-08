export type TypeOfStorage = 'DATABASE' | 'FILE';

export type DataFontProvider = 'POSTGRESQL' | 'CSV';

export type ColumnType =
  | 'STRING'
  | 'DATE'
  | 'NUMBER'
  | 'BOOLEAN'
  | 'OBJECT'
  | 'UNDEFINED';

export type FeedbackType = 'BUG' | 'IDEA' | 'SUPPORT';

export type ViewType =
  | 'PIECHART'
  | 'BARCHART'
  | 'LINECHART'
  | 'MAPCHART'
  | 'AREACHART'
  | 'NUMBERVIEW'
  | 'SELECTFILTER'
  | 'DONUTCHART'
  | 'HORIZONTALBARCHART'
  | 'WATERFALLCHART'
  | 'KPICHART';

export type ViewContentUpdate = 'STATIC' | 'DYNAMIC';
