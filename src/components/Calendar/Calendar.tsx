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
} from '../../redux/calendar/thunks/calendarThunks.ts';
import CalendarModal from './CalendarModal';
import {
  selectCalendarEvents,
  selectCalendarLoading,
  selectCalendarError,
  selectIsLoggedIn,
  selectUser,
} from '../../redux/selectors';
import { useTranslation } from 'react-i18next';
import enLocale from '@fullcalendar/core/locales/en-gb';
import csLocale from '@fullcalendar/core/locales/cs';
import { toast } from 'react-toastify';
import { EventDetails } from '../../types/types';

const Calendar: FC = () => {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
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

  const handleSaveEvent = (eventDetails: EventDetails) => {
    if (!selectedEvent) {
      toast.error('Selected event is null. Cannot save event.');
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
  const currentLocale = i18n.language === 'en' ? enLocale : csLocale;
  return (
    <div className={'ml-4'}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        events={events.map((event) => ({
          ...event,
          color: event.color || '#374151',
        }))}
        select={handleDateSelect}
        eventClick={handleEventClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        dayMaxEventRows={3}
        fixedWeekCount={false}
        eventTextColor="white"
        locale={currentLocale}
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
    </div>
  );
};

export default Calendar;
