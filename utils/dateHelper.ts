export const isoDate = (date = new Date()) => date.toISOString().slice(0, 10);
export const daysAgo = (days: number) => isoDate(new Date(Date.now() - days * 86_400_000));
