import React from 'react'

const Hero = ({ children }) => (
  <div className="hero is-fullheight is-light">
    <div className="hero-body">
      <div className="container center-content">{children}</div>
    </div>
  </div>
)

export default Hero
