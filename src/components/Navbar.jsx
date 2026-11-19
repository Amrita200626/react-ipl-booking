
function Navbar({ bookingCount }) {
    return (
        <header className="navbar">
            <h1>IPL 2026 Ticket Booking</h1>

            <nav>
                <a href="#matches">Matches</a>
                <a href="#booking">Book Ticket</a>
                <span className="booking-count">
                    Bookings: {bookingCount}
                </span>
            </nav>
        </header>
    );
}

export default Navbar;
