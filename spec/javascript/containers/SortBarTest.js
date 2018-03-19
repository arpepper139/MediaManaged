import SortBar from '../../../app/javascript/containers/SortBar';
import sortBarOptions from '../../../app/javascript/constants/SortBarOptions';
import TypeOptions from '../../../app/javascript/constants/TypeOptions';
import GenreOptions from '../../../app/javascript/constants/GenreOptions';
import RatingOptions from '../../../app/javascript/constants/RatingOptions';

describe('SortBar', () => {
  let wrapper,
  sortMediaSpy;

  beforeEach(() => {
    sortMediaSpy = jasmine.createSpy('pageFlip spy');
    spyOn(SortBar.prototype, 'toggleHidden').and.callThrough();

    wrapper = mount(
      <SortBar
        sortMedia={sortMediaSpy}
        sortMessage={'No matches found'}
      />
    );
  });

  it('should render a wrapping div', () => {
    expect(wrapper.find('div.sort-div')).toBePresent();
  });

  it('should render a UL with three SortDropdowns: Type, Rating, and Genre', () => {
    expect(wrapper.find('ul.sort-bar')).toBePresent();
    expect(wrapper.find('ul.sort-bar').find('SortDropdown').length).toBe(3);

    expect(wrapper.find('SortDropdown').at(0).props()).toEqual({
      sortField: 'Type',
      options: TypeOptions,
      sortMedia: jasmine.any(Function),
      hidden: true,
      toggleHidden: jasmine.any(Function)
    });

    expect(wrapper.find('SortDropdown').at(1).props()).toEqual({
      sortField: 'Genre',
      options: GenreOptions,
      sortMedia: jasmine.any(Function),
      hidden: true,
      toggleHidden: jasmine.any(Function)
    });

    expect(wrapper.find('SortDropdown').at(2).props()).toEqual({
      sortField: 'Rating',
      options: RatingOptions,
      sortMedia: jasmine.any(Function),
      hidden: true,
      toggleHidden: jasmine.any(Function)
    });
  });

  it('should trigger the toggle hidden function when the SortDropdown is clicked', () => {
    wrapper.find('SortDropdown').at(0).simulate('click');
    expect(SortBar.prototype.toggleHidden).toHaveBeenCalled();
    expect(wrapper.find('SortDropdown').at(0)).toHaveProp('hidden', false)
  });

  it('should render a p tag with the sort message', () => {
    expect(wrapper.find('p.sort-result-message')).toHaveText('No matches found');
  });
});
