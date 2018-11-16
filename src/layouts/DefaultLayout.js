import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import RootLayout from './RootLayout'
import Hero from '../components/Hero'
import Nav from '../components/Nav'

const DefaultLayout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query DefaultLayoutTitleQuery {
        site {
          siteMetadata {
            title
            mainNav {
              label
              path
            }
          }
        }
      }
    `}
    render={data => {
      const title = data.site.siteMetadata.title
      const nav = data.site.siteMetadata.mainNav
      return (
        <RootLayout>
          <Hero isCentered>
            <div className="block is-transparent has-centered-content">
              <h1 className="title is-5">{title}</h1>
              {children}
              <Nav items={nav} />
            </div>
          </Hero>
        </RootLayout>
      )
    }}
  />
)

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DefaultLayout
