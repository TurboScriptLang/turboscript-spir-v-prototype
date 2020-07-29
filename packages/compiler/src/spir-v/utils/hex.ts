export function hex(value: number): string {
  const hexStr = value.toString(16);
  return `0x${hexStr.padStart(8, "0")}`;
}
