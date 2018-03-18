import genreOptions from '../constants/GenreOptions';
import typeOptions from '../constants/TypeOptions';
import ratingOptions from '../constants/RatingOptions';

const sortBarOptions = [
  {
    key: '1',
    field: 'Type',
    options: typeOptions
  },
  {
    key: '2',
    field: 'Genre',
    options: genreOptions
  },
  {
    key: '3',
    field: 'Rating',
    options: ratingOptions
  }
];

export default sortBarOptions;
