import MainPage from '../../../app/javascript/components/MainPage';

const mockMedia = [
  {
    description: 'It is a movie',
    director: 'Director',
    id: 1,
    imdb_rating: '8.0',
    name: 'Movie',
    poster: {
      url: 'https://media-managed-development.s3.amazonaws.com/uploads/movie/poster/9/192x296_EMPT_Blank_K.jpg'
    },
    runtime: '120 min',
    studio: 'Studio',
    year: '2018'
  },
  {
    description: 'It is a show',
    end_year: '2018',
    id: 1,
    imdb_rating: '9.0',
    name: 'Show',
    poster: {
      url: 'https://media-managed-development.s3.amazonaws.com/uploads/show/poster/8/blank-poster.jpg'
    },
    start_year: '2016',
    studio: 'Studio',
    writer: 'Writer'
  }
];

describe('MainPage', () =>{
  let wrapper,
  pageFlipSpy,
  sortMediaSpy;

  beforeEach(() => {
    pageFlipSpy = jasmine.createSpy('pageFlip spy');
    sortMediaSpy = jasmine.createSpy('pageFlip spy');

    wrapper = mount(
      <MainPage
        media={mockMedia}
        pageFlip={pageFlipSpy}
        slicePoint1={0}
        slicePoint2={12}
        sortMedia={sortMediaSpy}
        sortMessage=''
      />
    )
  });

  it('should render a div with the class homepage', () => {
    expect(wrapper.find('div.homepage')).toBePresent();
  });

  it('should render the Sort Bar', () => {
    expect(wrapper.find('SortBar')).toBePresent();
    expect(wrapper.find('SortBar').props()).toEqual({
      sortMedia: jasmine.any(Function),
      sortMessage: ''
    });
  });

  it('should render the Media Index Tile', () => {
    expect(wrapper.find('MediaIndexTile')).toBePresent();
    expect(wrapper.find('MediaIndexTile').props()).toEqual({
      media: mockMedia,
      pageFlip: jasmine.any(Function),
      slicePoint1: 0,
      slicePoint2: 12
    });
  });
});
