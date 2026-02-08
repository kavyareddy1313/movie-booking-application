import { useLocation, useNavigate } from "react-router-dom";
import "../styles/success.css";

export default function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <h2 style={{color:"white"}}>No booking found</h2>;
  }

  const { movie, poster, cinema, city, date, time, seats } = state;

  return (
    <div className="success-container">
      <div className="success-card">
        <img
  className="success-poster"
  src={`https://image.tmdb.org/t/p/w500${poster}`}
  alt={movie}
/>

        <div className="checkmark">✔</div>

        <h1>Booking Confirmed</h1>
        <p className="sub">
          Your ticket is locked & ready 🎟️
        </p>

        <div className="ticket">
          <div className="row">
            <span>Movie</span>
            <b>{movie}</b>
          </div>

          <div className="row">
            <span>Cinema</span>
            <b>{cinema}</b>
          </div>

          <div className="row">
            <span>City</span>
            <b>{city}</b>
          </div>

          <div className="row">
            <span>Date</span>
            <b>{date}</b>
          </div>

          <div className="row">
            <span>Time</span>
            <b>{time}</b>
          </div>

          <div className="row">
            <span>Seats</span>
            <b>{seats.join(", ")}</b>
          </div>
        </div>

        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>

      </div>
    </div>
  );
}
