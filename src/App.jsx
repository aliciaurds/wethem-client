import { Route, Routes } from 'react-router-dom'
//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Navbar from './components/Navbar'
//pages
import Home from './pages/Home'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import AllProducts from './pages/AllProducts'
import About from './pages/About'
import CategoriesDetails from './pages/CategoriesDetails'
import ProductDetails from './pages/ProductDetails'
import Profile from './pages/Profile'
import ProfileEdit from './pages/ProfileEdit'
import WishList from './pages/WishList'
import ShoppingCart from './pages/ShoppingCart'
import AdminCreate from './pages/AdminCreate'
import AdminEdit from './pages/AdminEdit'
import Error from './pages/error/Error'
import NotFound from './pages/error/NotFound'
//components
import IsPrivate from './components/IsPrivate'
import Footer from './components/Footer'
import IsAdmin from './components/IsAdmin'
import Unauthorized from './pages/error/Unauthorized'
import IsNotLogged from './components/isNotLogged'
import PaymentSuccess from './components/PaymentSuccess'

function App() {
  

  return (
    <>
    <Navbar/>
    <br />
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/signup' element={<IsNotLogged><Signup/></IsNotLogged>}/>
    <Route path='/login' element={<IsNotLogged><Login/></IsNotLogged>}/>
    <Route path='/all' element={<AllProducts/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/category/:category' element={<CategoriesDetails/>}/>
    <Route path='/products/:productId/details' element = {<ProductDetails/>}/>

    {/* private routes */}
    <Route path='/profile' element = {<IsPrivate><Profile/></IsPrivate>}/>
    <Route path='/profile/edit' element = {<IsPrivate><ProfileEdit/></IsPrivate>}/>
    <Route path='/wishlist' element = {<IsPrivate><WishList/></IsPrivate>}/>
    <Route path='/shoppingCart' element = {<IsPrivate><ShoppingCart/></IsPrivate>}/>
    <Route path="/payment-success" element={ <IsPrivate><PaymentSuccess/></IsPrivate> }/>

    {/* admin routes     */}
    <Route path='/products/create' element = {<IsAdmin><AdminCreate/></IsAdmin>}/>
    <Route path='/products/:productId/update' element = {<IsAdmin><AdminEdit/></IsAdmin>}/>

    {/* error routes */}
    <Route path='/error' element = {<Error/>}/>
    <Route path='/access-denied' element = {<Unauthorized/>}/>
    <Route path='*' element = {<NotFound/>}/>
    
    {/* Stripes */}


    </Routes>
    <br />
    <Footer/>
      
    </>
  )
}

export default App
