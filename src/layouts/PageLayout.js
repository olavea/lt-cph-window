import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import RootLayout from './RootLayout'
import Hero from '../components/Hero'
import Nav from '../components/Nav'

const PageLayout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query PageLayoutTitleQuery {
        site {
          siteMetadata {
            title
            pageNav {
              label
              path
            }
          }
        }
      }
    `}
    render={data => {
      const nav = data.site.siteMetadata.pageNav
      return (
        <RootLayout>
          <Hero>
            <Nav items={nav} />
            {children}
          </Hero>
        </RootLayout>
      )
    }}
  />
)

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageLayout
