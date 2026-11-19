
function MatchCard({
    team1,
    team2,
    date,
    venue,
    price,
    availableSeats,
    onBook
}) {
    return (
        <div className="match-card">

            <h3>{team1} vs {team2}</h3>

            <p>Date: {date}</p>

            <p>Venue: {venue}</p>

            <p>Ticket Price: ₹{price}</p>

            <p className="seats">
                Available Tickets: {availableSeats}
            </p>

            <button
                type="button"
                onClick={onBook}
                disabled={availableSeats === 0}
            >
                {availableSeats > 0 ? "Book Ticket" : "Sold Out"}
            </button>

        </div>
    );
}

export default MatchCard;
