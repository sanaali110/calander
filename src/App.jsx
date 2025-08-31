import { useState } from "react";
import Timeslots from "./components/timeslots/Timeslots";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import "./App.css";
import dayjs from "dayjs";
import moment from "moment";

function App() {

  
  return (
      <Container>
        <div className="calendar">
          <h1>Calendar</h1>
          <h5>Date: {dayjs().format('DD/MM/YYYY')}</h5>
          <p>Month: {moment().format('MMMM')}</p>
          <Timeslots  />
        </div>
      </Container>
  );
}

export default App;
