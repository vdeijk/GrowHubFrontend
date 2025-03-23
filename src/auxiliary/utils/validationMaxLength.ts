export const validate = (value: string, maxLength: number): string | null => {
  if (value.length > maxLength) {
    return `Input cannot exceed ${maxLength} characters`;
  }
  return null;
};
