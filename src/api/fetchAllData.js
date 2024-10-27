import fetchData from './fetchData.js';

export default async function fetchAllData(ids) {
  const requests = ids.map((id) => fetchData(id));

  try {
    const responses = await Promise.all(requests);

    // filter to only include successfull responses
    const data = responses.filter((res) => res.data).map((res) => res.data);

    // filter to only include fetch errors
    const errors = responses.filter((res) => res.error).map((res) => res.error);

    if (errors.length) {
      console.warn('Some requests failed:', errors);
    }

    return { data, errors };
  } catch (error) {
    console.error('Error fetching all data:', error);
    return {
      data: null,
      error: `Unexpected error during batch fetch request: ${error}`,
    };
  }
}
