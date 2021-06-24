import axios from 'axios';

export type JokesType = {
  id: number;
  type: string;
  setup: string;
  punchline: string;
};

const instance = axios.create({
  baseURL: 'https://official-joke-api.appspot.com/',
});

export const jokesApi = {
  getJoke() {
    return instance.get('random_ten');
  },
};
