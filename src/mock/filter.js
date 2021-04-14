import {getRandom} from '../utils/util.js';
export const createFilter = () => {
  return [
    {
      desc: 'Wathchilst',
      count: getRandom(0,5),
    },
    {
      desc: 'History',
      count: getRandom(0,5),
    },
    {
      desc: 'Favorites',
      count: getRandom(0,5),
    },
  ];
};
