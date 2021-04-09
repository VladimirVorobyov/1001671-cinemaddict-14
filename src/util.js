import dayjs from 'dayjs';

export const getRandom = (min, max) => {

  return Math.floor(Math.random() * (max - min + 1)) + min;

};

export const getRandomRating = (min, max) => {

  return ((Math.random() * (max - min)) + min).toFixed(1);

};


export const getValues = (arr) => {

  return arr[getRandom(0, arr.length - 1)];

};

export const createData = () => {
  const maxDaysGap = 7;
  const daysGap = getRandom(-maxDaysGap, 0);

  return dayjs().add(daysGap, 'day').format('DD/MM/YYYY');

};

export const getRandomArray = (array) => {
  const arrayList = [];
  array.forEach((element) => {
    if (Math.random() > 0.5) {
      return;
    }
    arrayList.push(element);
  });
  return arrayList;
};
