import React from 'react'
import PlayerControls from '../components/PlayerControls'
import DefaultLayout from '../layouts/DefaultLayout'

export default props => {
  const audioImage = props.data.audioImage
  const style = { backgroundImage: `url('${audioImage.publicURL}')` }
  return (
    <DefaultLayout {...props}>
      <PlayerControls {...props} />
      <div className="background" style={style} />
    </DefaultLayout>
  )
}

export const pageQuery = graphql`
  query ImageByKey($selectedKey: String!) {
    audioImage: file(
      fields: { key: { eq: $selectedKey } }
      sourceInstanceName: { eq: "image" }
    ) {
      publicURL
    }
  }
`
