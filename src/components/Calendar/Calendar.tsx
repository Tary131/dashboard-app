import { useState, useEffect, FC } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core';
import CalendarModal from './CalendarModal.tsx';

const Calendar: FC = () => {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);
  const [defaultStartTime, setDefaultStartTime] = useState('');

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const start = selectInfo.startStr;
    setSelectedEvent({
      id: String(events.length + 1),
      start,
    });
    setDefaultStartTime(start);
    setModalVisible(true);
    selectInfo.view.calendar.unselect();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      window.confirm(
        `Do you want to delete the event '${clickInfo.event.title}'?`
      )
    ) {
      setEvents(events.filter((event) => event.id !== clickInfo.event.id));
    }
  };

  const handleSaveEvent = (eventDetails: {
    title: string;
    category: string;
    start: string;
    end?: string;
  }) => {
    if (selectedEvent) {
      const newEvent = {
        ...selectedEvent,
        title: eventDetails.title,
        start: eventDetails.start,
        end: eventDetails.end || undefined,
        color: getCategoryColor(eventDetails.category),
      };
      setEvents([...events, newEvent]);
      setModalVisible(false);
      setSelectedEvent(null);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Lesson':
        return '#FF5733'; // Red
      case 'Test':
        return '#33FF57'; // Green
      case 'Meeting':
        return '#3357FF'; // Blue
      default:
        return '#999999'; // Default Grey
    }
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        eventColor="#374151"
        dayMaxEventRows={3}
        fixedWeekCount={false}
        eventTextColor="white"
      />
      {modalVisible && (
        <CalendarModal
          onClose={() => setModalVisible(false)}
          onSave={handleSaveEvent}
          defaultStart={defaultStartTime}
        />
      )}
    </>
  );
};

export default Calendar;
