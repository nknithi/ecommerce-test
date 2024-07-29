import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../actions/productActions";
import { clearError, clearProductCreated } from "../../slices/productSlice";
import { toast } from "react-toastify";

export default function NewProduct() {

    // State variables for form inputs and file upload
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    // Redux state variables and dispatch function
    const { loading, isProductCreated, error } = useSelector(state => state.productState)


    // Array of categories for dropdown select
    const categories = [
        'Dress',
        'Trouser',
        'Skirt']

    // Hook from react-router-dom to navigate to a different route
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Function to handle image upload and preview
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

    // Function to handle form submission
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

        // Dispatch action to create new product
        dispatch(createNewProduct(formData))
    }

    // useEffect hook to handle success and error messages
    useEffect(() => {

        // If product creation is successful, show success toast and navigate to products page
        if (isProductCreated) {
            toast('Product Created Succesfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductCreated())
            })
            navigate('/admin/products')
            return;
        }

        // If there's an error, show error toast and clear error state
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            })
            return
        }
    }, [isProductCreated, error, dispatch])


    return (
        <div className="row">

            {/* Sidebar Component */}
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="col-12 col-md-10">
                <Fragment>
                    <div className="col-lg-6 col-md-9 col-sm-10 mx-auto mb-4">

                        {/* Form for Adding New Product */}
                        <form onSubmit={submitHandler} className=" p-4 shadow bg-light mt-3 rounded" encType='multipart/form-data'>

                            <h2 className="text-center  fw-bold">New Product </h2>

                            {/* Name Input Field */}
                            <div className="form-group">
                                <label htmlFor="name_field" className="form-label fw-bold ">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                            </div>

                            {/* Price Input Field */}
                            <div className="form-group">
                                <label htmlFor="price_field" className="form-label fw-bold ">Price</label>
                                <input
                                    type="text"
                                    id="price_field"
                                    className="form-control"
                                    onChange={e => setPrice(e.target.value)}
                                    value={price}
                                />
                            </div>

                            {/* Description Textarea Field */}
                            <div className="form-group">
                                <label htmlFor="description_field" className="form-label fw-bold ">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description_field"
                                    rows="3"
                                    onChange={e => setDescription(e.target.value)}
                                    value={description}
                                ></textarea>
                            </div>
                            {/* Category Select Field */}
                            <div className="form-group">
                                <label htmlFor="category_field" className="form-label fw-bold ">Category</label>
                                <select onChange={e => setCategory(e.target.value)} className="form-control" id="category_field">
                                    <option value="">Select</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Stock Input Field */}
                            <div className="form-group">
                                <label htmlFor="stock_field" className="form-label fw-bold ">Stock</label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control"
                                    onChange={e => setStock(e.target.value)}
                                    value={stock}
                                />
                            </div>


                            {/* Seller Name Input Field */}
                            <div className="form-group">
                                <label htmlFor="seller_field" className="form-label fw-bold ">Seller Name</label>
                                <input
                                    type="text"
                                    id="seller_field"
                                    className="form-control"
                                    onChange={e => setSeller(e.target.value)}
                                    value={seller}
                                />
                            </div>


                            {/* Images File Input Field */}
                            <div className='form-group'>
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

                                {/* Displaying preview of selected images */}
                                {imagesPreview.map(image => (
                                    <img
                                        className="mt-3 mr-2"
                                        key={image}
                                        src={image}
                                        alt={`Image Preview`}
                                        width="55"
                                        height="52"
                                    />
                                ))}
                            </div>
                            {/* Submit button */}
                            <div className="mb-3 d-flex justify-content-center">

                                <button
                                    id="login_button"
                                    type="submit"
                                    disabled={loading}
                                    className="btn bg-warning w-25 mt-3 fw-bold text-black"
                                >
                                    create
                                </button>
                            </div>
                        </form>
                    </div>
                </Fragment>
            </div>
        </div>

    )
}