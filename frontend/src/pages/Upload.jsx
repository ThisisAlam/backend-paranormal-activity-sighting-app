import React from "react";
import { useNavigate } from "react-router-dom"
export default function Upload() {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        title: "",
        location: "",
        timeStamp: "",
        text: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (
            !formData.title ||
            !formData.location ||
            !formData.timeStamp ||
            !formData.text
        ) {
            alert("Please fill all fields");
            return;
        }
        try {

            const response = await fetch(
                "http://localhost:8000/api/sightings",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {
                navigate("/read");
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="upload-page">

            <h1 className="upload-title">
                Add Sighting
            </h1>

            <form
                className="upload-form"
                onSubmit={handleSubmit}
            >
                <label>
                    Title:
                </label>

                <input
                    type="text"
                    name="title"
                    placeholder="A ghostly encounter"
                    value={formData.title}
                    onChange={handleChange}
                />

                <label>
                    Time/Date:
                </label>

                <input
                    type="datetime-local"
                    name="timeStamp"
                    value={formData.timeStamp}
                    onChange={handleChange}
                />

                <label>
                    Location:
                </label>

                <input
                    type="text"
                    name="location"
                    placeholder="London, UK"
                    value={formData.location}
                    onChange={handleChange}
                />

                <label>
                    Details:
                </label>

                <textarea
                    name="text"
                    rows="6"
                    placeholder="I was trying to get to sleep when..."
                    value={formData.text}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="submit-btn"
                >
                    SUBMIT
                </button>

            </form>

        </section>
    );
}