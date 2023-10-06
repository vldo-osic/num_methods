import { Solution } from "./function"
import { IToken } from "./tokenizer"

export type TMethods = {
    func: IToken[]
    approx: number
    interval: {
        l: number
        r: number
    }
}

export type TMethodCard = {
    title: string
    solution: Solution
} 
