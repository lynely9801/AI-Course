export async function fetchRandomPokemon(count) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);
  const data = await res.json();
  const all = data.results;
  const selected = [];
  const used = new Set();
  while (selected.length < count) {
    const idx = Math.floor(Math.random() * all.length);
    if (!used.has(idx)) {
      used.add(idx);
      selected.push(all[idx]);
    }
  }
  // Fetch details for sprites
  const details = await Promise.all(
    selected.map(p => fetch(p.url).then(r => r.json()))
  );
  return details.map(d => ({
    name: d.name,
    image: d.sprites.front_default,
    id: d.id,
  }));
}
