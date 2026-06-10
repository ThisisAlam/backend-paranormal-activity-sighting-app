import React from "react"
import {
    Link,
    NavLink
} from "react-router-dom"

import ReadById from "./ReadById.jsx"

export default function Read() {
    const [loading, setLoading] = React.useState(true);
    const [sightings, setSightings] = React.useState([]);
    const [error, setError] = React.useState("");
    try {
        React.useEffect(() => {
            fetch("http://localhost:8000/api/sightings")
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setSightings(data.data);
                    setLoading(false);
                });
        }, []);
        console.log(sightings);
    } catch (err) {
        setError("Unable to fetch sightings");
    }
    if (sightings.length === 0) {
        return (
            <h2>No sightings found.</h2>
        );
    }
    if (loading) {
        return <h2>Loading sightings...</h2>;
    }
    if (error) {
        return <h2>{error}</h2>;
    }
    return (
        <section className="read-page">
            <h1 className="read-page-title">
                Sightings
            </h1>
            <div className="sightings-container">
                {sightings.map((sighting) => (
                    <article
                        key={sighting.uuid}
                        className="sighting-card"
                    >
                        <p className="sighting-meta">
                            ⏱️: {sighting.timeStamp}  || 📍: {sighting.location}
                        </p>
                        <h2 className="sighting-title">
                            {sighting.title}
                        </h2>
                        <p className="sighting-preview">
                            {sighting.text.length > 150
                                ? `${sighting.text.slice(0, 150)}...`
                                : sighting.text}
                        </p>
                        <Link
                            to={`/read/${sighting.uuid}`}
                            className="read-more-link"
                        >
                            Read in full
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    )
}