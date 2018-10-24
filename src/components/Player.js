import React, { Component } from 'react'

const style = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '3rem',
    lineHight: 1,
  },
  form: {
    display: 'flex',
    margin: 0,
  },
  input: {
    display: 'block',
    width: '4em',
    flexGrow: 0,
    marginRight: '0.25em',
    textAlign: 'center',
  },
  button: {
    display: 'block',
    fontSize: '1em',
    width: '2em',
    height: '2em',
  },
}

const isTrackNameValid = (name, tracks) => {
  return tracks.find(track => track.name === name)
}

const defaultState = {
  selected: null,
  input: '',
}

class Player extends Component {
  state = defaultState
  buttonElement = React.createRef()
  inputElement = React.createRef()
  audioElements = {}
  audioIds = []

  componentDidMount() {
    this.focusOnInput()
  }

  onSubmit = event => {
    event.preventDefault()
    const { input, selected } = this.state

    if (this.isPlaying() && input === selected) {
      this.pause()
    } else {
      this.play(input)
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

  isTrackNameValid = () => {
    const { input } = this.state
    const { tracks = [] } = this.props

    return isTrackNameValid(input, tracks)
  }

  buttonIcon = () => {
    const { input, selected } = this.state
    const playIcon = '&#9658'
    const stopIcon = '&#9724'

    return this.isPlaying() && input === selected ? stopIcon : playIcon
  }

  createAudioRef = (id, element) => {
    this.audioElements[id] = element
  }

  onAudioEvent = (id, event) => {
    switch (event.type) {
      case 'playing':
      case 'play':
        this.setState({
          selected: id,
          input: id,
          playing: true,
        })
        this.focusOnButton()
        break
      case 'pause':
        this.setState({
          selected: id,
          input: id,
          playing: false,
        })
        this.focusOnInput()
        break
      case 'ended':
        this.setState({
          selected: defaultState.selected,
          input: defaultState.input,
          playing: false,
        })
        this.focusOnInput()
        break
      default:
        break
    }
  }

  isPlaying = () => {
    const { playing } = this.state
    return playing
  }

  pause = () => {
    Object.keys(this.audioElements).forEach(id =>
      this.audioElements[id].pause()
    )
  }

  play = id => {
    const { selected } = this.state

    this.pause()

    if (selected !== id) {
      this.audioElements[id].currentTime = 0
    }
    this.audioElements[id].play()
  }

  render() {
    const { tracks = [] } = this.props
    return (
      <div style={style.root}>
        {tracks.map(track => (
          <audio
            key={track.name}
            ref={element => this.createAudioRef(track.name, element)}
            src={track.src}
            onPlay={event => this.onAudioEvent(track.name, event)}
            onPlaying={event => this.onAudioEvent(track.name, event)}
            onPause={event => this.onAudioEvent(track.name, event)}
            onEnded={event => this.onAudioEvent(track.name, event)}
          />
        ))}
        <form style={style.form} onSubmit={this.onSubmit}>
          <input
            style={style.input}
            ref={this.inputElement}
            pattern="[0-9]*"
            type="text"
            value={this.state.input}
            onChange={this.onChange}
          />
          <button
            style={style.button}
            ref={this.buttonElement}
            disabled={!this.isTrackNameValid()}
            type="submit"
            dangerouslySetInnerHTML={{
              __html: this.buttonIcon(),
            }}
          />
        </form>
      </div>
    )
  }
}

export default Player
