/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const keyFromFileName = fileName => {
  const regex = /\d+/
  const match = fileName.match(regex)
  return match ? match[0] : fileName
}

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: { audioFilesQuery },
  } = await graphql(
    `
      query {
        audioFilesQuery: allFile(
          filter: { sourceInstanceName: { eq: "audio" } }
        ) {
          edges {
            node {
              name
              publicURL
            }
          }
        }
      }
    `
  )

  const allAudioFiles = audioFilesQuery.edges.map(edge => ({
    key: keyFromFileName(edge.node.name),
    src: edge.node.publicURL,
  }))

  // Create a page that lists all Pokémon.
  createPage({
    path: `/`,
    component: require.resolve('./src/templates/player.js'),
    context: { allAudioFiles },
  })
}
