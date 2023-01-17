function getEnvironmentVariable(varName) {
  const value = process.env[varName];
  return value;
}
export const USER_ID = getEnvironmentVariable('USER_ID')
export const PASSWORD = getEnvironmentVariable('PASSWORD');