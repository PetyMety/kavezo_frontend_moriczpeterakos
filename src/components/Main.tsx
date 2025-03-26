import { useEffect, useState } from "react";
import Concert from "../interface/concert";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Main() {
    const [conterts, setConcerts] = useState<Concert[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    useEffect( () => {
    fetchBooks();
    }, []);
    const fetchBooks = async () => {
      setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/concert");
      if (!response.ok) {
          throw new Error("Failed to fetch concerts.");
      }
      const data = await response.json();
      setConcerts(data);
    } catch (err) {
      setError(`${err} Failed to load concerts.`);
    } finally {
      setLoading(false);
    }
  };
    
    const missConcert = async (concert: Concert) => {
      try {
        const response = await fetch(`http://localhost:3000/concert/${concert.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            elmarad: true
         }),
        });
        if (!response.ok) {
          if (response.status === 404) {
            setError("A koncert nem található (404).");
          } else if (response.status === 409) {
            setError("A koncert már elmaradt (409).");
          } else {
            setError("Sikertelen koncert lemondás. (egyéb hiba)");
          }
        } else {
          setError("Sikeres a koncert lemondás. (200)");
          fetchBooks();
        }
      } catch (err) {
        setError("Sikertelen koncert lemondás." + err);
      }
    };
    return (
        <>
        <h2>Fellépők</h2>
        <div className="container">
            <div className="row">
                
                {loading && <p>Loading fellépők...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {conterts.length === 0 && !loading && <p>No concerts available.</p>}
                <table>
                    <thead>
                        <tr>
                            <th>Fellépő</th>
                            <th>Nap</th>
                            <th>Óra</th>
                            <th>Idotartam</th>
                            <th>Elmarad</th>
                        </tr>
                    </thead>
                    <tbody>
                {conterts.map((concert) => (
                <tr key={concert.id} style={{backgroundColor: concert.elmarad ? "red" : "white",color: concert.elmarad ? "white" : "black"}}>
                    <td>{concert.fellepo}</td>
                    <td>{new Date(concert.startTime).getFullYear()}.{new Date(concert.startTime).getMonth()}.{new Date(concert.startTime).getDate()}.</td>
                    <td>{new Date(concert.startTime).getHours()}:{new Date(concert.startTime).getMinutes()<10 ? "0" : ""}{new Date(concert.startTime).getMinutes()}</td>
                    <td>{concert.idotartam}</td>
                    <td>{concert.elmarad ? "Igen" : "Nem"}</td>
                    <td><button type="button" className="btn btn-primary" disabled={concert.elmarad} onClick={() => missConcert(concert)}  >Elmarad</button></td>
                </tr>
                ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}