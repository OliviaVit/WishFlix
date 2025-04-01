export interface Episode {

    id: number;
    name: string;
    number: number;
    season: number;
    summary: string;
    image: { medium: string; original: string };
    premiered: string;
    rating: any; 
}
