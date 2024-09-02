import axios, { AxiosError } from 'axios';
import clsx, { ClassValue } from 'clsx';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

import { EchartAdapter } from '@/adapters/echart';
import { UNEXPECTED_ERROR } from '@/constants/messages';
import {
  Breakpoints,
  LayoutsType,
} from '@/pages/panel/contexts/PanelEditProvider';
import { NumberViewPresentation } from '@/pages/panel/panel-new-view/pages/studio/pages/number-view/contexts/PanelNewViewStudioNumberViewProvider';
import { SelectFilterPresentation } from '@/pages/panel/panel-new-view/pages/studio/pages/select-filter/hooks/useSelectFilterStore';
import { SQLResult } from '@/services/models/datafont/types';
import { PANEL } from '@/services/models/panel/constants';
import {
  GraphTypeCore,
  NumberView,
  SelectFilter,
  ViewModel,
} from '@/services/models/panel/types';
import { UserWithoutPasswordModel } from '@/services/models/users/types';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const handleErrorNotify = (error?: AxiosError | Error) => {
  const toastError = (message: string | string[]) => {
    if (Array.isArray(message)) {
      message.forEach((m) => toast(m, { type: 'error' }));
    } else {
      toast(message, { type: 'error' });
    }
  };

  if (axios.isAxiosError(error)) {
    const message = error?.response?.data.message ?? UNEXPECTED_ERROR;
    toastError(message);
  } else if (error?.message) {
    toastError(error?.message);
  } else {
    toastError(UNEXPECTED_ERROR);
  }
};

export const extractTokenFromCookies = () => {
  const token = Cookies.get('accessToken');

  if (!token) {
    return null;
  }

  return token;
};

export const getUserInfo = () => {
  const memorizedUser = localStorage.getItem('user');

  if (memorizedUser) {
    const user = JSON.parse(memorizedUser) as UserWithoutPasswordModel;

    return user;
  }

  return null;
};

export const capitalizarFirstLetter = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const isDifferentOfUndefinedAndNull = (value: unknown) => {
  if (value !== undefined && value !== null) {
    return true;
  }

  return false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const objectsAreEqual = (objA: any, objB: any): boolean => {
  if (
    typeof objA !== 'object' ||
    typeof objB !== 'object' ||
    objA === null ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keysA) {
    const valueA = objA[key];
    const valueB = objB[key];

    if (typeof valueA === 'object' && typeof valueB === 'object') {
      if (!objectsAreEqual(valueA, valueB)) {
        return false;
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (valueA !== valueB) {
        return false;
      }
    }
  }

  return true;
};

export const removeAccents = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const copyToClipboard = async ({
  text,
  onSuccess = () => {},
  onError = () => {},
}: {
  text: string;
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  try {
    await navigator.clipboard.writeText(text);
    onSuccess();
  } catch (err) {
    onError();
  }
};

export const addViewIdToLayout = (
  prevLayout: LayoutsType,
  newViewId: string,
) => {
  const newState = { ...prevLayout };

  Object.keys(newState).forEach((k) => {
    const _k = k as Breakpoints;

    let viewsInXZeroHeightSum = 0;

    newState[_k].forEach((l) => {
      if (l.x === 0) {
        viewsInXZeroHeightSum += l.h;
      }
    });

    newState[_k] = [
      ...newState[_k],
      {
        i: newViewId,
        x: 0,
        y: viewsInXZeroHeightSum,
        w: 6,
        h: 7,
      },
    ];
  });

  return newState;
};

export const formatDecimalPlaces = (
  number: number,
  decimalPlaces: number,
): number => {
  const potenciaDez = 10 ** decimalPlaces;
  return Math.round(number * potenciaDez) / potenciaDez;
};

export const numberViewFormattedValue = ({
  number,
  numberOfDecimalPlaces,
  isPercentage,
}: {
  number?: number | null;
  numberOfDecimalPlaces?: number | null;
  isPercentage?: boolean;
}) => {
  let finalNumber = 'NaN';

  if (number) {
    finalNumber = number.toString();
    if (numberOfDecimalPlaces !== null && numberOfDecimalPlaces !== undefined) {
      finalNumber = formatDecimalPlaces(
        number,
        numberOfDecimalPlaces,
      ).toString();
    }
    if (isPercentage) {
      finalNumber += '%';
    }
  }

  return finalNumber;
};

export const getNumberViewValue = ({
  queryData,
  category,
}: {
  queryData?: SQLResult | null;
  category?: string | null;
}) => {
  let numberValue = null;

  if (queryData && queryData.rows[0] && category) {
    const record = queryData.rows[0];
    numberValue = record[category];
  }

  return numberValue;
};

export const getSelectFilterData = ({
  queryData,
  category,
}: {
  queryData?: SQLResult | null;
  category?: string | null;
}) => {
  if (queryData && category) {
    return queryData.rows.map((qd) => qd[category]);
  }

  return [];
};

export const getViewData = (v: { queryResult: SQLResult; view: ViewModel }) => {
  switch (v.view.type) {
    case PANEL.VIEW.HORIZONTALBARCHART:
    case PANEL.VIEW.WATERFALLCHART:
    case PANEL.VIEW.KPICHART:
    case PANEL.VIEW.DONUTCHART:
    case PANEL.VIEW.MAPCHART:
    case PANEL.VIEW.BARCHART:
    case PANEL.VIEW.PIECHART:
    case PANEL.VIEW.LINECHART:
    case PANEL.VIEW.AREACHART:
      return EchartAdapter.queryToData({
        queryResult: v.queryResult,
        type: v.view.type,
        core: v.view.core as GraphTypeCore,
      });

    case PANEL.VIEW.NUMBERVIEW: {
      const core = v.view.core as NumberView;
      const number = getNumberViewValue({
        queryData: v.queryResult,
        category: core.labelColumn,
      });
      const numData: NumberViewPresentation = {
        formattedValue: numberViewFormattedValue({
          number,
          numberOfDecimalPlaces: core.numberOfDecimalPlaces,
          isPercentage: core.isPercentage,
        }),
        subTitle: core.subTitle,
      };

      return numData;
    }

    case PANEL.VIEW.SELECTFILTER: {
      const core = v.view.core as SelectFilter;
      const selectData: SelectFilterPresentation = {
        queryData: v.queryResult,
        labelColumn: core.labelColumn,
      };
      return selectData;
    }

    default:
      return null;
  }
};

export const isValidHex = (hex: string) => {
  const hexRegex = /^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/;

  return (
    (hexRegex.test(hex) && !/[^\s]/.test(hex.replace(hexRegex, ''))) ||
    hex === ''
  );
};

export const isConvertibleToFloat = (value: string | number) => {
  let parsed: number | null = null;
  if (typeof value === 'number') {
    if (!Number.isNaN(value)) {
      parsed = value;
      return { isConvertible: true, parsedValue: parsed };
    }
  } else if (typeof value === 'string') {
    parsed = parseFloat(value);
    if (!Number.isNaN(parsed)) {
      return { isConvertible: true, parsedValue: parsed };
    }
  }

  return { isConvertible: false, parsedValue: null };
};

export const calcularValoresTotais = (
  valorespositivos: (string | number)[],
  valoresnegativos: (string | number)[],
): number[] => {
  const valoresTotais = [];
  let total = 0;

  for (let i = 0; i < valorespositivos.length; i += 1) {
    const positivo = valorespositivos[i];
    const negativo = valoresnegativos[i];

    if (typeof positivo === 'number') {
      if (valorespositivos[i + 1] === '-') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const proximoNegativo: any =
          typeof valoresnegativos[i + 1] === 'number'
            ? valoresnegativos[i + 1]
            : 0;

        total += positivo - proximoNegativo;
        valoresTotais.push(total);
        i += 1;
      } else {
        total += positivo;
      }
    } else if (positivo === '-' && typeof negativo === 'number') {
      total -= negativo;
    }

    valoresTotais.push(total);
    if (positivo === '-' && typeof valorespositivos[i + 1] === 'number') {
      valoresTotais.push(total);
    }
  }

  return valoresTotais;
};

export const formatMoney = (value: number): string => {
  const formattedMoney = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedMoney;
};
