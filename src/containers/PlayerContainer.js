import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `StaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.app/gatsby-image
 * - `StaticQuery`: https://gatsby.app/staticquery
 */

const PlayerContainer = ({ Player }) => (
  <StaticQuery
    query={graphql`
      query {
        audioTracks: allFile(filter: { sourceInstanceName: { eq: "audio" } }) {
          edges {
            node {
              name
              publicURL
            }
          }
        }
      }
    `}
    render={({ audioTracks }) => (
      <Player
        tracks={audioTracks.edges.map(edge => ({
          name: edge.node.name,
          src: edge.node.publicURL,
        }))}
      />
    )}
  />
)
export default PlayerContainer
