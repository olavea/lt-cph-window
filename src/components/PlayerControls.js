import React, { Component } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'

const defaultState = {
  input: '',
  isDisabled: true,
}

class PlayerControls extends Component {
  state = {
    ...defaultState,
    input: this.props.selectedKey || defaultState.input,
  }
  inputElement = React.createRef()
  buttonElement = React.createRef()

  componentDidMount() {
    this.setState({
      isDisabled: this.props.isDisabled,
    })
  }

  componentDidUpdate() {
    if (this.isEmptyInput() && !this.isDisabled()) {
      this.focusOnInput()
    } else if (this.isPlaying()) {
      this.focusOnButton()
    }
  }

  onSubmit = event => {
    event.preventDefault()
    const { input } = this.state
    const { play, pause, selectedKey } = this.props

    if (this.isPlaying() && input === selectedKey) {
      pause()
    } else if (this.isValidInput(input)) {
      play(input)
    } else {
      this.focusOnInput()
    }
  }

  onChange = event => {
    this.setState({
      input: event.target.value,
    })
  }

  focusOnInput = () => {
    this.inputElement.current.focus()
    this.inputElement.current.select()
  }

  focusOnButton = () => {
    this.buttonElement.current.focus()
  }

  isValidInput = () => {
    const { input } = this.state
    const { isValidAudioFileKey } = this.props

    return isValidAudioFileKey(input)
  }

  isPlaying = () => {
    const { isPlaying } = this.props
    return isPlaying()
  }

  isEmptyInput = () => {
    return this.state.input === ''
  }

  isDisabled = () => {
    return this.state.isDisabled
  }

  render() {
    return (
      <form
        style={{ padding: '2em', borderRadius: '5px' }}
        className="has-background-white"
        onSubmit={this.onSubmit}
      >
        <div className="field is-grouped">
          <div className="control">
            <input
              className={classNames(
                'input is-large is-narrow has-text-centered',
                {
                  'is-disabled': this.isPlaying(),
                }
              )}
              ref={this.inputElement}
              pattern="[0-9]*"
              type="text"
              disabled={this.isDisabled() || this.isPlaying()}
              value={this.state.input}
              onChange={this.onChange}
            />
          </div>

          <div className="control">
            <button
              className={classNames('button is-large', {
                'is-static': !this.isValidInput(),
              })}
              ref={this.buttonElement}
              type="submit"
              disabled={this.isDisabled()}
            >
              <FontAwesomeIcon icon={this.isPlaying() ? faStop : faPlay} />
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default PlayerControls
