import { Timestamp } from "@google-cloud/firestore";

interface Entity {
    id: number;
    name: string;
    email: string;
}

interface Department extends Entity {
}

interface StudentOrganization extends Entity {
}

interface User extends Entity {
    interests: EventTag[];
    eventsInterested: Event["id"][];
}

interface EventTag {
    id: number;
    name: string;
}

interface EventOrder {
    userId: User["id"];
    events: Event["id"][];
}

interface EventTime {
    start: Timestamp; 
    end?: Timestamp;
    recurringList: Event["id"][];
    length: number;
}

interface Event {
    id: number;
    title: string;
    created_at: string;
    updated_at: string; 
    location_name?: string;
    created_by: string; 
    recurring: number; 
    free: number; 
    price: number;
    verified: boolean; 
    venue_id: number;
    venue_url: string;
    filters: {
        departments: Department[];
        event_types: EventTag[];
    }
    description: string;
    photo_url: string;
    address: string;
    latitude: number;
    longitude: number;
    time: EventTime;

    interestedUsers: User["id"];
    goingUsers: User["id"];

    organizer: Entity["id"];
}

interface UserFollows {
    followees: Entity["id"][];
    followers: Entity["id"][];
    requests: User["id"][];
}

interface Meta {
    eventTags: EventTag[];

}


