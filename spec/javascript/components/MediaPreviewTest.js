import MediaPreview from '../../../app/javascript/components/MediaPreview'

describe('Media Preview', () => {
  let noPosterShowWrapper, posterMovieWrapper

  beforeEach(() => {
    posterMovieWrapper = mount(
      <MediaPreview
        id={1}
        name="Star Wars"
        poster="https://images-na.ssl-images-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
        type="movie"
      />
    )

    noPosterShowWrapper = mount(
      <MediaPreview
        id={1}
        name="Breaking Bad"
        poster={null}
        type="show"
      />
    )
  })

  it('should link to the appropriate page', () => {
    expect(noPosterShowWrapper.find('Link')).toHaveProp('to', '/shows/1')
    expect(posterMovieWrapper.find('Link')).toHaveProp('to', '/movies/1')
  })

  it('should render an image if a poster is provided, and the media object name alt otherwise', () => {
    expect(noPosterShowWrapper.find('div.preview-tile')).toBePresent()
    expect(posterMovieWrapper.find('div.preview-tile')).toBePresent()
  })
})
