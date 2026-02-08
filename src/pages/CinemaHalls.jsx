import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/cinema.css";

export default function CinemaHalls() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { movie, city } = state;

  const cinemas = [
    { name: "PVR Cinemas", location: city },
    { name: "INOX", location: city },
    { name: "Cinepolis", location: city },
    { name: "AGS Cinemas", location: city },
    { name: "GRD Cinemas", location: city },
    { name: "Wave Cinemas", location: city },
  ];

  const times = ["10:00 AM", "1:30 PM", "6:00 PM", "9:30 PM"];

  const [selectedCinema, setSelectedCinema] = useState(null);
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const bookTicket = (time) => {
  const booking = {
    movie: movie.title,
    poster: movie.poster_path,
    cinema: selectedCinema.name,
    city,
    date,
    time,
    seats: ["A1", "A2"]   
  };

  const oldBookings =
    JSON.parse(localStorage.getItem("bookings")) || [];

  localStorage.setItem(
    "bookings",
    JSON.stringify([...oldBookings, booking])
  );

  navigate("/success", { state: booking });  
};

  return (
    <div className="cinema-page">
      <div className="cinema-movie-header">
  <img
    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
    alt={movie.title}
    className="cinema-poster"
  />

  <div>
    <h1 className="cinema-title">{movie.title}</h1>
    <p className="cinema-meta">
      ⭐ {movie.vote_average.toFixed(1)} | 📅 {movie.release_date?.slice(0,4)}
    </p>
  </div>
</div>
      <h2 className="cinema-subtitle">
        Select Cinema in {city}
      </h2>

      <div className="cinema-grid">
        {cinemas.map((cinema, index) => (
          <div key={index} className="cinema-card">
            <div
              className="cinema-header"
              onClick={() =>
                setSelectedCinema(
                  selectedCinema?.name === cinema.name
                    ? null
                    : cinema
                )
              }
            >
              <h3>{cinema.name}</h3>
              <p>📍 {cinema.location}</p>
              <span className="arrow">
                {selectedCinema?.name === cinema.name
                  ? "▲"
                  : "▼"}
              </span>
            </div>

            {/* INLINE SHOWTIME */}
            {selectedCinema?.name === cinema.name && (
              <div className="showtime-box">
                <div className="date-section">
                  <label>Select Date</label>
                  <input
                    type="date"
                    value={date}
                    min={new Date()
                      .toISOString()
                      .split("T")[0]}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                  />
                </div>

                <h4>Select Show Time</h4>
                <div className="time-grid">
                  {times.map((time) => (
                    <button
                      key={time}
                      onClick={() => bookTicket(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
