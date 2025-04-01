import { Episode } from "./episode";

export interface Season {
    name: string;
    number: number;
    id: number;
    date: string;
    image: { medium: string; original: string };
    summary: string;
}
