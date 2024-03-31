export const getErrorMessage = (error: any): string => {
  let message = `That's an error.`;

  if (!!error?.response?.data) {
    message = error.response.data;
  }

  if (!!error?.response?.data?.meta?.message) {
    message = error.response.data.meta.message;
  }

  return message;
};
