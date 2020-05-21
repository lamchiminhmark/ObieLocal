import { Timestamp, GeoPoint } from "@google-cloud/firestore";

interface Entity {
    id: string;
}

interface User extends Entity {
    firstName: string;
    lastName: string;
    email: string;
    photo: string;
    interests: EventTag[];
    events: {
        interested: Event["id"][];
        going: Event["id"][];
        owned: Event["id"][];
        recommended: Event["id"][];
    }[];
    follows: {
        followees: User["id"][];
        followers: User["id"][];
        followeeRequests: User["id"][];
    }
}

interface Organization extends Entity {
    name: string;
    description: string;
    contact: {
        name: string;
        email: string;
    };
    attributes: string[];
    events: {
        owned: {
            id: Event["id"];
            title: Event["title"];
            description: Event["description"];
            photo: Event["photo"];
        }[];
        affiliated: {
            id: Event["id"];
            title: Event["title"];
            description: Event["description"];
            photo: Event["photo"];
        }[];
    }
}

interface Department extends Organization {
}

interface StudentOrganization extends Organization {
}


interface Event {
    id: string;
    title: string;
    created: Timestamp;
    lastUpdated: Timestamp; 
    location: Location;
    owner: {
        id: Entity["id"];
        type: string;
        name: string;
        photo?: string;
        tags?: string[];
    };
    cost: number
    filters: {
        attributes: string[];
        departments: Department[];
    }
    description: string;
    photo: string;
    time: EventTime;
    
    interestedUsers: {
        id: User["id"];
        firstName: User["firstName"];
        lastName: User["lastName"];
        photo: User["photo"];
    }[];
    goingUsers: {
        id: User["id"];
        firstName: User["firstName"];
        lastName: User["lastName"];
        photo: User["photo"];
    }[];
}

interface EventTime {
    start: Timestamp; 
    end?: Timestamp;
    recurringList: Event["id"][];
    length: number;
}

interface Location {
    id: number;
    name: string;
}

interface PlaceLocation extends Location {
    address: string;
    geo: GeoPoint;
}

interface WebLocation extends Location {
    url: string;
    password: string;
}

interface Meta {
    content: any;
}
