# WeThem Project

## [See the App!](https://wethem-project.netlify.app/about)

![App Logo](./src/assets/images/LogoBg.jpeg)

## Description

My project arises from the idea of creating an online store where the importance is not given to the gender but to the clothes. I have chosen this because it seemed to me a good opportunity to apply the knowledge acquired and also give it a personal touch.

#### [Client Repo here](https://github.com/aliciaurds/wethem-client)
#### [Server Repo here](https://github.com/aliciaurds/wethem-server)

## Backlog Functionalities

- Create a search bar
- Add more styles to the website
- The payment gateway to be displayed in a pop-up window
- Store all confirmed orders on one page
- Remove already purchased products from the shopping list
- Nodemailer


## Technologies used

- HTML
- CSS
- JavaScript
- NodeJS
- Express
- Axios
- React
- Bootstrap
- React Context



# Client Structure

## User Stories

- **404** 
- **500** 
- **homepage**  
- **sign up** 
- **login** 
- **logout** 
- **add and delete a review**
- **add and remove a product to wishlist** 
- **add and remove a product to cart** 
- **update my profile** 
- **delete account** 

## Client Routes


## React Router Routes (React App)
| Path                             | Page            | Components        | Permissions              | Behavior                                                      |
| -------------------------        | ----------------| ----------------  | ------------------------ | ------------------------------------------------------------  |
| `/`                              | Home            |                   | public                   | Home page                                                     |
| `/signup`                        | Signup          |                   | public                   | Signup form, link to login, navigate to homepage after signup |
| `/login`                         | Login           |                   | public                   | Login form, link to signup, navigate to homepage after login  |
| `/profile`                       | Profile         | EditProfile       | user only `<IsPrivate>`  | Navigate to homepage after logout, expire session             |
| `/all/`                          | AllProducts     | ProductCard       | public                   | Shows all products                                            |
| `/about`                         | About           |                   | public                   | Brief description                                             |
| `/category/:category`            | CategoryDetails |                   | public                   | Filter Products by category                                   |
| `/products/:productId/details`   | ProductDetails  | Review            | public                   | Details of a Product                                          |
| `/wishlist`                      | Wishlist        |                   | user only `<IsPrivate>`  | List of products added to favorites                           |
| `/shoppingcart`                  | ShoppingCart    |                   | user only `<IsPrivate>`  | List of products added to cart                                |
| `/payment-success`               | PaymentSuccess  | PaymentSuccess    | user only `<IsPrivate>`  | If payment is success                                         |
| `/products/create`               | AdminCreate     |                   | admin only `<ISAdmin>`   | Create products                                               |
| `/products/:productId/update`    | AdminEdit       |                   | admin only `<ISAdmin>`   | Edit products                                                 |
| `/category/:category`            | CategoryDetails |                   | user only `<IsPrivate>`  | Filter Products by category                                   |

## Other Components

- Navbar
- Footer
- CheckoutForm

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.verify()

- Backlog Service
  - product.filter(type, status)
  - product.detail(id)
  - product.add(id)
  - product.delete(id)
  - product.update(id)
  - review.detail(id)
  - review.add(id)
  - review.delete(id)
  
  
## Context

- auth.context

  
## Links

### Project

[Repository Link Client](https://github.com/aliciaurds/wethem-client)

[Repository Link Server](https://github.com/aliciaurds/wethem-server)

[Deploy Link](https://wethem-project.netlify.app/)

### Excalidraw

[Link to excalidraw](https://excalidraw.com/#json=6eFiMtdQT7EzQPPjtzqOZ,awRADYs52IFH7K709cPsXw)

### Slides

[Slides Link](https://docs.google.com/presentation/d/16Pr0paptFufgJA-4JrMSbrFSYZwRJOXXJViaFrs861c/edit?usp=sharing)