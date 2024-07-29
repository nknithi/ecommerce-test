// Import Statements
import React from 'react'
import './Footer.css'; // Importing custom CSS for Footer styling

const Footer = () => {
    return (
        <div>

            {/* Footer section */}
            <footer className="container-fluid  text-center pb-1 bg-secondary-subtle ">

                {/* Footer row with flexbox layout */}
                <div className="row d-flex 
    justify-content-between
     flex-wrap">

                    {/* Column for Women */}
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                        <ul className="nav flex-column">
                            <li className="fw-bold nav-item">
                                <a href="#"
                                    className="nav-link text-dark footer-menu-item">Women
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#"
                                    className="nav-link text-muted  footer-menu-item">Dresses
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#"
                                    className="nav-link text-muted footer-menu-item">Pants
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#"
                                    className="nav-link text-muted footer-menu-item">Skirts
                                </a>
                            </li>
                        </ul>
                    </div>


                    {/* Column for Men */}
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                        <ul className="nav flex-column">
                            <li className="fw-bold nav-item text-dark">
                                <a href="#"
                                    className="nav-link text-dark footer-menu-item">Men
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#"
                                    className="nav-link text-muted footer-menu-item">Shirts
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#"
                                    className="nav-link text-muted footer-menu-item">Pants
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#"
                                    className="nav-link text-muted footer-menu-item">Jackets
                                </a>
                            </li>

                        </ul>
                    </div>


                    {/* Column for Kids */}
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                        <ul className="nav flex-column">
                            <li className="fw-bold nav-item">
                                <a href="#"
                                    className="nav-link text-dark footer-menu-item">Kids
                                </a>
                            </li>

                        </ul>
                    </div>

                    {/* Column for Links */}
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                        <ul className="nav flex-column">
                            <li className="fw-bold nav-item">
                                <a href="#"
                                    className="nav-link text-dark footer-menu-item">Links
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#"
                                    className="nav-link text-muted footer-menu-item">Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#"
                                    className="nav-link text-muted footer-menu-item">Login
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#"
                                    className="nav-link text-muted footer-menu-item">Contact
                                </a>
                            </li>

                        </ul>
                    </div>




                </div>


                {/* Horizontal line separator */}
                <hr />

                {/* Copyright statement */}
                <p className="fw-bold">Copyright <span>&#169</span>Petals & Threads 2023-2024</p>
            </footer>
        </div>
    )
}

export default Footer