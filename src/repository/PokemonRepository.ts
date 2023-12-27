import axios, { AxiosInstance} from 'axios';

const steamApi: AxiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

const get = (url: string): GetResponse<any> => {
  return steamApi.get(url)
    .then((response) => {
      return {
        data: response.data,
        error: null,
        status: response.status
      }
    }).catch((error) => {
      return {
        data: null,
        error: error.response.data,
        status: error.response.status
      }
    });
}

const getPokemonsAtPage = (page: number = 0): GetResponse<Pokemon|any> => {
  return get(`pokemon?limit=50&offset=${page * 50}`).then((response) => {
    const pokemons: Pokemon[] = response.data?.results ?? [];
    const promises = pokemons.map((pokemon: any) => {
      return get(pokemon.url.replace(steamApi.getUri(), ''));
    });
    
    
    return Promise.all(promises).then((responses) => {
      return {
        data: responses.map((response) => response.data),
        error: null,
        status: 200
      }
    });
  });
}

export { getPokemonsAtPage };