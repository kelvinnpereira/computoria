import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

const Agenda = ({ usuario, diasUteis, agenda }) => {
  const businessHours = diasUteis.map((item) => {
    return {
      daysOfWeek: [item.dia],
      startTime: item.hora_inicio,
      endTime: item.hora_fim,
    }
  });

  const events = agenda?.filter(item => item.status === 'agendada' || item.status === 'solicitada').map((item, id) => {
    return {
      id: id,
      title: usuario.matricula === item.matricula_tutor ? 'Tutoria ' + item.status: 'Aula ' + item.status,
      start: item.data_inicio,
      end: item.data_fim,
      color: usuario.matricula === item.matricula_tutor ? 'red': 'green',
    }
  });

  function renderEventContent(eventInfo) {
    const start = (new Date(eventInfo.event.start).toLocaleTimeString().slice(0, -3));
    const end = (new Date(eventInfo.event.end).toLocaleTimeString().slice(0, -3));
    return (
      <>
        <b>{`${start} as ${end}`}</b> <i>{` - ${eventInfo.event.title}`}</i>
      </>
    );
  }

  const handleDateSelect = (selectInfo) => {
    const calendarApi = selectInfo.view.calendar;
    if (selectInfo.view.type === "dayGridMonth" && isBusinessDay(selectInfo)) {
      calendarApi.gotoDate(selectInfo.startStr);
      const button = document.getElementsByClassName("fc-timeGridDay-button")[0];
      button.click();
    } else if (isBusinessHour(selectInfo)) {

    }
  };

  const isBusinessDay = (date) => {
    const start = (new Date(date.startStr)).getDay();
    const end = (new Date(date.endStr)).getDay();
    for (const item of businessHours) {
      if (
        item.daysOfWeek.includes(start + 1) &&
        (date.allDay || item.daysOfWeek.includes(end))
      ) {
        return true;
      }
    }
    return false;
  }

  const isBusinessHour = (date) => {
    const start = new Date(date.startStr);
    const end = new Date(date.endStr);
    for (const item of businessHours) {
      if (
        item.daysOfWeek.includes(start.getDay()) &&
        item.daysOfWeek.includes(end.getDay()) &&
        start.toLocaleTimeString() >= item.startTime &&
        end.toLocaleTimeString() <= item.endTime
      ) {
        return true;
      }
    }
    return false;
  }

  const handleEventClick = (clickInfo) => { };

  const handleEvents = (events) => { };

  return (
    <div className="App">
      <FullCalendar
        events={events}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        initialView="dayGridMonth"
        editable={false}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        select={handleDateSelect}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        eventsSet={handleEvents}
        businessHours={businessHours}
        eventColor={"green"}
      />
    </div>
  );
}

export default Agenda;
