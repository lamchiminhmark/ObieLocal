import { Timestamp } from "@google-cloud/firestore";

type eventId = number;
type userId = number;

interface Department {
    id: number;
    name: string;
}

interface EventType {
    id: number;
    name: string;
}

interface EventOrder {
    userId: userId;
    events: eventId[];
}

interface Event {
    eventId: eventId;
    title: string;
    created_at: string;
    updated_at: string; 
    location_name: string;
    created_by: string; 
    recurring: number; 
    free: number; 
    price: number;
    verified: boolean; 
    venue_id: number;
    venue_url: string;
    filters: {
        departments: Department[];
        event_types: EventType[];
    }
    description: string;
    photo_url: string;
    address: string;
    latitude: number;
    longitude: number;
    start_time: Timestamp;
    end_time: Timestamp;

    interested: userId[];
    going: userId[]
}



interface User {
    userId: userId;
    email: string;
    name: string;
    interests: EventType[];
    eventsInterested: eventId[];
}

interface UserFollows {
    followees: userId[];
    requests: userId[];
}