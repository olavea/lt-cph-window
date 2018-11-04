import React from 'react'
import { Link } from 'gatsby'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'

const Nav = ({ items }) => (
  <nav className="nav">
    {items.map((item, key) => (
      <Link key={key} className="nav-item" alt={item.label} to={item.path}>
        {item.path === '/' ? (
          <FontAwesomeIcon icon={faLongArrowAltLeft} />
        ) : (
          item.label
        )}
      </Link>
    ))}
  </nav>
)

export default Nav
