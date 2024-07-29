import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownButton, Dropdown, Image } from 'react-bootstrap';
import { logout } from '../../actions/userActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './Header.css';




// Header component for the main navigation bar
const Header = () => {
    const { isAuthenticated, user } = useSelector(state => state.authState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Function to handle user logout
    const logoutHandler = () => {
        dispatch(logout());
        navigate('/');



    }

    return (
        <div>
            {/* Main navigation bar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary-subtle">
                <div className="container-fluid">
                    {/* Brand logo for small screens */}
                    <a className="navbar-brand d-lg-none fw-bold brand-name text-danger" href="/">Petals & threads</a>

                    {/* Navbar toggler for collapsed view */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarContent">
                        {/* Brand logo for large screens */}
                        <a className="navbar-brand d-none d-lg-block fw-bold text-danger brand-name" href="/">Petals & threads</a>

                       
                        {/* Login and cart icons */}
                        <div className="mt-2 mt-lg-0 d-flex flex-column flex-lg-row align-items-center">
                            {isAuthenticated ? (
                                <Dropdown className='d-inline'>
                                    <Dropdown.Toggle variant='default text-secondary ' id='dropdown-basic'>
                                        <figure className='avatar avatar-nav'>
                                            <Image width="50px" src={user.avatar ?? './images/default_avatar.png'} />
                                        </figure>
                                        {user.name}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {user.role === 'admin' && <Dropdown.Item onClick={() => { navigate('admin/dashboard') }} className='text-dark'>Dashboard</Dropdown.Item>}
                                        <Dropdown.Item onClick={() => { navigate('/myprofile') }} className='text-dark'>Profile</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { navigate('/orders') }} className='text-dark'>Orders</Dropdown.Item>
                                        <Dropdown.Item onClick={logoutHandler} className='text-danger'>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <Link to="/login" className="btn btn-outline-secondary rounded-0 login-btn mb-2 mb-lg-0 me-3">Login</Link>
                            )}



                        </div>
                    </div>
                </div>
            </nav>

            {/* Secondary navigation bar */}
            <nav className="navbar navbar-expand d-flex  navbar-dark bg-dark p-0  ">


                <div className="container-fluid">

                    {/* Main menu items */}
                    <ul className="navbar-nav flex-wrap justify-content-around flex-row mx-auto">
                        <li className="nav-item  fw-bold  "  >
                            <a className="nav-link    p-lg-3 ps-lg-4 pe-lg-4 p-md-3 ps-md-4 pe-md-4 text-light main-menu-item " href="/">Home</a>
                        </li>
                        <li className="nav-item   fw-bold  ">
                            <a className="nav-link text-light p-lg-3 ps-lg-4 pe-lg-4 p-md-3 ps-md-4 pe-md-4 main-menu-item" href="#">All Products</a>
                        </li>
                        <li className="nav-item dropdown  fw-bold  ">

                            {/* Dropdown menu for Women */}
                            <a className="nav-link dropdown-toggle text-light p-lg-3 ps-lg-4 pe-lg-4 p-md-3 ps-md-4 pe-md-4 main-menu-item" href="#" role="button" data-bs-toggle="dropdown">
                                Women&nbsp;&nbsp;&nbsp;
                            </a>
                            <ul className="dropdown-menu rounded-top-0 ">
                                <li><a className="dropdown-item sub-menu-item" href="#">All products</a></li>
                                <li><a className="dropdown-item sub-menu-item" href="#">Dresses</a></li>
                                <li><a className="dropdown-item sub-menu-item" href="#">Pants</a></li>
                                <li><a className="dropdown-item sub-menu-item" href="#">Skirts</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown text-light  fw-bold main-menu-item ">

                            {/* Dropdown menu for Men */}
                            <a className="nav-link dropdown-toggle text-light p-lg-3 ps-lg-4 pe-lg-4 p-md-3 ps-md-4 pe-md-4" href="#" role="button" data-bs-toggle="dropdown">
                                Men&nbsp;&nbsp;&nbsp;
                            </a>
                            <ul className="dropdown-menu rounded-top-0 ">
                                <li><a className="dropdown-item sub-menu-item" href="#">All products</a></li>
                                <li><a className="dropdown-item sub-menu-item" href="#">Shirts</a></li>
                                <li><a className="dropdown-item sub-menu-item" href="#">Pants</a></li>
                                <li><a className="dropdown-item sub-menu-item" href="#">Jackets</a></li>
                            </ul>
                        </li>
                        <li className="nav-item  fw-bold   ">
                            <a className="nav-link text-light p-lg-3 ps-lg-4 pe-lg-4 p-md-3 ps-md-4 pe-md-4 main-menu-item" href="#">Kids</a>
                        </li>
                        <li className="nav-item  fw-bold ">
                            <a className="nav-link text-light p-lg-3 ps-lg-4 pe-lg-4 p-md-3 ps-md-4 pe-md-4 main-menu-item" href="/contact">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header;
