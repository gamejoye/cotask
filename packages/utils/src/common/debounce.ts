export function debounce(fn: (...args: any[]) => any, delay: number) {
  let timer: any;
  return function (this: any, ...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
