import { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';

export default function Home() {

    // Initialize the dispatch function
    const dispatch = useDispatch();

    // Extracting necessary state from the redux store
    const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState)

    // State for managing the current page number
    const [currentPage, setCurrentPage] = useState(1);

    // Function to set the current page number
    const setCurrentPageNo = (pageNo) => {

        setCurrentPage(pageNo)

    }

    // Effect to fetch products whenever the current page or error changes
    useEffect(() => {
        if (error) {

            // Show error toast notification if there's an error
            return toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }

        // Dispatch the getProducts action with the current page number and other filters
        dispatch(getProducts(null, null, null, null, currentPage, 4))
    }, [error, dispatch, currentPage])


    return (
        <Fragment>

            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={'Buy Best Products'} />
                    <h2 id="products_heading" className="text-center">Latest Products</h2>
                    <section id="products" className="container mt-3">
                        <div className="row">
                            {products && products.map(product => (
                                <Product col={3} key={product._id} product={product} />
                            ))}

                        </div>
                    </section>
                    {productsCount > 0 && productsCount > resPerPage ?
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                onChange={setCurrentPageNo}
                                totalItemsCount={productsCount}
                                itemsCountPerPage={resPerPage}
                                nextPageText={'Next'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass={'page-item'}
                                linkClass={'page-link'}
                            />
                        </div> : null}
                </Fragment>
            }
        </Fragment>
    )
}