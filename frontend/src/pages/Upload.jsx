import React from "react";
import { useNavigate } from "react-router-dom"
export default function Upload() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [formData, setFormData] = React.useState({
        title: "",
        location: "",
        timeStamp: "",
        text: "",
    });
    const [errors, setErrors] = React.useState({});

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));
    }

    function validateForm() {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        }

        if (!formData.location.trim()) {
            newErrors.location = "Location is required";
        }

        if (!formData.timeStamp.trim()) {
            newErrors.timeStamp = "Date and time are required";
        }

        if (!formData.text.trim()) {
            newErrors.text = "Story details are required";
        }

        if (formData.title.length > 100) {
            newErrors.title = "Title cannot exceed 100 characters";
        }

        if (formData.location.length > 100) {
            newErrors.location = "Location cannot exceed 100 characters";
        }

        if (formData.text.length > 5000) {
            newErrors.text = "Story cannot exceed 5000 characters";
        }
        if (isNaN(Date.parse(formData.timeStamp))) {
            newErrors.timeStamp = "Invalid date";
        }

        return newErrors;
    }
    async function handleSubmit(event) {
        event.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try {
            setIsSubmitting(true);
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
            if (response.ok) {
                navigate("/read", {
                    state: {
                        successMessage: "Story submitted successfully!",
                        newStoryId: data.data.uuid
                    }
                });
            }

            console.log(data);

        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
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
                {errors.title && (
                    <p className="error-message">
                        {errors.title}
                    </p>
                )}

                <label>
                    Time/Date:
                </label>

                <input
                    type="datetime-local"
                    name="timeStamp"
                    value={formData.timeStamp}
                    onChange={handleChange}
                />
                {errors.timeStamp && (
                    <p className="error-message">
                        {errors.timeStamp}
                    </p>
                )}
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
                {errors.location && (
                    <p className="error-message">
                        {errors.location}
                    </p>
                )}
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
                <p className="character-counter">
                    {formData.text.length}/5000
                </p>
                {errors.text && (
                    <p className="error-message">
                        {errors.text}
                    </p>
                )}
                <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "SUBMIT"}
                </button>

            </form>

        </section>
    );
}