import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import RootLayout from './RootLayout'
import Hero from '../components/Hero'

const DefaultLayout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query DefaultLayoutTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <RootLayout>
        <Hero title={data.site.siteMetadata.title}>{children}</Hero>
      </RootLayout>
    )}
  />
)

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DefaultLayout
