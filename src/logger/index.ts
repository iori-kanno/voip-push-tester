import colors from 'colors/safe';

const debug = (message?: any, ...optionalParams: any[]) => {
  console.debug(
    colors.gray('DEBUG:'),
    colors.gray(message),
    ...optionalParams.map((p) => colors.gray(p))
  );
};

const log = (message?: any, ...optionalParams: any[]) => {
  console.log(colors.bgBlue(' INFO:'), message, ...optionalParams);
};

const success = (message?: any, ...optionalParams: any[]) => {
  console.log(colors.green('SUCCESS:'), message, ...optionalParams);
};

const warn = (message?: any, ...optionalParams: any[]) => {
  console.warn(colors.yellow(' WARN:'), message, ...optionalParams);
};

const error = (message?: any, ...optionalParams: any[]) => {
  console.error(colors.bgRed('ERROR:'), message, ...optionalParams);
};

export const logger = {
  debug,
  log,
  success,
  warn,
  error,
};
