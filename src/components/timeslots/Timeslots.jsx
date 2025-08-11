import React, { useContext, useEffect, useState } from "react";
import "./Timeslots.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "../Modal/Modal";
import { DataContext } from "../../App";

function Timeslots() {
  const [showModal, setShowModal] = useState(false);
  const timeslots = 24;
  const [selectdIndex, setSelectedIndex] = useState();

  //get from context defined in App js
  const { checkForValues, setCheckForValues } = useContext(DataContext);

  //check booked slots
  const [bookedSlots, setBookedSlots] = useState([]);

  function handleShowModal(index) {
    setShowModal(true);
    setSelectedIndex(index);
    console.log(`index: ${index}`);
  }

  function handleCloseModal() {
    setShowModal(false);
  }
  function updateSelectedSlot() {
    // If selectdIndex is NOT already in the bookedSlots array.
    if (!bookedSlots.includes(selectdIndex)) {
      setBookedSlots([...bookedSlots, selectdIndex]);
    }
    console.log(bookedSlots);
    setCheckForValues(false);
  }
  useEffect(() => {
    if (checkForValues) {
      console.log("Checking status from Timeslots: " + checkForValues);

      updateSelectedSlot();
    }
  }, [checkForValues]);

  return (
    <>
      <div className="timeslots_container">
        {Array.from({ length: timeslots }).map((_, index) => (
          <Row key={index} className="timeslots">
            <Col className="col-md-1 left-col">{index + 1}</Col>
            <Col
              onClick={() => handleShowModal(index)}
              className={`col-md-11 right-col ${
                bookedSlots.includes(index) ? "booked" : ""
              }`}
            ></Col>
          </Row>
        ))}
      </div>

      {showModal && (
        <Modal selectdIndex={selectdIndex} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default Timeslots;
