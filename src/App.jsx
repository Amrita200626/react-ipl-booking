
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import { supabase } from "./supabase";

import "./App.css";

function App() {

    const [matches, setMatches] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [showMatches, setShowMatches] = useState(true);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [bookingInProgress, setBookingInProgress] = useState(false);

    // Fetch matches from Supabase
    async function fetchMatches() {

        const { data, error } = await supabase
            .from("matches")
            .select("*")
            .order("id", { ascending: true });

        if (error) {
            console.log(error);
            setMessage("Unable to load matches.");
        } else {
            setMatches(data);
        }

        setLoading(false);
    }

    // Fetch saved bookings from Supabase
    async function fetchBookings() {

        const { data, error } = await supabase
            .from("bookings")
            .select("*, matches(team1, team2)")
            .order("booking_date", { ascending: false });

        if (error) {
            console.log(error);
            setMessage("Unable to load bookings.");
        } else {
            setBookings(data);
        }
    }

    // Load database records when the page opens
    useEffect(() => {

        fetchMatches();
        fetchBookings();

        // Realtime subscription
        const channel = supabase
            .channel("ipl-booking-realtime")

            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "matches"
                },
                () => {
                    fetchMatches();
                }
            )

            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "bookings"
                },
                () => {
                    fetchBookings();
                }
            )

            .subscribe();

        // Remove subscription when component unmounts
        return () => {
            supabase.removeChannel(channel);
        };

    }, []);

    // Book tickets
    async function handleBooking(match) {

        if (bookingInProgress) {
            return;
        }

        if (match.available_seats <= 0) {
            setMessage("Sorry! This match is sold out.");
            return;
        }

        // Get customer name
        const customerName = prompt("Enter customer name:");

        if (!customerName || !customerName.trim()) {
            return;
        }

        // Get number of tickets
        const quantityInput = prompt(
            `Enter number of tickets (Available: ${match.available_seats}):`,
            "1"
        );

        if (quantityInput === null) {
            return;
        }

        const quantity = Number(quantityInput);

        // Validate ticket quantity
        if (
            !Number.isInteger(quantity) ||
            quantity <= 0 ||
            quantity > match.available_seats
        ) {
            setMessage("Please enter a valid ticket quantity.");
            return;
        }

        setBookingInProgress(true);
        setMessage("");

        try {

            // Calculate total price
            const totalPrice = match.price * quantity;

            // Update available seats
            const { data: updatedMatch, error: updateError } =
                await supabase
                    .from("matches")
                    .update({
                        available_seats:
                            match.available_seats - quantity
                    })
                    .eq("id", match.id)
                    .eq("available_seats", match.available_seats)
                    .select()
                    .maybeSingle();

            if (updateError) {
                throw updateError;
            }

            // Check whether availability changed
            if (!updatedMatch) {
                setMessage(
                    "Ticket availability has changed. Please try again."
                );
                await fetchMatches();
                return;
            }

            // Insert booking into the database
            const { error: bookingError } = await supabase
                .from("bookings")
                .insert([
                    {
                        match_id: match.id,
                        customer_name: customerName.trim(),
                        tickets: quantity,
                        total_price: totalPrice
                    }
                ]);

            if (bookingError) {

                // Attempt to restore seats if booking fails
                const { data: restored, error: restoreError } =
                    await supabase
                        .from("matches")
                        .update({
                            available_seats: match.available_seats
                        })
                        .eq("id", match.id)
                        .eq(
                            "available_seats",
                            match.available_seats - quantity
                        )
                        .select();

                if (restoreError || !restored?.length) {
                    setMessage(
                        "Booking failed. Seat availability needs checking."
                    );
                    await fetchMatches();
                    return;
                }

                throw bookingError;
            }

            // Display success message
            setMessage(
                `Booking successful! ${quantity} ticket(s) booked for ${match.team1} vs ${match.team2}.`
            );

            // Refresh database records
            await fetchMatches();
            await fetchBookings();

        } catch (error) {

            console.log(error);

            setMessage(
                "Booking failed. Please try again."
            );

        } finally {

            setBookingInProgress(false);

        }
    }

    // Calculate total number of tickets booked
    const bookingCount = bookings.reduce(
        (total, booking) => total + booking.tickets,
        0
    );

    return (
        <>
            <Navbar bookingCount={bookingCount} />

            <Hero />

            {/* Match Schedule */}
            <section id="matches">

                <h2>Match Schedule</h2>

                <p className="booking-total">
                    Total Tickets Booked: {bookingCount}
                </p>

                {message && (
                    <p className="booking-message" role="status">
                        {message}
                    </p>
                )}

                <button
                    type="button"
                    onClick={() => setShowMatches(!showMatches)}
                >
                    {showMatches
                        ? "Hide Matches"
                        : "Show Matches"}
                </button>

                {loading && (
                    <p>Loading matches from Supabase...</p>
                )}

                {!loading && matches.length === 0 && (
                    <p>No matches available.</p>
                )}

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
                                availableSeats={
                                    match.available_seats
                                }
                                onBook={() =>
                                    handleBooking(match)
                                }
                                bookingInProgress={
                                    bookingInProgress
                                }
                            />

                        ))}

                    </div>
                )}

            </section>

            {/* Booking Information */}
            <section id="booking">

                <h2>Ticket Booking</h2>

                <p>
                    Select your favourite match and click
                    Book Ticket to reserve your tickets.
                </p>

                <p>
                    Your booking details are saved in the
                    Supabase database.
                </p>

            </section>

            {/* My Bookings */}
            <section id="mybookings">

                <h2>My Bookings</h2>

                {bookings.length === 0 ? (

                    <p>No bookings found.</p>

                ) : (

                    <div className="table-container">

                        <table>

                            <thead>
                                <tr>
                                    <th>Customer Name</th>
                                    <th>Match</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    <th>Booking Date</th>
                                </tr>
                            </thead>

                            <tbody>

                                {bookings.map((booking) => (

                                    <tr key={booking.id}>

                                        <td>
                                            {booking.customer_name}
                                        </td>

                                        <td>
                                            {booking.matches?.team1}
                                            {" vs "}
                                            {booking.matches?.team2}
                                        </td>

                                        <td>
                                            {booking.tickets}
                                        </td>

                                        <td>
                                            ₹{booking.total_price}
                                        </td>

                                        <td>
                                            {new Date(
                                                booking.booking_date
                                            ).toLocaleString("en-IN")}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </section>

            {/* Footer */}
            <footer>
                <p>© 2026 IPL Ticket Booking</p>
            </footer>

        </>
    );
}

export default App;
