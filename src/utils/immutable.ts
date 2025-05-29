export default function omitImmutableFields<T extends Record<string, any>>(obj: T, fields: string[]): Partial<T> {
  const copy = { ...obj };
  for (const field of fields) {
    delete copy[field];
  }
  return copy;
}
