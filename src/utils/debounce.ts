export default function debounce(cb: any, d = 1000) {
  let t: any;
  return (...args: any[]) => {
    clearTimeout(t);
    t = setTimeout(() => {
      cb(...args);
    }, d);
  };
}
