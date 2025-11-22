export interface Task{
    id: string;
    title: string;
    completed: boolean;
    userId: string;
    coordinates?: {
        latitude: string;
        longitude: string;
    };
    photoUri?: string;
}