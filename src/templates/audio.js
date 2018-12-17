import React from 'react'
import PlayerControls from '../components/PlayerControls'
import DefaultLayout from '../layouts/DefaultLayout'
import Img from 'gatsby-image'

export default props => {
  const audioImage = props.data.audioImage
  return (
    <DefaultLayout {...props}>
      <PlayerControls {...props} />
      <div className="background">
        <Img sizes={audioImage.childImageSharp.sizes} />
      </div>
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
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        sizes(maxWidth: 1024) {
          ...GatsbyImageSharpSizes
        }
      }
    }
  }
`
