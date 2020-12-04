import {getRandomInteger} from '../utilites.js';

const deteminateRank = () => {
  const watchedFilms = getRandomInteger(0, 100);
  let rank = ``;

  if (watchedFilms === 0) {
    rank = ``;
  } else if (watchedFilms <= 10) {
    rank = `novice`;
  } else if (watchedFilms > 10 && watchedFilms <= 20) {
    rank = `fan`;
  } else if (watchedFilms >= 21) {
    rank = `movie buff`;
  }

  return rank;
};

export const generateRank = () => {
  return {
    rank: deteminateRank(),
  };
};
