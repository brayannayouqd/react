import z from "zod";
import axios, { AxiosRequestConfig } from "axios";

export interface TypeDefaultApiParams {
  instance?: "main";
  endpoint: string;
  body?: AxiosRequestConfig;
  paramsSchema?: z.ZodTypeAny;
  responseSchema?: z.ZodTypeAny;
  message?: {
    error?: string;
    success?: string;
  };
  queryKey?: string[];
  options?: Record<string, any>;
}

export type DecodedToken = {
  _id: number;
  email: string;
  iat: number;
  exp: number;
};

export const axiosMain = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

export const axiosInstances = {
  main: axiosMain,
};

