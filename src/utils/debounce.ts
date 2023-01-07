export default function debounce(func: Function, wait = 2000, immediate = false) {
  let timer: number = 0;
  let result: any;

  const debounced = function (this: unknown, ...args: typeof func.arguments) {
    const context = this;
    if (timer && !immediate) {
      window.clearTimeout(timer);
      timer = 0;
    }
    // console.log(timer)
    if (immediate && !timer) {
      result = func.apply(context, args);
      timer = window.setTimeout(function () {
        timer = 0;
        result = undefined;
      }, wait);
    }
    else {
      timer = window.setTimeout(function () {
        result = func.apply(context, args);
        timer = 0;
      }, wait);
    }

    return result;
  }

  debounced.cancel = function () {
    window.clearTimeout(timer);
    timer = 0;
    result = undefined;
  }

  return debounced;
}
