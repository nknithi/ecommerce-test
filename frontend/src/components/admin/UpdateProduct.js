import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../actions/productActions";
import { clearError, clearProductUpdated } from "../../slices/productSlice";
import { toast } from "react-toastify";

export default function UpdateProduct() {

    // State variables to manage form data
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState("");
    const [images, setImages] = useState([]);
    const [imagesCleared, setImagesCleared] = useState(false);
    const [imagesPreview, setImagesPreview] = useState([]);

    // Fetching productId from URL params
    const { id: productId } = useParams();

    // Redux state and actions
    const { loading, isProductUpdated, error, product } = useSelector(state => state.productState)

    // Static categories for dropdown
    const categories = [
        'Dress',
        'Trouser',
        'Skirt']


    // Hook from react-router-dom for navigation
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handler for file input change to handle images
    const onImagesChange = (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState == 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, file])
                }
            }

            reader.readAsDataURL(file)


        })

    }

    // Handler for form submission
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('description', description);
        formData.append('seller', seller);
        formData.append('category', category);
        images.forEach(image => {
            formData.append('images', image)
        })
        formData.append('imagesCleared', imagesCleared);
        dispatch(updateProduct(productId, formData))
    }


    // Handler to clear selected images
    const clearImagesHandler = () => {
        setImages([]);
        setImagesPreview([]);
        setImagesCleared(true);
    }

    // Effect to handle toast notifications and dispatch actions based on product update
    useEffect(() => {
        if (isProductUpdated) {
            toast('Product Updated Succesfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductUpdated())
            })
            setImages([])
            return;
        }

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            })
            return
        }


        // Fetch product details initially and on productId change
        dispatch(getProduct(productId))
    }, [isProductUpdated, error, dispatch])


    // Effect to set form fields with product details once product is loaded
    useEffect(() => {
        if (product._id) {
            setName(product.name);
            setPrice(product.price);
            setStock(product.stock);
            setDescription(product.description);
            setSeller(product.seller);
            setCategory(product.category);

            let images = [];
            product.images.forEach(image => {
                images.push(image.image)
            });
            setImagesPreview(images)
        }
    }, [product])


    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                    <div className="col-lg-6 col-md-9 col-sm-10 mx-auto my-5">

                        {/* Form for updating product */}
                        <form onSubmit={submitHandler} className=" p-4 shadow bg-light mt-3 rounded" encType='multipart/form-data'>
                            <h2 className="mb-4 fw-bold">Update Product</h2>

                            {/* Name input field */}
                            <div className="form-group mb-1">
                                <label htmlFor="name_field" className="form-label fw-bold ">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                            </div>


                            {/* Price input field */}
                            <div className="form-group mb-1">
                                <label htmlFor="price_field" className="form-label fw-bold ">Price</label>
                                <input
                                    type="text"
                                    id="price_field"
                                    className="form-control"
                                    onChange={e => setPrice(e.target.value)}
                                    value={price}
                                />
                            </div>


                            {/* Description textarea */}
                            <div className="form-group mb-1">
                                <label htmlFor="description_field" className="form-label fw-bold ">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description_field"
                                    rows="4"
                                    onChange={e => setDescription(e.target.value)}
                                    value={description}
                                ></textarea>
                            </div>


                            {/* Category select field */}
                            <div className="form-group mb-1">
                                <label htmlFor="category_field" className="form-label fw-bold ">Category</label>
                                <select value={category} onChange={e => setCategory(e.target.value)} className="form-control" id="category_field">
                                    <option value="">Select</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Stock input field */}
                            <div className="form-group mb-1">
                                <label htmlFor="stock_field" className="form-label fw-bold ">Stock</label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control"
                                    onChange={e => setStock(e.target.value)}
                                    value={stock}
                                />
                            </div>


                            {/* Seller input field */}
                            <div className="form-group mb-1">
                                <label htmlFor="seller_field" className="form-label fw-bold ">Seller Name</label>
                                <input
                                    type="text"
                                    id="seller_field"
                                    className="form-control"
                                    onChange={e => setSeller(e.target.value)}
                                    value={seller}
                                />
                            </div>


                            {/* Images input field */}
                            <div className='form-group mb-1'>
                                <label>Images</label>

                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='product_images'
                                        className='custom-file-input'
                                        id='customFile'
                                        multiple
                                        onChange={onImagesChange}

                                    />


                                </div>

                                {/* Display image previews */}
                                {imagesPreview.map(image => (
                                    <img
                                        className="mt-3 me-2"
                                        key={image}
                                        src={image}
                                        alt={`Image Preview`}
                                        width="55"
                                        height="52"
                                    />
                                ))}
                                {imagesPreview.length > 0 && <span className="me-2 text-dark " onClick={clearImagesHandler} style={{ cursor: "pointer" }}><i className="fa fa-trash"></i></span>}

                            </div>

                            {/* Submit button */}
                            <div className="mb-3 d-flex justify-content-center">
                                <button
                                    id="login_button"
                                    type="submit"
                                    disabled={loading}
                                    className="btn bg-warning w-25 mt-3 fw-bold text-black"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </Fragment>
            </div>
        </div>

    )
}