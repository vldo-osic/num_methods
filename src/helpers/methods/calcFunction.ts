import { IToken, TokenType } from "../../types/tokenizer";
import { BINARY_OPERATIONS, UNARY_OPERATIONS } from "../parser/parser";


/**
 * 
 * @param x Аргумент
 * @param expr f(x) - функция, которую нужно посчитать
 * @returns Значения f(x)
 */
export const calcFunctionOnInterval = (x: number[], func: IToken[]): number[] =>
    x.map( (arg: number) => calcFunction(arg, func))

/**
 * Возвращает значение функции в данной точке
 * @param x Точка
 * @param func Функция в обратной польской нотации
 * @returns 
 */
export const calcFunction = (x: number, func: IToken[]): number => 
    func.reduce( (stack: number[], token: IToken): number[] => {
        if        (token.type == TokenType.Variable) {
            return [...stack, x]
        } else if (token.type == TokenType.Literal) {
            return [...stack, +token.value]
        } else if (token.value in BINARY_OPERATIONS) {
            const tempStack = stack
            const b = tempStack.pop()
            const a = tempStack.pop()
            return [...tempStack, BINARY_OPERATIONS[token.value](a, b)]
            
        } else if (token.value in UNARY_OPERATIONS) {
            const tempStack = stack
            const a = tempStack.pop()
            return [...tempStack, UNARY_OPERATIONS[token.value](a)]
        }
        return stack
    }, [])[0]
