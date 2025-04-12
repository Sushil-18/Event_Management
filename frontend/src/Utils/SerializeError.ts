import { AxiosError } from "axios";

export interface SerializedError {
  message: string;
  status?: number;
  data?: unknown;
}

export const serializeError = (
  error: Error | AxiosError | unknown
): SerializedError => {
  if (error instanceof AxiosError) {
    return {
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      data: error.response?.data,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      status: undefined,
      data: undefined,
    };
  }

  return {
    message: "An unknown error occurred",
    status: undefined,
    data: undefined,
  };
};
