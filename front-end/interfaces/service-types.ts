export interface PredictionResponse {
    prediction:string
}

export interface UpdateResponse {
    categories:string[]
    category_instructions:CategoryInstruction[]
    bins:Bin[]
    buildings:Building[]
}

interface CategoryInstruction {
    category_name:string,
    instruction:string
}

export interface Region {
    latitude:number,
    longitude:number,
    latitudeDelta:number,
    longitudeDelta:number
}

export interface Bin {
    id:number
    location_name:string
    floor_number:number
    room_number:string
    disposal_type:string
    accepted_categories:string
    building_id:number
}

export interface Building {
    id:number
    building_name:string
    address:string
    latitude:number
    longitude:number
}