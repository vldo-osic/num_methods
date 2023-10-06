import { Solution } from "../../types/function";
import { IToken } from "../../types/tokenizer";
import { calcFunction } from "./calcFunction";


export const calc = (func: IToken[], approx: number, eps: number): Solution => {
    const start = new Date().getTime();

    let solution = approx
    const tau = isIncreases(func, approx) ? 0.1 : -0.1
    let numCalc = 0
    while ( !isLessThanEps(calcFunction(solution, func), eps) ) {
        console.log(solution)
        numCalc += 1
        solution = solution - tau * calcFunction(solution, func)
    }

    const end = new Date().getTime();
    return {x: solution, numCalc, time: end - start}
}

const isLessThanEps = (value: number, eps: number): boolean => 
    Math.abs(value) < eps

/**
 * Определяет - положительна ли производная в данной точке
 * @param func Функция
 * @param x Точка
 * @returns 
 */
const isIncreases = (func: IToken[], x: number): boolean => {
    const eps = 0.00001
    return calcFunction(x - eps, func) < calcFunction(x + eps, func)
}