import axios from 'axios';

export type UsersType = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

const instance = axios.create({
  baseURL: 'https://reqres.in',
});

export const usersAPI = {
  getUsers() {
    return instance.get('/api/users?page').then(res => res.data);
  },
  chosenPerson(id: number) {
    return instance.get(`/api/users/${id}`).then(res => res.data);
  },
};
