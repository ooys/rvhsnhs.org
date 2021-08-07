import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

const customEventPropGetter = (event) => {
    if (event.specialType) {
        return { className: "calendar-" + event.specialType };
    } else return {};
};

const MyCalendar = ({ myEventsList }) => (
    <>
        <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, width: "100%" }}
            onSelectEvent={(event) => alert(event.title)}
            eventPropGetter={customEventPropGetter}
        />
    </>
);

function DisplayCalendar({ events }) {
    return <MyCalendar myEventsList={events} />;
}

export default DisplayCalendar;
