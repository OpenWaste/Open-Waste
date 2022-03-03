export interface PredictionResponse {
    prediction:string
}

export interface UpdateResponse {
    categories:string[]
    category_instructions:CategoryInstruction[]
    bins:Bin[]
    buildings:Building[]
}

export interface CategoryInstruction {
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
    building_id:number
    address:string
    latitude:number
    longitude:number
    floor_num:number
    location_description:string
    accepted_categories:string
}

export interface Building {
    id:number
    building_name:string
}