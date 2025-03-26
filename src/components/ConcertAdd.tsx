import { useState } from "react";
import Concert from "../interface/concert";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ConcertAdd() {
    const [concert, setConcerts] = useState<Concert>({
        id: 0,
        fellepo: "",
        startTime: new Date(),
        idotartam: 0,
        elmarad: false,
      });
      const [loading, setLoading] = useState<boolean>(false);
      const [error, setError] = useState<string | null>(null);
      const [success, setSuccess] = useState<boolean>(false);
      const [date, setDate] = useState<string>("");
      const [time, setTime] = useState<string>("");
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        const start = new Date();
        start.setDate(parseInt(date, 10));
        start.setHours(parseInt(time.split(":")[0], 10));
        start.setMinutes(parseInt(time.split(":")[1], 10));
        
        setConcerts({
          ...concert,
          startTime: start, 
        });
    
        try {
          const response = await fetch("http://localhost:3000/concert", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fellepo: concert.fellepo,
              startTime: concert.startTime,
              idotartam: concert.idotartam,
            }),
          });
    
          if (!response.ok) {
            throw new Error("Sikertelen koncert feltöltés.");
          }
    
          setSuccess(true);
          setConcerts({
            id: 0,
            fellepo: "",
            startTime: new Date(),
            idotartam: 0,
            elmarad: false,
          });
          setDate("");
          setTime("");
        } catch (err) {
          setError("Hiba! Sikertelen koncert feltöltés.");
        } finally {
          setLoading(false);
        }
      };
    
      const handleInputChangeFellepo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConcerts({ ...concert, fellepo: e.target.value });
      };
    
      
      const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
        setConcerts({
          ...concert,
          startTime: new Date(e.target.value + "T" + time),
        });
      };
    
      const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(e.target.value);
        setConcerts({
          ...concert,
          startTime: new Date(date + "T" + e.target.value),
        });
      };
    
      const handleInputChangeIdotartam = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConcerts({ ...concert, idotartam: parseInt(e.target.value, 10) || 0 });
      };
    
      return (
        <div>
          <h2>Felvétel</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
              <label htmlFor="fellepo" className="form-label">
                Fellépő
              </label>
              <input
                type="text"
                className="form-control"
                id="fellepo"
                name="fellepo"
                value={concert.fellepo}
                onChange={handleInputChangeFellepo}
                required
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="startTime" className="form-label">
                Kezdés
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={date}
                onChange={handleDateChange}
                required
              />
              <input
                type="time"
                className="form-control"
                id="time"
                name="time"
                value={time}
                onChange={handleTimeChange}
                required
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="idotartam" className="form-label">
                Időtartam
              </label>
              <input
                type="number"
                className="form-control"
                id="idotartam"
                name="idotartam"
                value={concert.idotartam}
                onChange={handleInputChangeIdotartam}
                required
              />
            </div>
    
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Adding..." : "Felvétel"}
            </button>
    
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && <div className="alert alert-success mt-3">Sikerült!</div>}
          </form>
        </div>
      );
}
