
# IPL 2026 Ticket Booking System

## Project Overview

The IPL Ticket Booking System is a responsive web application developed using React JS and Supabase. It allows users to view IPL match schedules, check available seats, book tickets and view saved booking details.

The application uses a PostgreSQL database through Supabase to store match information and booking records, replacing hardcoded data with live database operations.

## Features

- Responsive and user-friendly interface
- Reusable React components
- IPL match schedule and ticket prices
- Live seat availability
- Ticket booking with quantity validation
- Automatic total price calculation
- Dynamic booking counter
- Booking confirmation messages
- Automatic Sold Out functionality
- My Bookings table
- Persistent database storage
- Realtime database updates
- Show/Hide Matches functionality

## Technologies Used

- HTML5
- CSS3
- JavaScript
- React JS
- JSX
- Vite
- Supabase
- PostgreSQL
- Git and GitHub
- Visual Studio Code

## Activity 10 - Introduction to React JS

- Created a React project using Vite.
- Developed reusable Navbar, Hero and MatchCard components.
- Used JSX to design the user interface.
- Passed match details using props.
- Used the map() method to render match cards.
- Implemented state management using useState().
- Added dynamic booking count and Sold Out functionality.

## Activity 11 - Supabase Integration

- Connected the React application to Supabase.
- Created matches and bookings tables in PostgreSQL.
- Replaced hardcoded match data with database records.
- Used useEffect() to fetch match and booking details.
- Implemented ticket booking using insert() and update().
- Added realtime subscriptions for automatic updates.
- Stored booking records permanently in the database.
- Displayed saved records in the My Bookings section.

## Project Structure

    react-ipl-booking/
    |
    |-- public/
    |-- src/
    |   |-- components/
    |   |   |-- Navbar.jsx
    |   |   |-- Hero.jsx
    |   |   |-- MatchCard.jsx
    |   |
    |   |-- App.jsx
    |   |-- App.css
    |   |-- index.css
    |   |-- main.jsx
    |   |-- supabase.js
    |
    |-- .gitignore
    |-- index.html
    |-- package.json
    |-- package-lock.json
    |-- vite.config.js
    |-- README.md

## Database Structure

### Matches Table

| Column | Description |
|--------|-------------|
| id | Unique match ID |
| team1 | First team |
| team2 | Second team |
| date | Match date and time |
| venue | Match location |
| price | Ticket price |
| available_seats | Remaining seats |

### Bookings Table

| Column | Description |
|--------|-------------|
| id | Unique booking ID |
| match_id | Foreign key referencing matches |
| customer_name | Name of the customer |
| tickets | Number of tickets booked |
| total_price | Total booking amount |
| booking_date | Date and time of booking |

## Installation and Setup

1. Clone the repository:

       git clone https://github.com/Amrita200626/react-ipl-booking.git

2. Navigate to the project folder:

       cd react-ipl-booking

3. Install the required dependencies:

       npm install

4. Create a Supabase project and configure the matches
   and bookings tables, RLS policies and realtime publication.

5. Create a .env.local file in the root directory:

       VITE_SUPABASE_URL=YOUR_PROJECT_URL
       VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY

6. Start the development server:

       npm run dev

7. Open the localhost URL displayed in the terminal.

## How It Works

1. Match details are fetched from the Supabase database.
2. Users select a match and click Book Ticket.
3. Users enter their name and ticket quantity.
4. The application validates the available seats.
5. The total ticket price is calculated.
6. Available seats are updated in the matches table.
7. Booking details are inserted into the bookings table.
8. The booking counter and My Bookings section are updated.
9. When available seats reach zero, the match displays Sold Out.

## Learning Outcomes

- Understanding React components, JSX, props and state.
- Working with React Hooks such as useState and useEffect.
- Connecting frontend applications to a database.
- Performing database operations using Supabase.
- Implementing realtime database subscriptions.
- Creating responsive layouts using CSS Grid and Flexbox.
- Managing project versions using Git and GitHub.

## Project Limitations

This project is developed for educational purposes.
It uses demonstration database policies and does not
include user authentication or real payment processing.
Only fictional customer information should be used.

## Future Enhancements

- User authentication and registration
- Secure payment integration
- Individual user booking history
- Ticket cancellation functionality
- QR code-based tickets
- Admin dashboard
- Secure and atomic database booking operations

## GitHub Repository

https://github.com/Amrita200626/react-ipl-booking

## Developer Details

- Name: Amrita Jyoti
- SRN: R25EF025
- Course: B.Tech Computer Science and Engineering
- Project: IPL 2026 Ticket Booking System

## Conclusion

This project demonstrates the integration of React JS
with Supabase and PostgreSQL to develop a responsive,
database-driven ticket booking application with
persistent storage and realtime updates.
