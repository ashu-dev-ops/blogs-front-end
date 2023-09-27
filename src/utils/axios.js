import axios from 'axios';
import { BASE_URL } from '../constants';


export const customFetch = axios.create({
  baseURL: BASE_URL,
});
