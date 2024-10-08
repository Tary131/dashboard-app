import { FC, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchCalendarEvents,
  addCalendarEvent,
  deleteCalendarEvent,
} from '../../redux/slices/calendarSlice';
import CalendarModal from './CalendarModal';
import {
  selectIsLoggedIn,
  selectUser,
} from '../../redux/slices/auth/authSlice.ts';
import {
  selectCalendarEvents,
  selectCalendarLoading,
  selectCalendarError,
} from '../../redux/slices/calendarSlice.ts';

const Calendar: FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  const events = useAppSelector(selectCalendarEvents);
  const loading = useAppSelector(selectCalendarLoading);
  const error = useAppSelector(selectCalendarError);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);
  const [defaultStartTime, setDefaultStartTime] = useState('');

  useEffect(() => {
    if (isLoggedIn && user?.id) {
      dispatch(fetchCalendarEvents(user.id));
    }
  }, [isLoggedIn, user, dispatch]);

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
      dispatch(
        deleteCalendarEvent({ userId: user!.id, id: clickInfo.event.id! })
      );
    }
  };

  const handleSaveEvent = (eventDetails: {
    title: string;
    category: string;
    start: string;
    end?: string;
    color: string;
  }) => {
    if (!selectedEvent) {
      console.error('Selected event is null. Cannot save event.');
      return;
    }
    {
      const newEvent = {
        ...selectedEvent,
        title: eventDetails.title,
        start: eventDetails.start,
        end: eventDetails.end || undefined,
        category: eventDetails.category,
        color: eventDetails.color,
      };
      dispatch(addCalendarEvent({ userId: user!.id, event: newEvent }));
      setModalVisible(false);
      setSelectedEvent(null);
    }
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        events={events.map((event) => ({
          ...event,
          color: event.color || '#374151', // Use the dynamic color or fallback to a default
        }))}
        select={handleDateSelect}
        eventClick={handleEventClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        //todo colors dynamic
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
      {loading && <p>Loading events...</p>}
      {error && <p>Error loading events: {error}</p>}
    </>
  );
};

export default Calendar;
