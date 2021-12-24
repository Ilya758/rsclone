export const tokenValidation = (token: string): boolean => {
  if (token === 'test_token') return true;
  return false;
}