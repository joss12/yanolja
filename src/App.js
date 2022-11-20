import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
import Header from './components/Header'
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing'
import Listing from './pages/Listing'
import Category from './pages/Category';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoutes'
function App() {
  return (
    <>
     <Router>
     <Header />
      <Routes>
      <Route path='/' element={<Home />} />

      {/*Private Route start 1*/}
      <Route path="/profile" element={<PrivateRoute />}>
      <Route path='/profile' element={<Profile />} />
      </Route>
      {/*Private Route end 1*/}

      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      
      {/*Listing Category */}
      <Route path='/category/:categoryName/:listingId' element={<Listing />} />
      
      <Route path='/offers' element={<Offers />} />
      <Route path='/category/:categoryName' element={<Category />} />

      {/*Private route 2 */}
      <Route path='/create-listing' element={<PrivateRoute />}>
        <Route path='/create-listing' element={<CreateListing />} />
      </Route>
      {/*Private route 2 */}

      {/*Private route 3 */}
      <Route path='/edit-listing' element={<PrivateRoute />}>
        <Route path='/edit-listing/:listingID' element={<EditListing />} />
      </Route>
      {/*Private route 3 */}

      </Routes>
     </Router>

     <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      /> 
    </>
  );
}

export default App;
