import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../../actions/userActions";
import { clearError, clearUserUpdated } from "../../slices/userSlice";
import { toast } from "react-toastify";

export default function UpdateUser() {

    // State variables to manage form data
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    // Fetching userId from URL params
    const { id: userId } = useParams();

    // Redux state and actions
    const { loading, isUserUpdated, error, user } = useSelector(state => state.userState)
    const { user: authUser } = useSelector(state => state.authState)

    const dispatch = useDispatch();


    // Handler for form submission
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('role', role);
        dispatch(updateUser(userId, formData))
    }


    // Effect to handle toast notifications and dispatch actions based on user update
    useEffect(() => {
        if (isUserUpdated) {
            toast('User Updated Succesfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUserUpdated())
            })
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

        // Fetch user details initially and on userId change
        dispatch(getUser(userId))
    }, [isUserUpdated, error, dispatch])



    // Effect to set form fields with user details once user is loaded
    useEffect(() => {
        if (user._id) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
    }, [user])


    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                    <div className="col-lg-6 col-md-9 col-sm-10 mx-auto my-5">

                        {/* Form for updating user */}
                        <form onSubmit={submitHandler} className=" p-4 shadow bg-light mt-3 rounded" encType='multipart/form-data'>
                            <h2 className="mb-4 fw-bold">Update User</h2>

                            {/* Name input field */}
                            <div className="form-group mb-3">
                                <label htmlFor="name_field" className="form-label fw-bold ">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                            </div>

                            {/* Email input field */}
                            <div className="form-group  mb-3">
                                <label htmlFor="price_field" className="form-label fw-bold ">Email</label>
                                <input
                                    type="text"
                                    id="price_field"
                                    className="form-control"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>

                            {/* Role select field */}
                            <div className="form-group  mb-3">
                                <label htmlFor="category_field" className="form-label fw-bold ">Role</label>
                                <select disabled={user._id === authUser._id} value={role} onChange={e => setRole(e.target.value)} className="form-control" id="category_field">
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>

                            {/* Submit button */}
                            <div className="mb-3 d-flex justify-content-center">



                                <button
                                    id="login_button"
                                    type="submit"
                                    disabled={loading}
                                    className="btn bg-warning w-25 mt-3 fw-bold text-black"
                                >
                                    UPDATE
                                </button>
                            </div>
                        </form>
                    </div>
                </Fragment>
            </div>
        </div>

    )
}