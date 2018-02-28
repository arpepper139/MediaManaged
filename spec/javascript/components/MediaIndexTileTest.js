import MediaIndexTile from '../../../app/javascript/components/MediaIndexTile';
import MockMedia from '../../support/constants/MockMedia';

describe('MediaIndexTile', () => {
  let wrapper,
  pageFlipSpy;

  beforeEach(() => {
    pageFlipSpy = jasmine.createSpy('pageFlip spy');

    wrapper = mount(
      <MediaIndexTile
        media={MockMedia}
        pageFlip={pageFlipSpy}
        slicePoint1={0}
        slicePoint2={12}
      />
    )
  });

  it('should have a forward and backwards page button', () => {
    expect(wrapper.find('PageButton').at(0).props()).toEqual({
      direction: 'left',
      pageFlip: undefined
    });

    expect(wrapper.find('PageButton').at(1).props()).toEqual({
      direction: 'right',
      pageFlip: jasmine.any(Function)
    });
  });

  it('should render twelve media previews when full', () => {
    expect(wrapper.find('MediaPreview').length).toBe(12)
  });

  it('should render two tile groups with two tile divs each', () => {
    expect(wrapper.find('div.tiles-group').length).toBe(2)
    expect(wrapper.find('div.tiles-group').at(1).find('div.tiles').length).toBe(2)
  });

  it('should render four tile divs with three previews each', () => {
    expect(wrapper.find('div.tiles').length).toBe(4)
    expect(wrapper.find('div.tiles').at(3).find('MediaPreview').length).toBe(3)
  });

  it('should have a react router Link to the add media page containing a button', () => {
    expect(wrapper.find('Link').at(12)).toHaveProp('to', '/media/new');
    expect(wrapper.find('button')).toHaveText('Add Media');
  });
});
