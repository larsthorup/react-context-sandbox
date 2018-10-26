export default async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return {response, json};
}