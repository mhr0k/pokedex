export default function debounce(cb: Function, d = 1000) {
  let t: number;
  return (...args: []) => {
    clearTimeout(t);
    t = setTimeout(() => {
      cb(...args);
    }, d);
  };
}
