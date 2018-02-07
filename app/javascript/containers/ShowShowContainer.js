import React, { Component } from 'react'

import ShowShowTile from '../components/ShowShowTile'

class ShowShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: {}
    }
  }

  componentDidMount() {
    let id = this.props.params.id
    fetch(`/api/v1/shows/${id}.json`)
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
        this.setState({ show: body.show })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let showTile;

    if (Object.keys(this.state.show).length !== 0) {
      showTile =
        <ShowShowTile
          data={ this.state.show }
        />
    }

    return(
      <div className="showpage">
        {showTile}
      </div>
    )
  }
}

export default ShowShowContainer
