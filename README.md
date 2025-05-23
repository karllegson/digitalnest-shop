# DigitalNEST Shop

Hey there! This is my web development project for the Digital NEST internship application. I built this shop from scratch to show off what I can do with React and modern web techniques.

## What I Built

I created an online shop that pulls products from an API and lets users browse, filter, and add items to their cart. The design is clean, works on all devices, and has a fresh green color scheme that stands out.

The shop remembers what's in your cart even if you close the browser - something real customers definitely appreciate!

## Key Implementation Details

**The Shop Interface**  
I built a clean, grid-based product display that looks great on everything from phones to desktops. Products are organized by category, making it easy to find what you're looking for.

**Smart Cart System**  
The cart slides in from the side (way better than popups!) and lets you:  
- Add multiple items  
- Change quantities with + and - buttons  
- See your total cost updating in real-time  
- Remove items you don't want  

**Real-World Data Flow**  
Instead of hardcoded products, I'm fetching everything from an API. The app handles loading states and dynamically creates category filters based on the available products.

**Responsive Design**  
I hate when sites break on mobile! I built this with a mobile-first approach, using CSS media queries to make sure everything works beautifully regardless of screen size.

**Persistent Storage**  
Cart items are saved in localStorage so nothing disappears when you refresh - a must-have for any real shopping experience.

## Tech I Used

* React (with hooks for state management)
* React Router for navigation between pages
* Custom CSS (no frameworks - I wanted to show my CSS skills)
* Async/await for API calls
* LocalStorage for data persistence

## What I'd Add Next

Given more time, I'd love to implement:

* A search bar to find products quickly 
* User accounts with favorites lists
* Checkout flow with address and payment forms
* Better error handling with friendly messages
* Filter options like price ranges and sorting

Check out the code to see how I structured everything. I focused on keeping components modular, state management clean, and the UX smooth throughout the shopping experience.

Thanks for taking a look!
