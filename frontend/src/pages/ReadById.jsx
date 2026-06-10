import React from "react"
import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom"

export default function ReadById() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [sighting, setSighting] = React.useState(null);
    React.useEffect(() => {
        fetch(`http://localhost:8000/api/sightings/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSighting(data.data);
            });
    }, [id]);
    if (!sighting) {
        return <h2>Loading...</h2>;
    }
    return (
        <>
            <Link
                to="/read"
                className="back-link"
            >
                ← Back to Sightings
            </Link>

            <section className="read-by-id-page">
                <article className="story-card">

                    <h1 className="story-title">
                        {sighting.title}
                    </h1>

                    <p className="story-meta">
                        ⏱️ {sighting.timeStamp}
                        <br />
                        📍 {sighting.location}
                    </p>

                    <div className="story-content">
                        {sighting.text}
                    </div>

                </article>
            </section>
        </>
    )
}