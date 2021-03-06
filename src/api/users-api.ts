import axios from 'axios';

export type UsersType = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

type ResponsePersonType = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UsersType;
  support: {
    url: string;
    text: string;
  };
};

export type ResponseUsersType = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number | null;
  data: Array<UsersType>;
  support: {
    url: string;
    text: string;
  };
};

const instance = axios.create({
  baseURL: 'https://reqres.in',
});

export const usersAPI = {
  getUsers(page: number) {
    return instance.get<ResponseUsersType>(`/api/users?page=${page}`);
  },
  chosenPerson(id: number) {
    return instance
      .get<ResponsePersonType>(`/api/users/${id}`)
      .then(res => res.data);
  },
};
