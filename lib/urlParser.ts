export const concatUrlParser = ({
  customUrl,
  key,
  value,
  withNextParam,
}: {
  customUrl: string;
  key: string;
  value: string;
  withNextParam: boolean;
}) => {
  const urlParsed = customUrl.concat(`${key}=${value}`);
  if (withNextParam) {
    return urlParsed.concat('&');
  }
  return urlParsed;
};

export const objectToQueryString = (object: Record<string, string | undefined>) => {
  const paramKeys = Object.keys(object);
  return paramKeys.reduce((customUrl, paramKey, index) => {
    const value = object[paramKey];
    if (value) {
      return concatUrlParser({
        customUrl,
        key: paramKey,
        value,
        withNextParam: paramKeys.length - 1 !== index,
      });
    }
    return customUrl;
  }, '');
};

export const objectToURL = (
  baseURL: string,
  object: Record<string, string | undefined>
): string => {
  const params = objectToQueryString(object);
  return `${baseURL}${params}`;
};
