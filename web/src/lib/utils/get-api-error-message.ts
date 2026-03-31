import axios from 'axios';

export const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    return error.response.data.message;
  }

  return fallback;
};
