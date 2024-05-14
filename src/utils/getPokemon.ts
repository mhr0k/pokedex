export default async function fetchPokemon(url: URL) {
  const response: Response = await fetch(url.href);
  const data: object = await response.json();
  console.log(data);
  return data;
}
