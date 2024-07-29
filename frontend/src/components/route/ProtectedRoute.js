import { useSelector } from 'react-redux';
import {Navigate} from 'react-router-dom';
import Loader from '../layouts/Loader';

// Component for handling protected routes based on user authentication and role
export default function ProtectedRoute ({children, isAdmin}) {

        // Redux selector to access authentication state
    const { isAuthenticated, loading, user } = useSelector(state => state.authState)


        // Redirect to login if not authenticated and loading is complete
    if(!isAuthenticated && !loading) {
        return <Navigate to="/login" />
    }

        // Redirect to home page if authenticated but not an admin
    if(isAuthenticated) {
        if(isAdmin === true  && user.role !== 'admin') {
            return <Navigate to="/" />
        }

                // Render the children (protected content) if authenticated
        return children;
    }

        // Show loader while checking authentication state
    if(loading) {
        return <Loader/>
    }

   
}