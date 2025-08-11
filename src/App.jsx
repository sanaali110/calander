import { useState } from "react";
import { Link } from "react-router-dom";
import Timeslots from "./components/timeslots/Timeslots";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import "./App.css";
import { createContext } from "react";

export const DataContext = createContext();

function App() {
  const [checkForValues, setCheckForValues] = useState(false);

  function getCurrentDate() {
    const date = new Date();
    return date.toISOString().split("T")[0];
  }
  function getCurrentMonth() {
    const month = new Date();
    return month.toLocaleDateString("en-US", { month: "long" });
  }

  return (
    <DataContext.Provider value={{ checkForValues, setCheckForValues }}>
      <Container>
        <div className="calendar">
          <h1>Calendar</h1>
          <Link to="/today">Today</Link>
          <button className="currentMonth">Month</button>
          <h5>{getCurrentDate()}</h5>
          <p>{getCurrentMonth()}</p>
          <Timeslots />
        </div>
      </Container>
    </DataContext.Provider>
  );
}

export default App;
