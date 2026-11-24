
function MatchCard({
    team1,
    team2,
    date,
    venue,
    price,
    availableSeats,
    onBook,
    bookingInProgress
}) {

    return (
        <div className="match-card">

            <h3>{team1} vs {team2}</h3>

            <p>Date: {date}</p>

            <p>Venue: {venue}</p>

            <p>Ticket Price: ₹{price}</p>

            <p className="seats">
                Available Seats: {availableSeats}
            </p>

            <button
                type="button"
                onClick={onBook}
                disabled={
                    availableSeats === 0 ||
                    bookingInProgress
                }
            >

                {availableSeats === 0
                    ? "Sold Out"
                    : bookingInProgress
                    ? "Please Wait..."
                    : "Book Ticket"}

            </button>

        </div>
    );
}

export default MatchCard;
