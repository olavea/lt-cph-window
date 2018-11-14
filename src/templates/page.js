import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../layouts/PageLayout'

export default props => {
  const page = props.data.markdownRemark
  return (
    <Layout {...props}>
      <div className="content">
        <h1>{page.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.html }} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
