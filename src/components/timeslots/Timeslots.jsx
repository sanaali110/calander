import React, { useState } from "react";
import "./Timeslots.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classNames from "classnames"
import BookingSlotModal from "../BookingSlotModal/BookingSlotModal";

function Timeslots() {
  const [showModal, setShowModal] = useState(false);
  const timeslots = 24;
  const [selectedIndex, setSelectedIndex] = useState();
  //check booked slots
  const [slots, setSlots] = useState([]);

  const onClickSlot = (index) => {
    setShowModal(true);
    setSelectedIndex(index);
    console.log(`index: ${index}`);
  }

  const onBookingSlot = (formData) => {
    console.log('formdata',formData);
    setSlots([...slots,formData])
     setShowModal(false);
  }
  const onCloseModal = () => {
    setShowModal(false);
  }

  return (
  <>
  <div className="timeslots_container">
    {Array.from({length:timeslots}).map((_,index)=>{
      const slotSelected  = slots.find((slot)=>slot.index === index)
      return(
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
  <BookingSlotModal selectedIndex={selectedIndex} onBookingSlot={onBookingSlot} onClose={(e)=>setShowModal(false)}/>}
  </>
  )

}
export default Timeslots;
