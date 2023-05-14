import React from 'react'
// import "../stylesheets/navbar.css"
import { Link,useLocation,useNavigate } from 'react-router-dom'

const Navbar = () => {
    let location = useLocation();
  return (
    <div>
        <nav>
            <ul className='nav'>
            <Link
                className="nav-link"
                aria-current="page"
                to="/general"
              >
                <li className={`nav-item ${
                  location.pathname === "/general" ? "active" : ""
                }`}>
                General
                </li>
              </Link>
              <Link
                className="nav-link"
                aria-current="page"
                to="/"
              >
                <li className={`nav-item ${
                  location.pathname === "/" ? "active" : ""
                }`}>
                Users
                </li>
              </Link>
              <Link
                className="nav-link"
                aria-current="page"
                to="/plan"
              >
                <li className={`nav-item ${
                  location.pathname === "/plan" ? "active" : ""
                }`}>
                Plan
                </li>
              </Link>
            
              <Link
                className="nav-link"
                aria-current="page"
                to="/billing"
              >
                <li className={`nav-item ${
                  location.pathname === "/billing" ? "active" : ""
                }`}>
                Billing
                </li>
              </Link>
              <Link
                className="nav-link"
                aria-current="page"
                to="/integrations"
              >
                <li className={`nav-item ${
                  location.pathname === "/integrations" ? "active" : ""
                }`}>
                Integrations
                </li>
              </Link>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar