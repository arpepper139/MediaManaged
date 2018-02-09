import React, { Component } from 'react'
import RatingInput from '../components/RatingInput'

class NewOwnershipForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: '',
      ratings: [1,2,3,4,5]
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    let fieldName = event.target.name
    let input = event.target.value
    this.setState({ [fieldName]: input })
  }

  handleSubmit(event) {
    event.preventDefault()
    let type = this.props.type
    let ownership_field = `${type}_ownership`
    let media_field = `${type}_id`

    let formPayload = {
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
        this.props.clearPage(event)
      })
      .catch(error => {
        console.error(`Error in fetch: ${error.message}`)
      });
  }

  render() {
    return(
      <div>
        <p>{this.props.name}</p>
        <form>
          <RatingInput
            label='Rating'
            name='rating'
            value={this.state.rating}
            ratings={this.state.ratings}
            handleChange={this.handleChange}
          />
          <button className='submit' onClick={ this.handleSubmit }>Add</button>
        </form>
      </div>
    )
  }
}

export default NewOwnershipForm
