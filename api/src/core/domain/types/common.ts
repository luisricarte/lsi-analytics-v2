export type TypeOfStorage = 'DATABASE' | 'FILE';

export type DataFontProvider = 'POSTGRESQL' | 'CSV';
// AJUSTE -  terei que adicionar a parte do CSV | XLSX  ...

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
  | 'NUMBERVIEW'
  | 'SELECTFILTER';
// AJUSTE - EVOLUIR AS VIEWS TYPES;

export type ViewContentUpdate = 'STATIC' | 'DYNAMIC';
// AJUSTE - provavelmente será removido a parte do dynamic
