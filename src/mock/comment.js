import {getValues, createData} from '../utils/util.js';

const QUANTITY_GENERATING_COMMENTS = 10;

const createEmotion = () => {
  const emotions = [
    './images/emoji/angry.png',
    './images/emoji/puke.png',
    './images/emoji/sleeping.png',
    './images/emoji/smile.png',
  ];

  return getValues(emotions);

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

const createComments = () => {
  return new Array(QUANTITY_GENERATING_COMMENTS).fill().map((element,index) => {
    return {
      id: index,
      emotion: createEmotion(),
      date: createData(),
      author: createAuthor(),
      message: createMessage(),
    };
  });
};

const comments = createComments();

export default comments;
