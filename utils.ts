// Masking logic: 352706200500508 -> 3527062***00508
// Keeps first 7, masks middle 3, keeps last 5
export const maskPBP = (pbp: string): string => {
  if (!pbp || pbp.length < 10) return pbp; // Safety check
  const start = pbp.substring(0, 7);
  const end = pbp.substring(pbp.length - 5);
  return `${start}***${end}`;
};

export const normalizeString = (str: string): string => {
  return str.toLowerCase().replace(/\s+/g, '');
};