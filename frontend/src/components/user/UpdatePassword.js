import { useEffect, useState } from 'react';
import { updatePassword as updatePasswordAction, clearAuthError } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function UpdatePassword() {

    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const dispatch = useDispatch();
    const { isUpdated, error } = useSelector(state => state.authState)

    // Handle form submission for updating password
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('oldPassword', oldPassword);
        formData.append('password', password);
        dispatch(updatePasswordAction(formData))
    }

    // Handle success and error messages using toast notifications
    useEffect(() => {
        if (isUpdated) {

            // Notify user when password is updated successfully
            toast('Password updated successfully', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER
            })

            // Clear input fields after successful update
            setOldPassword("");
            setPassword("")
            return;
        }
        if (error) {

            // Display error message if update fails
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            })
            return
        }
    }, [isUpdated, error, dispatch])

    return (
        <div className="container pt-5 pb-5 ps-3 pe-3 mt-lg-5 ">
            <div className="row">
                <div className="col-lg-6 col-md-9 col-sm-10 mx-auto">
                    <form onSubmit={submitHandler} className=" p-4 shadow bg-light mt-3 rounded">
                        <h2 className="text-center  fw-bold">Update Password</h2>

                        {/* Old Password Input */}
                        <div className="form-group  mb-3">
                            <label htmlFor="old_password_field" className="form-label fw-bold ">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={e => setOldPassword(e.target.value)}
                            />
                        </div>

                        {/* New Password Input */}
                        <div className="form-group  mb-3">
                            <label htmlFor="new_password_field" className="form-label fw-bold ">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        {/* Submit button */}
                        <div className="mb-3 d-flex justify-content-center">
                            <button type="submit" className="btn bg-warning mt-3 fw-bold text-black" >Update Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}