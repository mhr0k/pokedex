export default function sortAZ(a: { name: string }, b: { name: string }) {
  return a.name.localeCompare(b.name);
}
