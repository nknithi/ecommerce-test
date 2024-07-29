import { Link, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

export default function Sidebar() {

    const navigate = useNavigate(); // Hook from react-router-dom for navigation

    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">

                    {/* Dashboard Link */}
                    <li>
                        <Link to="/admin/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                    </li>

                    {/* Product Dropdown */}
                    <li>
                        <NavDropdown title={
                            <i className='fa fa-product-hunt'> Product</i>
                        }>
                            <NavDropdown.Item onClick={() => navigate('/admin/products')} > <i className='fa fa-shopping-basket'> All</i></NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate('/admin/products/create')} > <i className='fa fa-plus'> Create </i></NavDropdown.Item>
                        </NavDropdown>
                    </li>

                   

                    {/* Users Link */}
                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                    </li>

                    {/* Reviews Link */}
                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-users"></i> Reviews</Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}