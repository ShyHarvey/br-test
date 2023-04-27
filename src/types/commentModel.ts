export type TComment = {
    id: number;
    deleted?: boolean;
    type: 'comment';
    by: string;
    time: number;
    dead?: boolean;
    kids: number[];
    parent: number;
    text: string;
}