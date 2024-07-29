import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getAdminProducts } from "../../actions/productActions";
import { getUsers } from '../../actions/userActions'
import { Link } from "react-router-dom";

export default function Dashboard() {


    // Calculating total amount from admin orders
    let totalAmount = 0;
    // Selecting data from Redux state using useSelector
    const { products = [] } = useSelector(state => state.productsState);
    const { users = [] } = useSelector(state => state.userState);
    const dispatch = useDispatch(); // Setting up useDispatch hook to dispatch actions
    let outOfStock = 0;

    // Calculating number of out-of-stock products
    if (products.length > 0) {
        products.forEach(product => {
            if (product.stock === 0) {
                outOfStock = outOfStock + 1;
            }
        })
    }


    // useEffect hook to fetch initial data on component mount
    useEffect(() => {
        dispatch(getAdminProducts);  // Fetching admin products
        dispatch(getUsers); // Fetching users
    }, []) // Empty dependency array ensures this effect runs only once on mount


    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Dashboard</h1>
                <div className="row pr-4">

                    {/* Total Amount Card */}
                    <div className="col-xl-12 col-sm-12 mb-3">
                        <div className="card text-white bg-info o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Total Amount<br /> <b>${totalAmount}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row pr-4">
                    {/* Products Card */}
                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-success o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Products<br /> <b>{products.length}</b></div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>

                

                    {/* Users Card */}
                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-primary o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Users<br /> <b>{users.length}</b></div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Out of Stock Card */}
                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-danger o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}