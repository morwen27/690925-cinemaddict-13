import {getRandomInteger} from '../utils/common.js';
import {generateRandomValue} from '../utils/common.js';
import dayjs from "dayjs";


const generateAuthor = [
  `John`, `Bran`, `Dany`, `Kuku`
];

const generateEmoji = [
  `smile`, `sleeping`, `puke`, `angry`
];

const generateDate = () => {
  const maxDaysGap = 365 * 10;
  const daysGap = getRandomInteger(-maxDaysGap, 0);

  return dayjs().add(daysGap, `day`).toDate();
};

export const generateComment = () => {
  return {
    message: `this is a comment`,
    emoji: generateRandomValue(generateEmoji),
    author: generateRandomValue(generateAuthor),
    date: generateDate(),
  };
};
