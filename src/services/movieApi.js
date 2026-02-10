const API_KEY = "ddb2f3921216bbc4a5ddff09eb8c6654";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { results: [] };
  }
};
