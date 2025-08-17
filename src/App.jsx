import Timeslots from "./components/timeslots/Timeslots";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import "./App.css";
import { createContext } from "react";
import CalenderTitle from "./views/CalenderTitle/CalenderTitle";

export const DataContext = createContext();

function App() {

  // const [checkForValues, setCheckForValues] = useState(false);
  return (
    // <DataContext.Provider value={{ checkForValues, setCheckForValues }}>
    <Container>
      <div className="calendar">
        <CalenderTitle />
        <Timeslots />
      </div>
    </Container>
    // </DataContext.Provider>
  );
}

export default App;
