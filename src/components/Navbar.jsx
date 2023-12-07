import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
//import images
import UserLogo from "../assets/images/User-Profile-PNG-Free-Download.png"
import Logo from "../assets/images/wethem.png"
import WishListLogo from "../assets/images/wishlist.png"
import ShoppingCartLogo from "../assets/images/cart.webp"


function Navbar() {    
  const navigate = useNavigate()
  const {isLoggedIn, authenticateUser, activeUser} = useContext(AuthContext)
  const [menuOpen, setMenuOpen] = useState(false);


  const toggleMenu = () =>{
    setMenuOpen(!menuOpen)
  }
  const categoryOptions = ['See All','skirts', 'dresses', 'suits', 'shirts', 'trousers', 'jeans', 'sport', 'coats', 'jackets', 'hoodies', 'accessories']

  //when i click on one item, it is hidden again 
  const handleCategoryItemClick = (event, categoryName) => {
    event.preventDefault(); // Prevent default NavLink behavior
    if(categoryName === 'See All'){
      navigate("/all")
    }else{
      navigate(`/category/${categoryName}`);
    }
    setMenuOpen(false); // Close the dropdown menu
  };

  const handleLogOut = () =>{
    localStorage.removeItem("authToken");
    //invoke again authenticateUser because once I remove the tokens the states will be changed to false
    authenticateUser()

    navigate("/")
  }
  //capitalization
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  if(isLoggedIn && activeUser && activeUser.role !== 'admin'){ 
    return (
      <div className="nav-container">
      <nav className="nav-style">
        
        <NavLink to="/"><img src={Logo} alt="logo" width={150} /></NavLink> 
        {/* child elements are positioned relative to this container */}
      <div style={{ position: 'relative' }}>
      {/* label dropdown menu, when clicked toggleMenu function get invoke to see the menu*/}
        <p onClick={toggleMenu} className="category-label" >
          Categories
        </p>
        {/* visibility is controlled by the isActive class. When menuOpen state is true, it adds the isActive class, when is false it's removed */}
        <ul className={`category-menu ${menuOpen ? "isActive" : ""}`}>
        {/*a list of category options is mapped. NavLink sets up the route for that category and invokes the handleCategoryItemClick which sets the selected category, navigates to the category route, and hides the dropdown menu by setting menuOpen to false  */}
          {categoryOptions.map((category, index) => (
            <li key={index}>
            {/* use event.preventDefault() in the handleCategoryItemClick function, which is necessary to prevent the default behavior of the link and perform navigation in a controlled manner. If not I will not be redirected to /all  */}
              <NavLink
                to={`/category/${category}`}
                onClick={(event) => handleCategoryItemClick(event, category)}
              >
                {capitalize(category)}
              </NavLink>
              {category === "See All" && <hr/>}
            </li>
          ))}
        </ul>
      </div>
        <NavLink to="/profile"><img src={UserLogo} alt="userlogo" width={25} /></NavLink>
        <NavLink to="/wishlist"><img src={WishListLogo} alt="wishlistlogo" width={20} /></NavLink>
        <NavLink   to="/shoppingCart"><img src={ShoppingCartLogo} alt="cartlogo" width={18} /></NavLink><br />
        <button onClick={handleLogOut} className="btn-style">Log Out</button>
      </nav>
      </div>
    );
  } else if (isLoggedIn && activeUser && activeUser.role === 'admin'){
    return (
      <div className="nav-container">
      <nav className="nav-style">
      <NavLink  to="/">
        <img src={Logo} alt="logo" width={150} />
      </NavLink>
      <div style={{ position: 'relative' }}>
        <p onClick={toggleMenu} className="category-label" >
          Categories
        </p>
        <ul className={`category-menu ${menuOpen ? "isActive" : ""}`}>
          {categoryOptions.map((category, index) => (
            <li key={index}>
              <NavLink
                to={`/category/${category}`}
                onClick={(event) => handleCategoryItemClick(event, category)}
              >
                {capitalize(category)}
              </NavLink>
             {category === "See All" && <hr/>}
            </li>
          ))}
        </ul>
      </div>
      <NavLink  to="/profile"><img src={UserLogo} alt="userlogo" width={25} /></NavLink>
        <NavLink  to="/products/create">Add Product</NavLink>
        <button onClick={handleLogOut} className="btn-style">Log Out</button>
    </nav>
    </div>
    )
  }
  else{
    return (
      <div className="nav-container">
      <nav className="nav-style">
        <NavLink to="/"><img src={Logo} alt="logo" width={150} /></NavLink> 
      <div style={{ position: 'relative' }}>
        <p onClick={toggleMenu} className="category-label" >
          Categories
        </p>
        <ul className={`category-menu ${menuOpen ? "isActive" : ""}`}>
          {categoryOptions.map((category, index) => (
            <li key={index}>
              <NavLink
                to={`/category/${category}`}
                onClick={(event) => handleCategoryItemClick(event, category)}
              >
                {capitalize(category)}
              </NavLink>
              {category === "See All" && <hr/>}
            </li>
          ))}
        </ul>
      </div>
        <NavLink  to="/login"><img src={UserLogo} alt="userlogo" width={25} /></NavLink>
        <NavLink to="/wishlist"><img src={WishListLogo} alt="wishlistlogo" width={20} /></NavLink>
        <NavLink  to="/shoppingCart"><img src={ShoppingCartLogo} alt="cartlogo" width={18} /></NavLink>
      </nav>
      </div>
    );
  }
 
}

export default Navbar;
