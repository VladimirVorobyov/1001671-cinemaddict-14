import {getValues, getRandomRating, getRandom, getRandomArray} from '../util.js';
import comments from './comment.js';

const NUMBER_OFFERS = 5;
const NUMBER_RATING = 10;
const YEAR_START = 1900;
const YEAR_END = 2021;
const MAX_HOUR = 3;
const MAX_MINUTES = 60;
const genres = ['Cartoon','Comedy','Drama','Western','Musical'];

const createMovieTitle = () => {
  const movieTitles = ['The Shawshank Redemption', 'The Man Called Flintstone',
    'Casper', 'The Jungle Book', 'Tangled', 'The Lion King'];

  return getValues(movieTitles);

};

const createPoster = () => {
  const posters = ['./images/posters/the-great-flamarion.jpg',
    './images/posters/made-for-each-other.png',
    './images/posters/popeye-meets-sinbad.png',
    './images/posters/sagebrush-trail.jpg',
    './images/posters/santa-claus-conquers-the-martians.jpg',
    './images/posters/the-dance-of-life.jpg',
    './images/posters/the-man-with-the-golden-arm.jpg',
  ];

  return getValues(posters);

};

const createDescription = () => {
  const descriptionList = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus'];
  const mySet = new Set();

  for (let i = 0; i < NUMBER_OFFERS; i++) {

    mySet.add(descriptionList[getRandom(0, descriptionList.length - 1)]);

  }

  const uniqArray = Array.from(mySet);

  return uniqArray.join(' ');

};

const createGenre = () => {

  return getValues(genres);

};

const createTime = () => {
  const hour = getRandom(0,MAX_HOUR);
  const minutes = getRandom(0,MAX_MINUTES);

  if (hour) {
    return `${hour}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }

};

const createAge = () => {
  const ages = ['18+', '3+', '6+', '12+', '16+'];

  return getValues(ages);

};

const createDirector = () => {
  const directors = [
    'Anthony Mann',
    'Grea Mann',
    'Offer Anna',
    'Maria Lukas',
    'Ganna Gunna',
  ];

  return getValues(directors);

};

const createReleaseDate = () => {
  const maxNumberDay = 30;
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  return `${getRandom(0,maxNumberDay)} ${getValues(months)}`;

};

const createContry = () => {
  const contry =['Russia','USA','Belarus'];

  return getValues(contry);

};

const createArrayName = () => {
  const descriptionList = ['Anne Wigton', 'Heinz Herald', 'Richard Weil', 'Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'];
  const mySet = new Set();

  for (let i = 0; i < NUMBER_OFFERS; i++) {

    mySet.add(descriptionList[getRandom(0, descriptionList.length - 1)]);

  }

  const uniqArray = Array.from(mySet);

  return uniqArray.join(',');

};

const createNumGener = () => {
  const maxNumGenre = 3;

  return getRandom(0,maxNumGenre);

};

const createListGeneres = (main,num) => {
  const mySet = new Set();
  mySet.add(main);

  for (let i = 0; i < num; i++) {

    mySet.add(genres[getRandom(0, genres.length - 1)]);

  }

  const uniqArray = Array.from(mySet);

  return uniqArray;

};

const getComments = () => {
  return getRandomArray(comments).map((comment) => comment.id);
};

export const generateMovie = () => {
  const ageRelease = getRandom(YEAR_START, YEAR_END);
  const mainGenre = createGenre();
  const numberGeneres = createNumGener();

  return {
    movieTitle: createMovieTitle(),
    poster: createPoster(),
    description: createDescription(),
    rating: getRandomRating(0, NUMBER_RATING),
    productionYear: ageRelease,
    genre: mainGenre,
    listGeneres: createListGeneres(mainGenre,numberGeneres),
    time: createTime(),
    age: createAge(),
    releaseDate: `${createReleaseDate()} ${ageRelease}`,
    country: createContry(),
    director: createDirector(),
    writers: createArrayName(),
    actors: createArrayName(),
    comments: getComments(),
  };

};
