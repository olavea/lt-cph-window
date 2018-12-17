/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { createFilePath } = require('gatsby-source-filesystem')

// ?Ola asks: make no changes here?

const keyFromAudioFileName = fileName => {
  const regex = /\d+/
  const match = fileName.match(regex)
  return match ? match[0] : fileName
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = node.frontmatter.path || createFilePath({ node, getNode })
    const parent = getNode(node.parent)

    createNodeField({
      name: `slug`,
      node: node,
      value: slug,
    })

    createNodeField({
      name: `type`,
      node: node,
      value: parent.sourceInstanceName,
    })
  }
}
// ?Ola asks: add /*imageFilesQuery*/
// ?Ola asks: and make an actual query?
exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: { audioFilesQuery, allMarkdownQuery, /*imageFilesQuery*/ },
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
        allMarkdownQuery: allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                type
              }
            }
          }
        }
      }
    `
  )
// ?Ola asks: make no changes here?
  const audioEdges = audioFilesQuery ? audioFilesQuery.edges : []
  // Transform edges into an array of audio objects.
  const allAudioFiles = audioEdges.map(edge => ({
    key: keyFromAudioFileName(edge.node.name),
    src: edge.node.publicURL,
  }))

  // Create a home page and add the array of audio objects to its context.
// ? I will need to /*allImageFiles*/ below  to get "1-image-1-page"?
  createPage({
    path: `/`,
    component: require.resolve('./src/templates/home.js'),
    context: { allAudioFiles /*allImageFiles*/ },
  })
  // ? I will need to copy the code below  to get "1-image-1-page"?


  allAudioFiles.map(audioFile => {
    createPage({
      path: `${audioFile.key}`,
      component: require.resolve('./src/templates/home.js'),
      context: { allAudioFiles, selectedKey: audioFile.key },
    })
  })

  // Loop through all the markdown nodes.
  // Create a page for each and add the slug to its context.
  // ?Ola asks: ? I will need to make some changes here to get "1-image-1-page"?
  allMarkdownQuery.edges.map(edge => {
    createPage({
      path: edge.node.fields.slug,
      component: require.resolve('./src/templates/page.js'),
      context: { slug: edge.node.fields.slug, allAudioFiles },
    })
  })
}
