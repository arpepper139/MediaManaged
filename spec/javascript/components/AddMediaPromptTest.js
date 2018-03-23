import AddMediaPrompt from '../../../app/javascript/components/homePage/AddMediaPrompt';

describe('AddMediaPrompt', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<AddMediaPrompt />);
  });

  it('should render an h1 prompting the user to add media', () => {
    expect(wrapper.find('h1.no-media-greeting')).toHaveText('Create your personal video collection!')
  });

  it('should have two divs wrapping the Link button', () => {
    expect(wrapper.find('div.no-media-landing')).toBePresent();
    expect(wrapper.find('div.prompt-to-add')).toBePresent();
  });

  it('should have a react router Link to the add media page containing a button', () => {
    expect(wrapper.find('Link')).toHaveProp('to', '/media/new');
    expect(wrapper.find('button.add-media')).toHaveText('Add Media');
  });
});
