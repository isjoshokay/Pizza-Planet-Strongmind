# Overview
This describes how I intend to solve the problem presented to me, essentially where I will plan and journal my thought process for building this project. 

## Summary
For the sake of nostalgia/emotional attachment, I decided to name the company Pizza Planet :alien::pizza: similar to the one seen in Pixar's Toy Story. Based on the requirements of the project, I'm thinking it is an interface for building a menu, such that customers would use this to order from inside or on the website.

### Models and Attributes
**Users** - All of the people who will use this interface. This is exclusive to employees so there will need to be authentication. Duplicate users cannot exist. 
- id: The unique ID created by the DBMS to identify a specific user record. <mark>type String</mark>
- username: The name that the user chose to create when they signed up. *(jpeoples)* <mark>type String</mark>
- password: A hash encrypted version of the password the user chose to sign up. *(95cj34vo3453v95334)* <mark>type String</mark>
- permissions: Depending on the type of user it is, they will have different permissions. *(Admin or Chef)* <mark>type String</mark>
- profileimg: A route to the image of the user. *(/images/username.jpg)* <mark>type String<mark>

**Toppings** - The toppings that Pizza Planet :alien::pizza: has to offer for the pizzas it sells. These can only be created by users with permission: Admin. Duplicate toppings cannot exist. 
- id: The unique ID created by the DBMS to identify a specific topping.
- name: The name of the topping. *(Such as chicken or olives)* <mark>type String<mark>
- type: The type of topping. *(4 Types: Meat, Veggies, Sauce or Cheese)* <mark>type String<mark>
- price: The cost to add the topping to a pizza *(1.50)* <mark>type Number<mark>
- toppingimg: A route to the image of the topping. *(/images/topping.jpg)* <mark>type String<mark>  

**Pizzas** - The selection of pizzas that customers will be able to choose from Pizza Planet's :alien::pizza: menu. These can only be created by users with permission: Chef. Duplicate pizzas cannot exist. 
- id: The unique ID created by the DBMS to identify a specific pizza. <mark>type String<mark>
- name: The name of the pizza creation *(Meatlover's, Veggie, Hawaiian)* <mark>type String<mark>
- toppings: The toppings chosen for a pizza *(`{sauce: "tomato", cheese: ["mozzarella"], meat: [], veggies: ["olives", "spinach"]}`)* <mark>type Object<mark>
- price: a base cost plus the cost of each topping on the pizza. This is calculated before the data is added collectively. *(12.99)* <mark>type Number<mark>

### Views

--Routes goes here--