const pokeapiHost = 'https://pokeapi.co/api/v2/pokemon/'


type Api = {
  catchPokemon: () => Promise<Array<any>>;
  pokemonDetails: (pokemonName: string) => Promise<JSON>;
  abilityDetails: (url: string) => Promise<Array<any>>;
}

const api: Api = {
  catchPokemon: async () => {
    try {
      const random = Math.floor(Math.random() * 100);
      const response = await fetch(pokeapiHost + `?limit=15&offset=${random}`);
      const responseJson = await response.json();
      return responseJson['results'];
    }
    catch(error) {
      console.error(error);
      throw error;
    }
  },
  pokemonDetails: async (pokemonName: string) => {
    try {
      const response = await fetch(pokemonName);
      const responseJson = await response.json();
      return responseJson;
    }
    catch(error) {
      console.error(error);
      throw error;
    }
  },  

  abilityDetails: async (url: string) => {
    try {
      const response = await fetch(url);
      const responseJson = await response.json();
      return responseJson['effect_entries'];
    }
    catch(error) {
      console.error(error);
      throw error;
    }
  }
};

export default api;