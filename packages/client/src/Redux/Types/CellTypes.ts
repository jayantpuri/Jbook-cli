export type CellType = 'text'| 'code';
export type Direction = 'up' | 'down';

export interface Cell{
    id: string;
    content: string;
    type: CellType;
}