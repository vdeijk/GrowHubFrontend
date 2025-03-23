export const validate = (value: string, required: boolean): string | null => {
  if (required && !value.trim()) {
    return 'This field is required';
  }
  return null;
};
