import {getRandomInteger} from './utilites.js';
import {generateRandomValue} from './utilites.js';
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

const country = [
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

const generateGenre = () => {
  const quantityGenres = getRandomInteger(1, 3);
  let randomGenres = [];

  for (let i = 0; i < quantityGenres; i++) {
    randomGenres.push(generateRandomValue(genres));
  }

  return randomGenres;
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
    producer: generateRandomValue(producers),
    screenwriters: generateRandomValue(screenwriters),
    actors: generateRandomValue(actors),
    year,
    release: generateDateRelease(),
    duration: getRandomInteger(0, 3) + `h ` + getRandomInteger(0, 59) + `m`,
    country: generateRandomValue(country),
    genre: generateGenre(),
    description: generateDescription(),
    comments: getRandomInteger(0, 5),
    ageRating: generateRandomValue(ageRatings),
  };
};

