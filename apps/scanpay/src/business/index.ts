import axios, { AxiosError } from 'axios';

/**
 * Handle Axios errors and return a standardized error object
 */
export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;

    return {
      message: axiosError.response?.data?.message || axiosError.message || 'An error occurred',
      statusCode: axiosError.response?.status || 500,
      data: axiosError.response?.data || null,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500,
      data: null,
    };
  }

  return {
    message: 'An unknown error occurred',
    statusCode: 500,
    data: null,
  };
};
