const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDZlZTU3MGJiYzc1YTEyOTE4N2I1ZmE3NGRiMTJlYiIsInN1YiI6IjY1N2I0YTdkZWM4YTQzMDExYTNiN2IyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HP5KdC5aq_b4GN96rHBQsn2FclULv7mgBuvx4btRVos";

export async function getPlayedNow() {
  const url =
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const data = await (await fetch(url, options)).json();
  return data.results;
}
