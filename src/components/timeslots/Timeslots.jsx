import React, { useState, useEffect } from "react";
import "./Timeslots.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classNames from "classnames"
import BookingSlotModal from "../BookingSlotModal/BookingSlotModal";
import { timeslots } from "../../constants";

function Timeslots() {
  const [showModal, setShowModal] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState();
  //check booked slots
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/booking').then(data => {
      data.json().then(bookings => {
        setSlots(bookings);
      })
    }).catch(error => {
      console.error('error getting booking information', error)
    })
  }, [])

  const onClickSlot = (index) => {
    setShowModal(true);
    setSelectedIndex(index);
  }

  const onBookingSlot = (formData) => {
    console.log('formdata', formData);
    setSlots([...slots, formData])
    setShowModal(false);
  }

  return (
    <>
      <div className="timeslots_container">
        {Array.from({ length: timeslots }).map((_, index) => {
          const slotRange = `${index}-${index + 1}`
          const slotSelected = slots.find((slot) => slot.slot === slotRange)
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
      {showModal &&
        <BookingSlotModal selectedIndex={selectedIndex} onBookingSlot={onBookingSlot} onClose={(e) => setShowModal(false)} />}
    </>
  )
}
export default Timeslots;
