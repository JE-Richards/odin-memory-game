export default function dataProcessor(data) {
  // optional chain to find sprite or return null
  const sprite =
    data?.sprites?.versions?.['generation-iv']?.platinum?.front_default || null;

  // warn if no sprite is found
  if (!sprite) {
    console.warn(`Sprite not found for ID ${data.id}`);
  }

  return {
    id: data.id,
    name: data.name,
    sprite: sprite,
  };
}
