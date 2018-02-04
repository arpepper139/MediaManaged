import React, { Component } from 'react'
import { Link } from 'react-router'

class OwnershipsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return(
      <div className="homepage">

        <div className="col small-12 large-6 columns">
          <div className="preview">
            <h1 className="preview-header">Movies</h1>
            <div className="row">
              <div className="col small-12 medium-4 columns">Movie Tile 1</div>
              <div className="col small-12 medium-4 columns">Movie Tile 2</div>
              <div className="col small-12 medium-4 columns">Movie Tile 3</div>
            </div>
            <div className="row">
              <div className="col small-12 medium-4 columns">Movie Tile 4</div>
              <div className="col small-12 medium-4 columns">Movie Tile 5</div>
              <div className="col small-12 medium-4 columns">
                <Link to="/movies">
                  <button className="index-button">All Movies</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-col small-12 large-6 columns">
          <div className="preview">
            <h1 className="preview-header">Shows</h1>
            <div className="row">
              <div className="col small-12 medium-4 columns">Show Tile 1</div>
              <div className="col small-12 medium-4 columns">Show Tile 2</div>
              <div className="col small-12 medium-4 columns">Show Tile 3</div>
            </div>
            <div className="row">
              <div className="col small-12 medium-4 columns">Show Tile 4</div>
              <div className="col small-12 medium-4 columns">Show Tile 5</div>
              <div className="col small-12 medium-4 columns">
                <Link to="/shows">
                  <button className="index-button">All Shows</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default OwnershipsIndexContainer
