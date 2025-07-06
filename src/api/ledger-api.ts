import * as axios from "axios";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import useSwr from "swr";
import type { Key, SWRConfiguration } from "swr";

import useSWRMutation from "swr/mutation";
import type { SWRMutationConfiguration } from "swr/mutation";

import type { NewTransaction, Transaction } from "./model";

export const getTransactions = (options?: AxiosRequestConfig): Promise<AxiosResponse<Transaction[]>> => {
  return axios.default.get(`/transactions`, options);
};

export const getGetTransactionsKey = () => [`/transactions`] as const;

export type GetTransactionsQueryResult = NonNullable<Awaited<ReturnType<typeof getTransactions>>>;
export type GetTransactionsQueryError = AxiosError<unknown>;

export const useGetTransactions = <TError = AxiosError<unknown>>(options?: {
  swr?: SWRConfiguration<Awaited<ReturnType<typeof getTransactions>>, TError> & {
    swrKey?: Key;
    enabled?: boolean;
  };
  axios?: AxiosRequestConfig;
}) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {};

  const isEnabled = swrOptions?.enabled !== false;
  const swrKey = swrOptions?.swrKey ?? (() => (isEnabled ? getGetTransactionsKey() : null));
  const swrFn = () => getTransactions(axiosOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions);

  return {
    swrKey,
    ...query,
  };
};

export const postTransactions = (newTransaction: NewTransaction, options?: AxiosRequestConfig): Promise<AxiosResponse<Transaction>> => {
  return axios.default.post(`/transactions`, newTransaction, options);
};

export const getPostTransactionsMutationFetcher = (options?: AxiosRequestConfig) => {
  return (_: Key, { arg }: { arg: NewTransaction }): Promise<AxiosResponse<Transaction>> => {
    return postTransactions(arg, options);
  };
};
export const getPostTransactionsMutationKey = () => [`/transactions`] as const;

export type PostTransactionsMutationResult = NonNullable<Awaited<ReturnType<typeof postTransactions>>>;
export type PostTransactionsMutationError = AxiosError<unknown>;

export const usePostTransactions = <TError = AxiosError<unknown>>(options?: {
  swr?: SWRMutationConfiguration<Awaited<ReturnType<typeof postTransactions>>, TError, Key, NewTransaction, Awaited<ReturnType<typeof postTransactions>>> & {
    swrKey?: string;
  };
  axios?: AxiosRequestConfig;
}) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {};

  const swrKey = swrOptions?.swrKey ?? getPostTransactionsMutationKey();
  const swrFn = getPostTransactionsMutationFetcher(axiosOptions);

  const query = useSWRMutation(swrKey, swrFn, swrOptions);

  return {
    swrKey,
    ...query,
  };
};
