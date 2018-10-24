import React from 'react'

import Layout from '../layouts/layout'
import PlayerContainer from '../containers/PlayerContainer'
import Player from '../components/Player'

const IndexPage = () => (
  <Layout>
    <PlayerContainer Player={Player} />
  </Layout>
)

export default IndexPage
