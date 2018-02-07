import React, { Component } from 'react'

import MovieShowTile from '../components/MovieShowTile'

class MovieShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: {},
      loggedIn: null
    }
  }

  componentDidMount() {
    let id = this.props.params.id
    fetch(`/api/v1/movies/${id}.json`)
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
        this.setState({
          movie: body.movie
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let movieTile;

    if (Object.keys(this.state.movie).length !== 0) {
      movieTile =
        <MovieShowTile
          data={ this.state.movie }
        />
    }

    return(
      <div className="showpage">
        {movieTile}
      </div>
    )
  }
}

export default MovieShowContainer
