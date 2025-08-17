import dayjs from "dayjs"
import { Link } from "react-router-dom";


// momento, dayjs - are two powerful library that provides inbuilt methods to format and manupulate date and time. 
const CalenderTitle = () => {
    return <>
        <h1>Calendar</h1>
        <Link to="/today">Today</Link>
        <button className="currentMonth">Month</button>
        <h5>{dayjs().format('DD-MM-YYYY')}</h5>
        <p>{dayjs().format('MMMM')}</p>
    </>
}

export default CalenderTitle