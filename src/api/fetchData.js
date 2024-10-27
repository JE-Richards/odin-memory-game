export default async function fetchData(id) {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  try {
    const response = await fetch(`${apiUrl}${id}/`);

    if (response.ok) {
      const jsonData = await response.json();
      return { data: jsonData, error: null };
    } else {
      let errorMessage = `An unexpected error occurred fetching data for ID ${id}.`;

      switch (response.status) {
        case 404:
          errorMessage = `Resource not found (404) for ID ${id}.`;
          break;
        case 500:
          errorMessage = `Server error (500) when requesting data for ID ${id}. Please try again later.`;
          break;
        case 503:
          errorMessage = `Service unavailable (503) when requesting data for ID ${id}. Please try again later.`;
          break;
        default:
          break;
      }

      return { data: null, error: errorMessage };
    }
  } catch (error) {
    return {
      data: null,
      error: `Unexpected error fetching ID ${id}: ${error}`,
    };
  }
}
