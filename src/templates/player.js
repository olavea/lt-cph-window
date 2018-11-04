import React from 'react'
import PlayerControls from '../components/PlayerControls'
import DefaultLayout from '../layouts/DefaultLayout'

export default props => (
  <DefaultLayout {...props}>
    <PlayerControls {...props} />
  </DefaultLayout>
)
