import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import UserLogo from "../assets/images/User-Profile-PNG-Free-Download.png"
import Logo from "../assets/images/wethem.png"




function Navbar() {
  const navStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",    
   
  }
  const linkStyles = {
    color:"red",
    textDecoration: "none"

  }
  const btnStyles = {
  color: "red", 
  borderRadius: "25px",
  borderColor: "red", 
  background: "transparent",
  cursor: "pointer",
  }
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

  if(isLoggedIn && activeUser && activeUser.role !== 'admin'){ 
    return (
      <nav style={navStyles}>
        
        <NavLink style={linkStyles} to="/"><img src={Logo} alt="logo" width={150} /></NavLink> 
        {/* child elements are positioned relative to this container */}
      <div style={{ position: 'relative' }}>
      {/* label dropdown menu, when clicked toggleMenu function get invoke to see the menu*/}
        <p onClick={toggleMenu} className="category-label" style={linkStyles}>
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
                {category}
              </NavLink>
              {category === "See All" && <hr/>}
            </li>
          ))}
        </ul>
      </div>
        <NavLink  style={linkStyles} to="/account"><img src={UserLogo} alt="userlogo" width={18} /></NavLink>
        <NavLink  style={linkStyles} to="/wishlist">❤️</NavLink>
        <NavLink  style={linkStyles} to="/shoppingCart">🛒</NavLink>
        <button onClick={handleLogOut} style={btnStyles}>Log Out</button>
      </nav>
    );
  } else if (isLoggedIn && activeUser && activeUser.role === 'admin'){
    return (
      <nav style={navStyles}>
      <NavLink style={linkStyles} to="/">
        <img src={Logo} alt="logo" width={150} />
      </NavLink>
      <div style={{ position: 'relative' }}>
        <p onClick={toggleMenu} className="category-label" style={linkStyles}>
          Categories
        </p>
        <ul className={`category-menu ${menuOpen ? "isActive" : ""}`}>
          {categoryOptions.map((category, index) => (
            <li key={index}>
              <NavLink
                to={`/category/${category}`}
                onClick={(event) => handleCategoryItemClick(event, category)}
              >
                {category}
              </NavLink>
             {category === "See All" && <hr/>}
            </li>
          ))}
        </ul>
      </div>
        <NavLink  style={linkStyles} to="/products/create">Add Product</NavLink>
        <button onClick={handleLogOut} style={btnStyles}>Log Out</button>
    </nav>
    )
  }
  else{
    return (
      <nav style={navStyles}>
        <NavLink  style={linkStyles} to="/"><img src={Logo} alt="logo" width={150} /></NavLink> 
      <div style={{ position: 'relative' }}>
        <p onClick={toggleMenu} className="category-label" style={linkStyles}>
          Categories
        </p>
        <ul className={`category-menu ${menuOpen ? "isActive" : ""}`}>
          {categoryOptions.map((category, index) => (
            <li key={index}>
              <NavLink
                to={`/category/${category}`}
                onClick={(event) => handleCategoryItemClick(event, category)}
              >
                {category}
              </NavLink>
              {category === "See All" && <hr/>}
            </li>
          ))}
        </ul>
      </div>
        <NavLink  style={linkStyles} to="/login"><img src={UserLogo} alt="userlogo" width={18} /></NavLink>
        <NavLink  style={linkStyles} to="/wishlist">❤️</NavLink>
        <NavLink  style={linkStyles} to="/shoppingCart">🛒</NavLink>
      </nav>
    );
  }
 
}

export default Navbar;
