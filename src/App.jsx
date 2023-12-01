import { Route, Routes } from 'react-router-dom'
//styles
import './App.css'
import Navbar from './components/Navbar'
//pages
import Home from './pages/Home'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import AllProducts from './pages/AllProducts'
import About from './pages/About'
import Categories from './pages/Categories'
import ProductDetails from './pages/ProductDetails'
import Account from './pages/Account'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import ProfileEdit from './pages/ProfileEdit'
import WishList from './pages/WishList'
import ShoppingCart from './pages/ShoppingCart'
import Payment from './pages/Payment'
import AdminCreate from './pages/AdminCreate'
import AdminEdit from './pages/AdminEdit'
import Error from './pages/error/Error'
import NotFound from './pages/error/NotFound'
//components
import IsPrivate from './components/IsPrivate'
import Footer from './components/Footer'
import IsAdmin from './components/IsAdmin'
import Unauthorized from './pages/error/Unauthorized'

function App() {
  

  return (
    <>
    <Navbar/>
    <br />
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/all' element={<AllProducts/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/category' element={<Categories/>}/>
    <Route path='/category/:category' element={<CategoriesDetails/>}/>
    <Route path='/product/:productId/details' element = {<ProductDetails/>}/>

    {/* private routes */}
    <Route path='/account' element = {<IsPrivate><Account/></IsPrivate>}/>
    <Route path='/orders' element={<IsPrivate><Orders/></IsPrivate>}/>
    <Route path='/profile' element = {<IsPrivate><Profile/></IsPrivate>}/>
    <Route path='/profile/edit' element = {<IsPrivate><ProfileEdit/></IsPrivate>}/>
    <Route path='/wishlist' element = {<IsPrivate><WishList/></IsPrivate>}/>
    <Route path='/shoppingCart' element = {<IsPrivate><ShoppingCart/></IsPrivate>}/>
    <Route path='/payment' element = {<IsPrivate><Payment/></IsPrivate>}/>

    {/* admin routes     */}
    <Route path='/admin/create' element = {<IsAdmin><AdminCreate/></IsAdmin>}/>
    <Route path='/admin/edit' element = {<IsAdmin><AdminEdit/></IsAdmin>}/>

    {/* error routes */}
    <Route path='/error' element = {<Error/>}/>
    <Route path='/access-denied' element = {<Unauthorized/>}/>
    <Route path='*' element = {<NotFound/>}/>
    


    </Routes>
    <br />
    <Footer/>
      
    </>
  )
}

export default App
