export const fetchComponents = async (url, setComponent, setError) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setComponent(data);
  } catch (error) {
    setError(error.message);
  }
};