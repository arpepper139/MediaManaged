import MainPage from '../../../app/javascript/components/MainPage';
import MockMedia from '../../support/constants/MockMedia';

describe('MainPage', () => {
  let wrapper,
  pageFlipSpy,
  sortMediaSpy;

  beforeEach(() => {
    pageFlipSpy = jasmine.createSpy('pageFlip spy');
    sortMediaSpy = jasmine.createSpy('pageFlip spy');

    wrapper = mount(
      <MainPage
        media={MockMedia}
        pageFlip={pageFlipSpy}
        slicePoint1={0}
        slicePoint2={12}
        sortMedia={sortMediaSpy}
        sortMessage=''
      />
    );
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
      media: MockMedia,
      pageFlip: jasmine.any(Function),
      slicePoint1: 0,
      slicePoint2: 12
    });
  });
});
