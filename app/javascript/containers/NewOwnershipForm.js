import React, { Component } from 'react'
import { Link } from 'react-router'
import RatingInput from '../components/RatingInput'

class NewOwnershipForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleStarSelection = this.handleStarSelection.bind(this)
  }

  handleStarSelection(rating) {
    this.setState({ rating })
  }

  handleSubmit(event) {
    event.preventDefault()
    const type = this.props.type
    const ownership_field = `${type}_ownership`
    const media_field = `${type}_id`

    const formPayload = {
      [ownership_field]: { [media_field]: this.props.id, user_rating: this.state.rating }
    }
    fetch(`/api/v1/${type}_ownerships`, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(formPayload),
      headers: {  'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
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
        this.props.passMessage(body.message)
        this.props.clearPage()
      })
      .catch(error => {
        console.error(`Error in fetch: ${error.message}`)
      });
  }

  render() {
    return(
      <form className="add-ownership">
        <Link to={`${this.props.type}s/${this.props.id}`}>
          <p className="media-title">{this.props.name}</p>
        </Link>
        <div className="found-media-options">
          <RatingInput
            name='rating'
            value={this.state.rating}
            handleClick={this.handleStarSelection}
          />
          <button className='submit-ownership' onClick={ this.handleSubmit }>Add</button>
        </div>
      </form>
    )
  }
}

export default NewOwnershipForm
