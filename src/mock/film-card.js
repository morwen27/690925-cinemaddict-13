import {getRandomInteger} from './utilites.js';
import {generateRandomValue} from './utilites.js';
import {generateRandomArray} from './utilites.js';
import dayjs from "dayjs";

const titles = [
  `Made for each other`,
  `Popeye meets Sinbad`,
  `Sagebrush trail`,
  `Santa Claus conquers the Martians`,
  `The dance of life`,
  `The great flamarion`,
  `The man with the golden arm`
];

const posters = [
  `made-for-each-other.png`,
  `popeye-meets-Sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const producers = [
  `Peter Jackson`,
  `Christofer Nolan`,
  `Aneesh Chaganty`,
];

const screenwriters = [
  `Quentin Tarantino`,
  `Woody Allen`,
  `Ethan Coen`,
  `Aaron Sorkin`
];

const actors = [
  `Brad Pitt`,
  `Margot Robbie`,
  `Joaquin Phoenix`,
  `Tom Hardy`,
  `Matthew McConaughey`,
];

const countries = [
  `USA`,
  `South Korea`,
  `France`,
  `Canada`,
  `Israel`,
];

const ageRatings = [`0+`, `6+`, `12+`, `16+`, `18+`];

const descriptionTemplate = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Cras aliquet varius magna, non porta ligula feugiat eget.
Fusce tristique felis at fermentum pharetra.
Aliquam id orci ut lectus varius viverra.
Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
Sed sed nisi sed augue convallis suscipit in sed felis.
Aliquam erat volutpat.
Nunc fermentum tortor ac porta dapibus.
In rutrum ac purus sit amet tempus`;

const generateDateRelease = () => {
  const maxDaysGap = 365;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, `day`).toDate();
};

const generateDescription = () => {
  const quantitySentences = getRandomInteger(1, 5);
  const sentences = descriptionTemplate.split(`.`);
  let randomDescription = ``;

  for (let i = 0; i < quantitySentences; i++) {
    randomDescription += generateRandomValue(sentences) + `. `;
  }

  return randomDescription;
};

export const genres = [
  `comedy`,
  `drama`,
  `triller`,
  `horror`,
  `western`,
  `sci-fi`,
  `fantasy`
];

export const generateFilmCard = () => {
  const title = generateRandomValue(titles);
  const year = getRandomInteger(1895, 2020);

  return {
    title,
    originTitle: title,
    poster: `/images/posters/` + generateRandomValue(posters),
    rating: (Math.random() * 10).toFixed(1),
    producers: generateRandomArray(producers, 1),
    screenwriters: generateRandomArray(screenwriters, 3),
    actors: generateRandomArray(actors, 4),
    year,
    release: generateDateRelease(),
    duration: getRandomInteger(0, 3) + `h ` + getRandomInteger(0, 59) + `m`,
    country: generateRandomValue(countries),
    genre: generateRandomArray(genres, 3),
    description: generateDescription(),
    comments: getRandomInteger(0, 5),
    ageRating: generateRandomValue(ageRatings),
  };
};

