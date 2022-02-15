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

interface Bin {
    id:number
    building_id:number
    address:string
    latitude:number
    longitude:number
    floor_num:number
    location_description:string
    accepted_categories:string
}

interface Building {
    id:number
    building_name:string
}