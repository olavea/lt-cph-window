/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { createFilePath } = require('gatsby-source-filesystem')

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

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: { audioFilesQuery, allMarkdownQuery },
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

  // Transform edges into an array of audio objects.
  const allAudioFiles = audioFilesQuery.edges.map(edge => ({
    key: keyFromAudioFileName(edge.node.name),
    src: edge.node.publicURL,
  }))

  // Create a home page and add the array of audio objects to its context.
  createPage({
    path: `/`,
    component: require.resolve('./src/templates/player.js'),
    context: { allAudioFiles },
  })

  // Loop through all the markdown nodes.
  // Create a page for each and add the slug to its context.
  allMarkdownQuery.edges.map(edge => {
    createPage({
      path: edge.node.fields.slug,
      component: require.resolve('./src/templates/page.js'),
      context: { slug: edge.node.fields.slug },
    })
  })
}
