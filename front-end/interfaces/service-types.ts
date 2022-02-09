export interface PredictionResponse {
    prediction:string
}

export interface UpdateResponse {
    categories:string[]
    category_instructions:CategoryInstruction[]

}

interface CategoryInstruction {
    category_name:string,
    instruction:string
}