/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { createFilePath } = require('gatsby-source-filesystem')

// Takes the fileName and returns the number at the beginning
const keyFromFileName = fileName => {
  const regex = /\d+/
  const match = fileName.match(regex)
  return match ? match[0] : fileName
}

// This happens when a node is created by the source plugins.
// The gatsby-source-filesystem adds image, audio and markdown nodes in this project.
// In a addition, transform plugins can add transformed nodes.
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
  } else if (
    node.sourceInstanceName === `audio` ||
    node.sourceInstanceName === `image`
  ) {
    // Add the key (ie. 1, 12, 5 to audio and image nodes)
    createNodeField({
      name: `key`,
      node: node,
      value: keyFromFileName(node.relativePath),
    })
  }
}

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  // ask for all audio file nodes and all transformed markdown file nodes
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
              publicURL
              fields {
                key
              }
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

  const audioEdges = audioFilesQuery ? audioFilesQuery.edges : []

  // Transform edges into an array of audio objects.
  const allAudioFiles = audioEdges.map(edge => ({
    key: edge.node.fields.key,
    src: edge.node.publicURL,
  }))

  // Create a home page and add the array of audio objects to its context.
  createPage({
    path: `/`,
    component: require.resolve('./src/templates/home.js'),
    context: { allAudioFiles },
  })

  // Create a page per audioFile
  allAudioFiles.map(audioFile => {
    createPage({
      path: `${audioFile.key}`,
      component: require.resolve('./src/templates/audio.js'),
      context: { allAudioFiles, selectedKey: audioFile.key },
    })
  })

  // Loop through all the markdown nodes.
  // Create a page for each and add the slug to its context.
  allMarkdownQuery.edges.map(edge => {
    createPage({
      path: edge.node.fields.slug,
      component: require.resolve('./src/templates/page.js'),
      context: { slug: edge.node.fields.slug, allAudioFiles },
    })
  })
}
