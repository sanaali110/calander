import React, { useState, useContext } from "react";
import { DataContext } from "../../App";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Modal.css";

function Modal({ selectdIndex, onClose }) {
  const [error, setError] = useState(); //error handling
  const [title, setTitle] = useState(); //set Title
  const [desc, setDesc] = useState(); //set describtion
  const [location, setLocation] = useState(); //set Location

  //get from context defined in App js
  const { checkForValues, setCheckForValues } = useContext(DataContext);

  const handlebookMeetingTime = async (e) => {
    console.log("When values have not been checked: " + checkForValues);
    e.preventDefault();
    checkValuesInput();


  };
  function checkValuesInput() {
    if (title && desc && location) {
      setError("");
      setCheckForValues(true);
      onClose();
    } else {
      setError("Please enter the missing details");
      setCheckForValues(false);
      console.log("When values are not added:" + checkForValues);
    }
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
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="bookingDesc">All describtion</Form.Label>
          <Form.Control
            required
            type="text"
            id="bookingDesc"
            onChange={(e) => setDesc(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="bookingLocation">Location</Form.Label>
          <Form.Control
            required
            id="bookingLocation"
            type="text"
            onChange={(e) => setLocation(e.target.value)}
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
          onClick={handlebookMeetingTime}
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
