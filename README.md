# DigitalNEST Shop

This is my web development project for the Digital NEST internship application.

## What I Built

I created an online shop that pulls products from an API and lets users browse, filter, and add items to their cart.

The shop remembers what's in your cart even if you close the browser.

## Key Implementation Details

**The Shop Interface**  
I built a clean, grid-based product display that looks great on everything from phones to desktops. Products are organized by category, making it easy to find what you're looking for.

**Smart Cart System**  
The cart slides in from the side and lets you:  
- Add multiple items  
- Change quantities with + and - buttons  
- See your total cost updating in real-time  
- Remove items you don't want  

**Real-World Data Flow**  
Instead of hardcoded products, I'm fetching everything from an API. The app handles loading states and dynamically creates category filters based on the available products.

**Persistent Storage**  
Cart items are saved in localStorage so nothing disappears when you refresh.

## Tech I Used

* React (with hooks for state management)
* React Router for navigation between pages
* Custom CSS
* Async/await for API calls
* LocalStorage for data persistence
