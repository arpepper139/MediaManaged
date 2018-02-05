import React, { Component } from 'react'

import MediaPreview from '../components/MediaPreview'

class MediaIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  
  render() {
    return(
      <div className="homepage">
        <div className="main-col small-12 large-12 columns">
          <div>
            <MediaPreview
              id={1}
              key={1}
              poster="https://images-na.ssl-images-amazon.com/images/M/MV5BMTg2MzI1MTg3OF5BMl5BanBnXkFtZTgwNTU3NDA2MTI@._V1_SX300.jpg"
              type="movie"
            />
            <MediaPreview
              id={2}
              key={2}
              poster="https://images-na.ssl-images-amazon.com/images/M/MV5BMTg2MzI1MTg3OF5BMl5BanBnXkFtZTgwNTU3NDA2MTI@._V1_SX300.jpg"
              type="movie"
            />
            <MediaPreview
              id={3}
              key={3}
              poster="https://images-na.ssl-images-amazon.com/images/M/MV5BMTg2MzI1MTg3OF5BMl5BanBnXkFtZTgwNTU3NDA2MTI@._V1_SX300.jpg"
              type="movie"
            />
            <MediaPreview
              id={1}
              key={4}
              poster="https://images-na.ssl-images-amazon.com/images/M/MV5BOTA4MTE3MTQwMF5BMl5BanBnXkFtZTgwNzk4MTg4MTI@._V1_SX300.jpg"
              type="show"
            />
            <MediaPreview
              id={2}
              key={5}
              poster="https://images-na.ssl-images-amazon.com/images/M/MV5BOTA4MTE3MTQwMF5BMl5BanBnXkFtZTgwNzk4MTg4MTI@._V1_SX300.jpg"
              type="show"
            />
            <MediaPreview
              id={3}
              key={6}
              poster="https://images-na.ssl-images-amazon.com/images/M/MV5BOTA4MTE3MTQwMF5BMl5BanBnXkFtZTgwNzk4MTg4MTI@._V1_SX300.jpg"
              type="show"
            />
          </div>
          <div>
            <MediaPreview
              id={1}
              key={1}
              poster="https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg"
              type="movie"
            />
            <MediaPreview
              id={2}
              key={2}
              poster="https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg"
              type="movie"
            />
            <MediaPreview
              id={3}
              key={3}
              poster="https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg"
              type="movie"
            />
            <MediaPreview
              id={1}
              key={4}
              poster="https://images-na.ssl-images-amazon.com/images/M/MV5BMjE3NTQ1NDg1Ml5BMl5BanBnXkFtZTgwNzY2NDA0MjI@._V1_SX300.jpg"
              type="show"
            />
            <MediaPreview
              id={2}
              key={5}
              poster="https://images-na.ssl-images-amazon.com/images/M/MV5BMjE3NTQ1NDg1Ml5BMl5BanBnXkFtZTgwNzY2NDA0MjI@._V1_SX300.jpg"
              type="show"
            />
            <MediaPreview
              id={3}
              key={6}
              poster="https://images-na.ssl-images-amazon.com/images/M/MV5BMjE3NTQ1NDg1Ml5BMl5BanBnXkFtZTgwNzY2NDA0MjI@._V1_SX300.jpg"
              type="show"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default MediaIndexContainer
