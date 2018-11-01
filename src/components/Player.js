import React, { Component } from 'react'

const defaultState = {
  playing: null,
  selectedKey: null,
}

class Player extends Component {
  state = defaultState
  audioElements = {}

  createAudioRef = (key, element) => {
    this.audioElements[key] = element
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

  play = key => {
    const { selectedKey } = this.state

    this.pause()

    if (selectedKey !== key) {
      this.audioElements[key].currentTime = 0
    }
    this.audioElements[key].play()
  }

  isValidAudioFileKey = key => {
    const { audioFiles } = this.props
    return audioFiles.find(track => track.key === key)
  }

  onAudioEvent = (key, event) => {
    switch (event.type) {
      case 'playing':
      case 'play':
        this.setState({
          selectedKey: key,
          playing: true,
        })
        break
      case 'pause':
        this.setState({
          selectedKey: key,
          playing: false,
        })
        break
      case 'ended':
        this.setState({
          selectedKey: defaultState.selectedKey,
          playing: false,
        })
        break
      default:
        break
    }
  }

  render() {
    const { audioFiles = [], children } = this.props

    return (
      <>
        {children({
          play: this.play,
          pause: this.pause,
          isValidAudioFileKey: this.isValidAudioFileKey,
          isPlaying: this.isPlaying,
          selectedKey: this.state.selectedKey,
        })}

        {audioFiles.map(audioFile => (
          <audio
            key={audioFile.key}
            ref={element => this.createAudioRef(audioFile.key, element)}
            src={audioFile.src}
            onPlay={event => this.onAudioEvent(audioFile.key, event)}
            onPlaying={event => this.onAudioEvent(audioFile.key, event)}
            onPause={event => this.onAudioEvent(audioFile.key, event)}
            onEnded={event => this.onAudioEvent(audioFile.key, event)}
          />
        ))}
      </>
    )
  }
}

export default Player
