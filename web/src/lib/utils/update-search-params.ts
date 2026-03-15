export const updateSearchParams = (
  params: URLSearchParams,
  updates: Record<string, string | string[] | null | undefined>,
) => {
  const newParams = new URLSearchParams(params.toString());

  Object.entries(updates).forEach(([key, value]) => {
    if (
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0)
    ) {
      newParams.delete(key);
      return;
    }

    if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach((v) => newParams.append(key, v));
      return;
    }

    newParams.set(key, String(value));
  });

  return newParams;
};
