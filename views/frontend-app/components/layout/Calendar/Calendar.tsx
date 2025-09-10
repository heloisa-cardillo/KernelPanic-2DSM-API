'use client';

import React, { useEffect, useRef } from 'react';
import { createCalendar, destroyCalendar, TimeGrid, List} from '@event-calendar/core';
import '@event-calendar/core/index.css';

const CalendarComponent: React.FC = () => {
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const calendarInstance = useRef<any | null>(null); 

  useEffect(() => {
    if (calendarRef.current) {
      calendarInstance.current = createCalendar(
        calendarRef.current,
        [TimeGrid, List],
        {
          view: 'timeGridWeek', 
          views: ['timeGridWeek', 'listWeek'], 
          slotMinTime: '08:00:00', 
          slotMaxTime: '18:00:00',
          events: [
            
          ],
        }
      );
    }

    return () => {
      if (calendarInstance.current) {
        destroyCalendar(calendarInstance.current);
        calendarInstance.current = null;
      }
    };
  }, []);

  return <div className='calendario' ref={calendarRef}></div>;
};

export default CalendarComponent;
