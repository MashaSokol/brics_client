import React, { Component } from 'react'
import './Header.css';
import {
  Link
 } from "react-router-dom"


class Header extends Component {
    render() {
        return (
          <div className="header flex-container justify-left">
              <Link to='/' className="app-name self-align-center">brics analytics</Link>
          </div>
        )
    }
}

export default Header
