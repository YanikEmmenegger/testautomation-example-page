export interface UserStory {
    id: string;
    title: string;
    description: string;
    acceptanceCriteria: string[];
}

export interface Challenge {
    id: string;
    title: string;
    description: string;
    userStories: UserStory[];
    tasks: string[];
    link: string;
    bugs?: string[];
    difficulty: number;
}
// src/types/Task.ts
export interface Task {
    id: number;
    title: string;
    description: string;
    status: "Backlog" | "In Progress" | "Done" | "Archived";
    dueDate: string; // e.g. "2023-12-31"
    comments: string[];
}
