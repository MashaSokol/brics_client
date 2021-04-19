import React, { Component } from 'react'
import './Footer.css';
import {
  Link
 } from "react-router-dom"


class Footer extends Component {
    render() {
        return (
          <div className="footer footer-flex-container footer-justify-center">
              <Link to='/admin' className="footer-app-name footer-self-align-center">Администрирование</Link>
          </div>
        )
    }
}

export default Footer
