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
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/input/PasswordInput';
import { Label } from '@/components/ui/label';
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

  const checkFieldType = (column: string[]) => {
    let isValid = true;

    column.forEach((e) => {
      if (e !== 'TEXT' && e !== 'NUMBER' && e !== 'STRING' && e !== 'DECIMAL') {
        isValid = false;
      }
    });

    if (csvData && Object.keys(csvData[0]).length !== column.length) {
      isValid = false;
    }

    return isValid;
  };

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
      mutateCsv({
        body: {
          name: data.name,
          typeOfStorage: data.font.typeOfStorage,
          provider: data.font.provider,
          tableName,
          csvData,
          columnTypes,
        },
      });
    }
  };

  const handleUploadCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileCSV = e?.target?.files?.[0];

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
                <div style={{ display: 'flex', gap: '16px' }}>
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
                    <Label>Adicione o nome da Tabela</Label>
                    <Input
                      type="text"
                      required
                      onChange={(e) => setTableName(e.target.value)}
                    />
                  </div>
                </div>
              )}
              {csvData && (
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
                  {Object.keys(csvData[0]).map((columnName, index) => (
                    <div key={index} style={{ display: 'flex', gap: '16px' }}>
                      <span style={{ width: '160px' }}>
                        {columnName.toUpperCase()}
                      </span>
                      <input
                        style={{ border: '1px solid black', padding: '4px' }}
                        type="text"
                        value={columnTypes[index]}
                        required
                        onChange={(e) =>
                          handleTypeChange(index, e.target.value.toUpperCase())
                        }
                        placeholder="Defina o tipo do campo"
                      />
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
