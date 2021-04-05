const NUMBER_OFFERS = 5;
const NUMBER_RATING = 10;
const YEAR_START = 1900;
const YEAR_END = 2021;
const MAX_HOUR = 3;
const MAX_MINUTES = 60;

const getRandom = (min, max) => {

  return Math.floor(Math.random() * (max - min + 1)) + min;

};

const getRandomRating = (min, max) => {

  return ((Math.random() * (max - min + 1)) + min).toFixed(1);

};


const getValues = (arr) => {

  return arr[getRandom(0, arr.length - 1)];

};

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
  const genres = ['Cartoon','Comedy','Drama','Western','Musical'];

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

const createEmotion = () => {
  const emotions = [
    './images/emoji/angry.png',
    './images/emoji/puke.png',
    './images/emoji/sleeping.png',
    './images/emoji/smile.png',
  ];

  return getValues(emotions);

};

const createData = () => {
  const lateDate = new Date();
  const dates = [lateDate,'2 days ago','Today'];
  return getValues(dates);
};

const createAuthor = () => {
  const authors = ['Tim Macoveev', 'John Doe', 'Dan Duryea'];

  return getValues(authors);

};

const createMessage = () => {
  const messages = [
    'Interesting setting and a good cast',
    'Booooooooooring',
    'Very very old. Meh',
    'Almost two hours? Seriously?',
  ];

  return getValues(messages);

};

export const generateTask = () => {

  return {
    movieTitle: createMovieTitle(),
    poster: createPoster(),
    description: createDescription(),
    rating: getRandomRating(0, NUMBER_RATING),
    productionYear: getRandom(YEAR_START, YEAR_END),
    genre: createGenre(),
    time: createTime(),
    comment: {
      emotion: createEmotion(),
      date: createData(),
      author: createAuthor(),
      message: createMessage(),
    },
  };

};
