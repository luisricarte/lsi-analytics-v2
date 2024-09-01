import { api } from '../api';
import { CsvModel, DataFontModel, SQLResult } from '../models/datafont/types';
import { DeleteRequest, GetRequest, PostRequest } from '../types';

export type CreateDataFontProps = PostRequest<
  Pick<DataFontModel, 'name' | 'typeOfStorage' | 'provider' | 'accessKey'>
>;

export type CreateCsvFontProps = PostRequest<
  Pick<
    CsvModel,
    | 'name'
    | 'typeOfStorage'
    | 'provider'
    | 'csvData'
    | 'tableName'
    | 'columnTypes'
  >
>;

export type FindAllDataFontsProps = Omit<
  GetRequest<unknown, { name: string }>,
  'path'
>;

export type GetFontById = GetRequest<{ datafontId: string }>;

export type DeleteDataFontProps = DeleteRequest<{ id: string }>;

export type FindSchemasProps = GetRequest<{ datafontId: string }>;

export type FindSchemasResponse = { schemas: string[] };

export type FindTablesProps = GetRequest<{
  datafontId: string;
  schemaName: string;
}>;

export type FindTablesCsvProps = GetRequest<{
  tableName: string;
}>;

export type FindTablesResponse = { tables: string[] };

export type ExecuteSqlProps = PostRequest<{ datafontId: string; sql: string }>;

class DataFontsService {
  public async createDataBaseFont(props: CreateDataFontProps) {
    const response = await api.post<DataFontModel>(
      '/datafonts',
      props.body,
      props.config,
    );

    return response.data;
  }

  public async createCsvFont(props: CreateCsvFontProps) {
    const response = await api.post<CsvModel>(
      '/datafonts/csv',
      props.body,
      props.config,
    );

    return response.data;
  }

  public async findAll(props: FindAllDataFontsProps = {}) {
    const response = await api.get<DataFontModel[]>('/datafonts', props.config);

    return response.data;
  }

  public async delete(props: DeleteDataFontProps) {
    const response = await api.delete(`/datafonts/${props.path.id}`);

    return response.data;
  }

  public async findSchemas(props: FindSchemasProps) {
    const response = await api.get<FindSchemasResponse>(
      `/datafonts/${props.path.datafontId}/schemas`,
      props.config,
    );

    return response.data;
  }

  public async findTables(props: FindTablesProps) {
    const response = await api.get<FindTablesResponse>(
      `/datafonts/${props.path.datafontId}/${props.path.schemaName}/tables`,
    );

    return response.data;
  }

  public async executeSql(props: ExecuteSqlProps): Promise<SQLResult> {
    const response = await api.post<SQLResult>(
      '/datafonts/sql',
      props.body,
      props.config,
    );

    return response.data;
  }

  public async getDataFontById(props: GetFontById) {
    const response = await api.get<CsvModel>(
      `/datafonts/${props.path.datafontId}`,
    );

    return response.data;
  }
}

export const dataFontsService = new DataFontsService();
