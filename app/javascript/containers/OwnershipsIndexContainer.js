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
              <div className="col small-12 medium-4 columns"><img src="https://images-na.ssl-images-amazon.com/images/M/MV5BMTg2MzI1MTg3OF5BMl5BanBnXkFtZTgwNTU3NDA2MTI@._V1_SX300.jpg"></img></div>
              <div className="col small-12 medium-4 columns"><img src="https://images-na.ssl-images-amazon.com/images/M/MV5BMTg2MzI1MTg3OF5BMl5BanBnXkFtZTgwNTU3NDA2MTI@._V1_SX300.jpg"></img></div>
              <div className="col small-12 medium-4 columns"><img src="https://images-na.ssl-images-amazon.com/images/M/MV5BMTg2MzI1MTg3OF5BMl5BanBnXkFtZTgwNTU3NDA2MTI@._V1_SX300.jpg"></img></div>
            </div>
            <div className="row">
              <div className="col small-12 medium-4 columns"><img src="https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg"></img></div>
              <div className="col small-12 medium-4 columns"><img src="https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg"></img></div>
              <div className="col small-12 medium-4 columns"><img src="https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg"></img></div>
            </div>
            <div className="row preview-footer">
              <div className="col small-12 large-4 large-offset-8 columns">
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
              <div className="col small-12 medium-4 columns"><img src="https://images-na.ssl-images-amazon.com/images/M/MV5BOTA4MTE3MTQwMF5BMl5BanBnXkFtZTgwNzk4MTg4MTI@._V1_SX300.jpg"></img></div>
              <div className="col small-12 medium-4 columns"><img src="https://images-na.ssl-images-amazon.com/images/M/MV5BOTA4MTE3MTQwMF5BMl5BanBnXkFtZTgwNzk4MTg4MTI@._V1_SX300.jpg"></img></div>
              <div className="col small-12 medium-4 columns"><img src="https://images-na.ssl-images-amazon.com/images/M/MV5BOTA4MTE3MTQwMF5BMl5BanBnXkFtZTgwNzk4MTg4MTI@._V1_SX300.jpg"></img></div>
            </div>
            <div className="row">
              <div className="col small-12 medium-4 columns"><img src="https://images-na.ssl-images-amazon.com/images/M/MV5BMjE3NTQ1NDg1Ml5BMl5BanBnXkFtZTgwNzY2NDA0MjI@._V1_SX300.jpg"></img></div>
              <div className="col small-12 medium-4 columns"><img src="https://images-na.ssl-images-amazon.com/images/M/MV5BMjE3NTQ1NDg1Ml5BMl5BanBnXkFtZTgwNzY2NDA0MjI@._V1_SX300.jpg"></img></div>
              <div className="col small-12 medium-4 columns"><img src="https://images-na.ssl-images-amazon.com/images/M/MV5BMjE3NTQ1NDg1Ml5BMl5BanBnXkFtZTgwNzY2NDA0MjI@._V1_SX300.jpg"></img></div>
            </div>
            <div className="row preview-footer">
              <div className="col small-12 large-4 large-offset-8 columns">
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
