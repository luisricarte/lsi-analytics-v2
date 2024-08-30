/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage } from '@hookform/error-message';
import { useMutation } from '@tanstack/react-query';
import Papa from 'papaparse';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { FieldError } from '@/components/errors/field-error';
import { Layout } from '@/components/layout';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/input/PasswordInput';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { APP_ROUTES } from '@/constants/app-routes';
import { AVAILABLE_DATA_FONTS } from '@/constants/data-fonts';
import { REQUIRED_FIELD } from '@/constants/messages';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { dataFontsService } from '@/services/datafonts';
import {
  DataFontProvider,
  TypeOfStorage,
} from '@/services/models/datafont/types';
import { cn, handleErrorNotify } from '@/utils';

export type FormData = {
  name: string;
  accessKey?: string;
  font: { provider: DataFontProvider; typeOfStorage: TypeOfStorage };
};

export const DataFontsNewPage: React.FC = () => {
  const [accessKeyIsVisible, setAccessKeyIsVisible] =
    React.useState<boolean>(false);
  const [csvData, setCsvData] = useState<any[]>();
  const [columnTypes, setColumnTypes] = useState<string[]>([]);
  const [tableName, setTableName] = useState<string | null>();
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const handleTypeChange = (index: number, value: string) => {
    const newColumnTypes = [...columnTypes];
    newColumnTypes[index] = value;
    setColumnTypes(newColumnTypes);
  };

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const selectedProvider = watch('font');

  React.useEffect(() => {
    if (selectedProvider?.provider !== 'CSV') {
      setCsvData(undefined);
      setColumnTypes([]);
      setTableName(null);
    }
  }, [selectedProvider?.provider]);

  const checkFieldType = (column: string[]) =>
    csvData && selectedColumns.length === column.length;

  const { mutate, isPending } = useMutation({
    mutationKey: [reactQueryKeys.mutations.createDataFontMutation],
    mutationFn: dataFontsService.createDataBaseFont,
    onError: handleErrorNotify,
    onSuccess: () => {
      toast('Fonte de dados criada com sucesso', { type: 'success' });
      navigate(APP_ROUTES.dataFont.index);
    },
  });

  const { mutate: mutateCsv, isPending: isLoading } = useMutation({
    mutationKey: [reactQueryKeys.mutations.createCsvFontMutation],
    mutationFn: dataFontsService.createCsvFont,
    onError: handleErrorNotify,
    onSuccess: () => {
      toast('Fonte de dados criada com sucesso', { type: 'success' });
      navigate(APP_ROUTES.dataFont.index);
    },
  });

  const handleCheck = (value: boolean | string, field: string) => {
    setSelectedColumns((prevSelectedColumns) =>
      value
        ? [...prevSelectedColumns, field]
        : prevSelectedColumns.filter((col) => col !== field),
    );

    return !value;
  };

  const handleFillCsvData = (data: any[]) => {
    const filteredData = data?.map((obj): object => {
      const filteredObj: Record<string, any> = {};
      selectedColumns.forEach((key) => {
        if (key in obj) {
          filteredObj[key] = obj[key];
        }
      });
      return filteredObj;
    });

    return filteredData;
  };

  const onSubmit = (data: FormData) => {
    const accessKey = data?.accessKey;
    const { provider } = data.font;

    if (provider === 'POSTGRESQL') {
      mutate({
        body: {
          name: data.name,
          accessKey,
          typeOfStorage: data.font.typeOfStorage,
          provider: data.font.provider,
        },
      });
    } else if (
      tableName &&
      csvData &&
      columnTypes &&
      checkFieldType(columnTypes)
    ) {
      if (handleFillCsvData(csvData)) {
        mutateCsv({
          body: {
            name: data.name,
            typeOfStorage: data.font.typeOfStorage,
            provider: data.font.provider,
            tableName,
            csvData: handleFillCsvData(csvData),
            columnTypes,
          },
        });
      }
    } else {
      toast('Não foi possível criar a fonte de dados. Verifique os campos.', {
        type: 'error',
      });
    }
  };

  const handleUploadCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileCSV = e?.target?.files?.[0];
    setColumnTypes([]);
    if (fileCSV) {
      Papa.parse(fileCSV, {
        header: true,
        dynamicTyping: false,
        complete: (res) => {
          setCsvData(res.data as any[]);

          toast('Arquivo carregado com sucesso', { type: 'success' });
        },
        error: () => {
          toast('Erro ao carregar o CSV');
        },
      });
    }
  };

  return (
    <Layout
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbHome />
          <BreadcrumbLink to={APP_ROUTES.dataFont.index}>
            Fontes de dados
          </BreadcrumbLink>
          <BreadcrumbNeutral>Novo</BreadcrumbNeutral>
        </Breadcrumb>
      }
      className="layout-page flex flex-col gap-4"
    >
      <Card className="w-[1200px]">
        <CardHeader>
          <CardTitle>Nova fonte de dados</CardTitle>
          <CardDescription>Preencha para criar</CardDescription>
          <Typography level="muted"></Typography>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            <div>
              <Label>Nome</Label>
              <Input
                {...register('name', { required: REQUIRED_FIELD })}
                placeholder="Nome da fonte de dados"
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => <FieldError message={message} />}
              />
            </div>
            <div className="flex flex-col">
              <Label>Selecione o tipo de fonte</Label>
              <Controller
                control={control}
                name="font"
                rules={{ required: REQUIRED_FIELD }}
                render={({ field: { onChange } }) => (
                  <div className="grid grid-cols-2 gap-4 rounded-[2px] bg-zinc-50 p-8">
                    {AVAILABLE_DATA_FONTS.map((d, index) => {
                      const isSelected =
                        selectedProvider?.provider === d.provider &&
                        selectedProvider?.typeOfStorage === d.typeOfStorage;

                      return (
                        <button
                          type="button"
                          key={`${d.label}-${d.provider}-${d.typeOfStorage}-${index}`}
                          onClick={() => {
                            onChange({
                              provider: d.provider,
                              typeOfStorage: d.typeOfStorage,
                            });
                          }}
                          className={cn(
                            'flex h-48 flex-col items-center justify-center gap-8 rounded-sm bg-white shadow-sm',
                            isSelected &&
                              'relative bg-slate-700 text-foreground',
                          )}
                        >
                          <div className="rounded-full bg-zinc-50 p-4">
                            <img src={d.imageURL} className="w-16" />
                          </div>
                          <span className="text-sm font-semibold">
                            {d.label}
                          </span>
                          {isSelected && (
                            <div className="absolute right-2 top-2 h-4 w-4 rounded-full bg-green-500" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
              <ErrorMessage
                errors={errors}
                name="font"
                render={({ message }) => <FieldError message={message} />}
              />
            </div>
            <div>
              {selectedProvider?.provider === 'POSTGRESQL' && (
                <>
                  <Label>Chave de acesso</Label>
                  <PasswordInput
                    {...register('accessKey', { required: REQUIRED_FIELD })}
                    visible={accessKeyIsVisible}
                    onVisibilityChange={setAccessKeyIsVisible}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="accessKey"
                    render={({ message }) => <FieldError message={message} />}
                  />
                </>
              )}
              {selectedProvider?.provider === 'CSV' && (
                <div
                  style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <div>
                    <Label>Adicione o arquivo</Label>
                    <Input
                      type="file"
                      accept=".csv"
                      required
                      onChange={handleUploadCSV}
                    />
                  </div>
                  <div>
                    <Label>Adicione o nome da tabela</Label>
                    <Input
                      type="text"
                      required
                      onChange={(e) => setTableName(e.target.value)}
                    />
                  </div>
                </div>
              )}
              {selectedProvider?.provider === 'CSV' && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: '16px',
                    gap: '16px',
                  }}
                >
                  {csvData &&
                    Object.keys(csvData[0]).map((columnName, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          gap: '16px',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Checkbox
                          onCheckedChange={(e) => {
                            handleCheck(e, columnName);
                          }}
                        ></Checkbox>
                        <span style={{ width: '160px' }}>
                          {columnName.toUpperCase()}
                        </span>

                        <Select
                          value={columnTypes[index]}
                          onValueChange={(e) => handleTypeChange(index, e)}
                          disabled={!selectedColumns.includes(columnName)}
                        >
                          <SelectTrigger style={{ width: '120px' }}>
                            <SelectValue placeholder="Selecione um mapa" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={'BOOLEAN'}>BOOLEAN</SelectItem>
                            <SelectItem value={'DATE'}>DATE</SelectItem>
                            <SelectItem value={'DECIMAL'}>DECIMAL</SelectItem>
                            <SelectItem value={'INT'}>INT</SelectItem>
                            <SelectItem value={'JSONB'}>JSON</SelectItem>
                            <SelectItem value={'TEXT'}>TEXT</SelectItem>
                            <SelectItem value={'TIMESTAMP'}>
                              TIMESTAMP
                            </SelectItem>
                            <SelectItem value={'UUID'}>UUID</SelectItem>
                            <SelectItem value={'VARCHAR(255)'}>
                              VARCHAR
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <span>{columnName in selectedColumns}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" asChild>
              <Link to={APP_ROUTES.dataFont.index}>Voltar</Link>
            </Button>
            <Button
              type="submit"
              loading={isPending || isLoading}
              disabled={isPending || isLoading}
            >
              Criar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Layout>
  );
};
