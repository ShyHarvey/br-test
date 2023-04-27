export type TStory = {
    id: number;
    deleted?: boolean;
    type: "story";
    by?: string;
    time: number;
    dead?: boolean;
    kids: number[];
    descendants?: number;
    score?: number;
    title: string;
    url?: string;
}