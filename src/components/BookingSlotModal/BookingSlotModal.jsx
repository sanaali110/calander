import React, { useState, useContext } from "react";
import { DataContext } from "../../App";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./BookingSlotModal.css";

function Modal({ selectdIndex, onClose, onBookingSlot }) {
  const [formState, setFormState] = useState({
    title: '',
    desc: '',
    location: '',
    index: selectdIndex
  })
  const [error, setError] = useState();
  // const [title, setTitle] = useState(); 
  // const [desc, setDesc] = useState();
  // const [location, setLocation] = useState();

  //get from context defined in App js - we don't need useContext as this error handling should be internal to this component.
  // const { checkForValues, setCheckForValues } = useContext(DataContext);

  const onBookingTimeSlot = async (e) => {
    // console.log("When values have not been checked: " + checkForValues);
    /* 
    * we don't need this because this is used only for preventing the default behaviuor of any element 
    * e.g. if will click link usually it modifies the url if we want prevent that we can use this methods
    */
    e.preventDefault();
    if (validateInputFields()) {
      console.log('formstate', formState)
      onBookingSlot(formState)
    }
  };

  function validateInputFields() {
    const { title, desc, location } = formState
    const isTitlePresent = title.trim() !== ''
    const isDescriptionPresent = desc.trim() !== ''
    const isLocationPresent = location.trim() !== ''

    const hasError = !(isTitlePresent && isDescriptionPresent && isLocationPresent)
    setError(hasError ? "Please enter the missing details" : undefined)
    return !hasError
  }

  return (
    <div className="popUp">
      <h5>
        Book a meeting: Selected Timeslot: {selectdIndex}-{selectdIndex + 1}
      </h5>
      <Form className="booking-form">
        <Form.Group>
          <Form.Label htmlFor="bookingTitle">Add Title</Form.Label>
          <Form.Control
            required
            id="bookingTitle"
            type="text"
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
            onChange={(e) => setFormState({
              ...formState,
              location: e.target.value
            })}
          />
        </Form.Group>

        <Form.Group>
          {/* {hiddenMessage &&<Form.Label  style={{color:"green",marginBottom:"1rem"}} id="hiddenMessage" >{hiddenMessage}</Form.Label>} */}
          {error && (
            <Form.Label style={{ color: "red", marginBottom: "1rem" }}>
              {error}
            </Form.Label>
          )}
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="buttonStyles"
          onClick={onBookingTimeSlot}
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

export default Modal;
