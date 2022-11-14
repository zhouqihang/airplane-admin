export const console_err = {
  editor: function (message?: any, ...optionalParams: any[]) {
    if (window.__AIRPLANE_ENV.IN_EDITOR) {
      console.error(message, optionalParams);
    }
  },
  prod: function (message?: any, ...optionalParams: any[]) {
    if (!window.__AIRPLANE_ENV.IN_EDITOR) {
      console.error(message, optionalParams);
    }
  },
}