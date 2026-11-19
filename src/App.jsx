
import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";

import "./App.css";

function App() {

    // Match Data
    const initialMatches = [
        {
            id: 1,
            team1: "CSK",
            team2: "MI",
            date: "10 April, 7:30 PM",
            venue: "Chennai",
            price: 800,
            availableSeats: 3
        },
        {
            id: 2,
            team1: "RCB",
            team2: "KKR",
            date: "12 April, 7:30 PM",
            venue: "Bengaluru",
            price: 900,
            availableSeats: 3
        },
        {
            id: 3,
            team1: "MI",
            team2: "RR",
            date: "15 April, 3:30 PM",
            venue: "Mumbai",
            price: 700,
            availableSeats: 3
        }
    ];

    // React State
    const [matches, setMatches] = useState(initialMatches);
    const [showMatches, setShowMatches] = useState(true);
    const [bookingCount, setBookingCount] = useState(0);

    // Book Ticket Function
    function handleBooking(matchId) {

        const selectedMatch = matches.find(
            (match) => match.id === matchId
        );

        if (!selectedMatch || selectedMatch.availableSeats === 0) {
            return;
        }

        // Reduce available tickets
        setMatches((previousMatches) =>
            previousMatches.map((match) =>
                match.id === matchId
                    ? {
                        ...match,
                        availableSeats: match.availableSeats - 1
                    }
                    : match
            )
        );

        // Increase total bookings
        setBookingCount((count) => count + 1);
    }

    return (
        <>
            <Navbar bookingCount={bookingCount} />

            <Hero />

            {/* Match Schedule */}
            <section id="matches">
                <h2>Match Schedule</h2>

                <button
                    type="button"
                    onClick={() => setShowMatches(!showMatches)}
                >
                    {showMatches ? "Hide Matches" : "Show Matches"}
                </button>

                {showMatches && (
                    <div className="match-grid">
                        {matches.map((match) => (
                            <MatchCard
                                key={match.id}
                                team1={match.team1}
                                team2={match.team2}
                                date={match.date}
                                venue={match.venue}
                                price={match.price}
                                availableSeats={match.availableSeats}
                                onBook={() => handleBooking(match.id)}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Booking Section */}
            <section id="booking">
                <h2>Ticket Booking</h2>

                <p>
                    Book tickets for your favourite IPL matches.
                </p>

                <h3>Total Bookings: {bookingCount}</h3>

                <p>
                    Each match has a limited number of tickets.
                    Once all tickets are booked, the match
                    will automatically show Sold Out.
                </p>
            </section>

            {/* Footer */}
            <footer>
                <p>© 2026 IPL Ticket Booking</p>
            </footer>
        </>
    );
}

export default App;
