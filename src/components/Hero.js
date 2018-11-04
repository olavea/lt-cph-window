import React from 'react'
import classNames from 'classnames'

const Hero = ({ isCentered, children }) => (
  <div className="hero is-fullheight">
    <div className="hero-body">
      <div
        className={classNames('container', {
          'has-centered-content': isCentered,
        })}
      >
        {children}
      </div>
    </div>
  </div>
)

export default Hero
