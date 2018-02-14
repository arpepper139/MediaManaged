import React, { Component } from 'react'

class GenreSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genreOptions: []
    }
  }

  componentDidMount() {
    fetch('/api/v1/genres.json', { credentials: 'same-origin' })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => {
      return response.json()
    })
    .then(body => {
      this.setState({ genreOptions: body.genres })
    })
    .catch(error => {
      console.error(`Error in fetch: ${error.message}`)
    });
  }

  render() {
    let checked
    let genres = this.props.genres
    let genreChoices = this.state.genreOptions.map((genre) => {
      const checked = genres.includes(genre.name) ? true : false

      return(
        <span key={ genre.id } className="genre">{ genre.name }
          <input
            type="checkbox"
            value={ genre.name }
            name={ genre.name }
            defaultChecked={checked}
            onClick={() => this.props.handleChange(genre.name)}
          />
        </span>
      )
    })

    return(
      <div>
        <label>Genres</label>
        <div>
          { genreChoices }
        </div>
      </div>
    )
  }
}


export default GenreSelect
