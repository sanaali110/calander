import React, { useContext, useEffect, useState } from "react";
import "./Timeslots.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookingSlotModal from "../BookingSlotModal/BookingSlotModal";
import classNames from "classnames"
// import { DataContext } from "../../App";

const timeslots = 24;

function Timeslots() {
  const [slots, setSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [selectdIndex, setSelectedIndex] = useState();

  //get from context defined in App js
  // Avoid using useContext as this can easily get messy with large project and will make debugging difficult.
  // const { checkForValues, setCheckForValues } = useContext(DataContext);

  //check booked slots
  const [bookedSlots, setBookedSlots] = useState([]);

  const onClickSlot = (index) => {
    console.log(`index: ${index}`);
    setSelectedIndex(index);
    setShowModal(true);
  }

  const onBookingSlot = (formData) => {
    console.log('formdata', formData);
    setSlots([...slots, formData]);
    setShowModal(false);
  }

  // function updateSelectedSlot() {
  //   // If selectdIndex is NOT already in the bookedSlots array.
  //   if (!bookedSlots.includes(selectdIndex)) {
  //     setBookedSlots([...bookedSlots, selectdIndex]);
  //   }
  //   console.log(bookedSlots);
  //   setCheckForValues(false);
  // }
  // useEffect(() => {
  //   if (checkForValues) {
  //     console.log("Checking status from Timeslots: " + checkForValues);

  //     updateSelectedSlot();
  //   }
  // }, [checkForValues]);

  console.log('slots', slots)
  return (
    <>
      <div className="timeslots_container">
        {Array.from({ length: timeslots }).map((_, index) => {
          const slotSelected = slots.find((slot) => slot.index === index)

          return (
            <Row key={index} className="timeslots">
              <Col className="col-md-1 left-col">{index + 1}</Col>
              {!slotSelected ?
                <Col
                  onClick={() => onClickSlot(index)}
                  className={classNames("col-md-11 right-col")}
                ></Col> : <Col className="col-md-11 right-col booked">
                  <span>Title: {slotSelected.title}</span>
                  <span>Description: {slotSelected.desc}</span>
                  <span>Location: {slotSelected.location}</span>
                </Col>}
            </Row>
          )
        })}
      </div>

      {showModal && (
        <BookingSlotModal selectdIndex={selectdIndex} onBookingSlot={onBookingSlot} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

export default Timeslots;
