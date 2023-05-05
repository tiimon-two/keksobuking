import {getData, setFilterChange} from './api.js';
import { debounce } from './util.js';
import './fileLoad.js';

const DELAY = 500;

getData();

setFilterChange(debounce(() => getData(), DELAY));

