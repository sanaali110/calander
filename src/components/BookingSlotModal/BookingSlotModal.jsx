import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./BookingSlotModal.css";
import { timeslots } from "../../constants";

function BookingSlotModal({ selectedIndex, onClose, onBookingSlot }) {
  const [formState, setFormState] = useState({
    title: "",
    desc: "",
    location: "",
    slot: "",
    index: selectedIndex
  });

  const [error, setError] = useState();
  const [message, setMessage] = useState("");

  const onBookingTimeSlot = async (e) => {
    e.preventDefault();
    if (validateInputFields()) {
      console.log("Validation result:", validateInputFields());
    }

    try {
      const response = await fetch("http://localhost:8080/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState)
      })
      const result = await response.text();
      console.log("Server response:", result);

      if (response.ok) {
        setMessage("Slot Booked");
        onBookingSlot(formState)
      } else {
        setMessage("This slot is not available to book, please select a different slot");
      }
    } catch (err) {
      setError("Failed to book this slot");
    }
  };

  function validateInputFields() {
    const { title, desc, location, slot } = formState
    const isTitlePresent = title.trim() !== ''
    const isDescriptionPresent = desc.trim() !== ''
    const isLocationPresent = location.trim() !== ''
    const isSlotPresent = slot.trim() !== ''
    const hasError = !(isTitlePresent && isDescriptionPresent && isLocationPresent && isSlotPresent)
    setError(hasError ? "Please enter the missign details" : undefined)
    return !hasError;
  }

  return (
    <div className="popUp">
      <h5>
        Book a meeting: Selected Timeslot: {selectedIndex}-{selectedIndex + 1}
      </h5>
      <Form onSubmit={onBookingTimeSlot} className="booking-form">
        <Form.Group>

          <Form.Select id="selectTime" name="slot" onChange={
            (e) => setFormState({
              ...formState,
              slot: e.target.value
            })}>
            <option>
              Select a time slot for the meeting
            </option>
            {Array.from({ length: timeslots }).map((_, index) => {
              const slot = `${index}-${index + 1}`
              return <option value={slot}>{slot}</option>
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="bookingTitle">Add Title</Form.Label>
          <Form.Control
            required
            id="bookingTitle"
            type="text"
            name="title"
            onChange={(e) => setFormState({
              ...formState,
              title: e.target.value
            })}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="bookingDesc">All describtion</Form.Label>
          <Form.Control
            required
            type="text"
            id="bookingDesc"
            name="desc"
            onChange={(e) => setFormState({
              ...formState,
              desc: e.target.value
            })}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="bookingLocation">Location</Form.Label>
          <Form.Control
            required
            id="bookingLocation"
            type="text"
            name="location"
            onChange={(e) => setFormState({
              ...formState,
              location: e.target.value
            })}
          />
        </Form.Group>

        <Form.Group>

          {error && (
            <Form.Label style={{ color: "red", marginBottom: "1rem" }}>
              {error}
            </Form.Label>
          )}
          {message && <p>{message}</p>}
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="buttonStyles"

        >
          Select this time
        </Button>
        <Button
          variant="danger"
          onClick={onClose}
          className="close buttonStyles"
        >
          Close
        </Button>
      </Form>
    </div>
  );
}

export default BookingSlotModal;
