const host = window.location.host

/**
 * 是否是dev环境
 * @returns {boolean}
 */
export const isDev = () => {
  if (host.indexOf('dev') > -1 || host.indexOf('localhost') > -1 || !/[a-zA-Z]/.test(host)) return true;
}

/**
 * 是否是Test环境
 * @returns {boolean}
 */
export const isTest = () => {
  if (host.indexOf('test') > -1 ) return true;
}

/**
 * 是否是prod环境
 * @returns {boolean}
 */
export const isProd = () => {
  return !isDev() && !isTest();
}

