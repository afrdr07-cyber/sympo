import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventItem } from '../types';
import { registrationService } from '../services/registrationService';
import { EventCard } from '../components/events/EventCard';
import { EventDetailModal } from '../components/events/EventDetailModal';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { Gamepad2 } from 'lucide-react';

export const NonTechEvents: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModalEvent, setSelectedModalEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    registrationService.getEvents().then(data => {
      setEvents(data.filter(e => e.category === 'Non Technical'));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSelectEvent = (event: EventItem) => {
    navigate('/register', { state: { preselectedEvent: event } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-bold border border-violet-500/20">
          <Gamepad2 className="w-4 h-4" />
          <span>Non-Technical Showdowns</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Non-Technical Events</h1>
        <p className="text-sm text-slate-300">
          Unleash your creativity, mobile esports skills, memory prowess, and photography eye.
        </p>
      </div>

      {loading ? (
        <LoadingSkeleton count={3} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onSelect={handleSelectEvent}
              onViewDetails={(ev) => setSelectedModalEvent(ev)}
            />
          ))}
        </div>
      )}

      <EventDetailModal
        event={selectedModalEvent}
        onClose={() => setSelectedModalEvent(null)}
        onSelect={handleSelectEvent}
      />

    </div>
  );
};
