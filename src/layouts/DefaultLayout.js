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
            <img
              src="https://wpuploads.appadvice.com/wp-content/uploads/2011/06/Screen-shot-2011-06-14-at-8.06.59-PM-300x224.png"
              alt="studio5dekor, studio 5 dekor, Susanne Schwarz Hoset"
            />
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
