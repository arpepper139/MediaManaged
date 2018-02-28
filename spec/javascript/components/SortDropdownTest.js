import SortDropdown from '../../../app/javascript/components/SortDropdown';
import TypeOptions from '../../../app/javascript/constants/TypeOptions';

describe('SortDropdown', () => {
  let hiddenWrapper,
  activeWrapper,
  toggleHiddenSpy,
  sortMediaSpy;

  beforeEach(() => {
    toggleHiddenSpy = jasmine.createSpy('toggleHidden spy');
    sortMediaSpy = jasmine.createSpy('sortMedia spy');

    hiddenWrapper = mount(
      <SortDropdown
        sortField='Type'
        options={TypeOptions}
        sortMedia={sortMediaSpy}
        hidden={true}
        toggleHidden={toggleHiddenSpy}
      />
    );

    activeWrapper = mount(
      <SortDropdown
        sortField='Type'
        options={TypeOptions}
        sortMedia={sortMediaSpy}
        hidden={false}
        toggleHidden={toggleHiddenSpy}
      />
    );
  });

  it('should return an li with the appropriate class names', () => {
    expect(hiddenWrapper.find('li.dropdown')).toBePresent();
    expect(hiddenWrapper.find('li.dropdown.dropdown-active')).toBeEmpty();

    expect(activeWrapper.find('li.dropdown.dropdown-active')).toBePresent();
  });

  it('should return a p tag indicating the sort parameter', () => {
    expect(activeWrapper.find('p.option')).toHaveText('By Type');
  });

  it('should return a div with a collection of p tags indicating the sort options', () => {
    expect(activeWrapper.find('div.dropdown-content')).toBePresent();
    expect(hiddenWrapper.find('div.dropdown-content').find('p').length).toBe(2);

    expect(hiddenWrapper.find('div.dropdown-content').find('p').at(0).props()).toEqual({
      onClick: jasmine.any(Function),
      children: 'Movie'
    });

    expect(activeWrapper.find('div.dropdown-content').find('p').at(1).props()).toEqual({
      onClick: jasmine.any(Function),
      children: 'Show'
    });
  });
});
