import {getRandom} from '../util.js';
const createFilter = () => {
  return {
    desc: ['Wathchilst', 'History', 'Favorites'],
    count:[getRandom(0,5), getRandom(0,5), getRandom(0,5)],
  };
};

const filters = createFilter();

export default filters;
