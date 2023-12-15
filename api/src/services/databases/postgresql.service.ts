import { ExecuteSqlError } from './errors/execute-sql.error';
import { Client } from 'pg';
import { SchemaError } from './errors/schema.error';
import { TableError } from './errors/tables.error';
import { OnDemandDatabase } from './abstract/OnDemandDatabase';
import { PG_DOMAIN_TYPES } from 'src/constants/pg-domain-types';
import { PG_DATABASE_TYPES } from 'src/constants/pg-database-types';
import { ColumnType } from 'src/core/domain/types/common';

interface PostgresqlServiceProps {
  accessKey: string;
}

export class PostgresqlService implements OnDemandDatabase {
  private readonly pgClient: Client;

  public constructor({ accessKey }: PostgresqlServiceProps) {
    this.pgClient = new Client({ connectionString: accessKey });
  }

  public async query(sql: string) {
    try {
      await this.pgClient.connect();
      const result = await this.pgClient.query<unknown>(sql);
      const columnsMetadata = result.fields.map((r) => ({
        name: r.name,
        dataType: this.getDataType(r.dataTypeID),
      }));
      return { rows: result.rows, metadata: { columns: columnsMetadata } };
    } catch (error) {
      throw new ExecuteSqlError(error?.message ?? 'Erro desconhecido');
    } finally {
      this.pgClient.end();
    }
  }

  public async schemas() {
    try {
      await this.pgClient.connect();
      const result = await this.pgClient.query<{ schema_name: string }>(
        `SELECT schema_name FROM information_schema.schemata;`,
      );
      const schemas = result.rows.map((s) => s.schema_name);
      return schemas;
    } catch (error) {
      throw new SchemaError();
    } finally {
      await this.pgClient.end();
    }
  }

  public async tables(schema: string) {
    try {
      await this.pgClient.connect();
      const result = await this.pgClient.query<{ table_name: string }>(
        `SELECT table_name FROM information_schema.tables WHERE table_schema = $1`,
        [schema],
      );
      const tables = result.rows.map((t) => t.table_name);
      return tables;
    } catch (error) {
      throw new TableError();
    } finally {
      await this.pgClient.end();
    }
  }

  public getDataType(id: number): ColumnType | 'undefined' {
    const resultDataType = PG_DATABASE_TYPES[id];
    const dataType = PG_DOMAIN_TYPES[resultDataType];
    if (dataType === undefined) {
      return 'undefined';
    }
    return dataType;
  }
}
