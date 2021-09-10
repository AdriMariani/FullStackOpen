export function isString(text: unknown): text is string {
  return typeof text === 'string' || text instanceof String;
}

export function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}

export function parseStringParam(param: unknown, paramName: string): string {
  if (!param || !isString(param)) {
    throw new Error(`${paramName} is invalid or missing: ${param}`);
  }

  return param;
}

export function parseDate(date: unknown): string {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`date is invalid or missing: ${date}`);
  }

  return date;
}