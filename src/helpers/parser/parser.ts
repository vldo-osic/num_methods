import { IToken, TokenType } from "../../types/tokenizer"

const PRIORITY = {
    '!': 4,
    '^': 3,
    '*': 2,
    '/': 2,
    '%': 2,
    '+': 1,
    '-': 1,
}

export const BINARY_OPERATIONS = {
    '-': (a: number, b: number): number => a - b,
    '+': (a: number, b: number): number => a + b,
    '*': (a: number, b: number): number => a * b,
    '/': (a: number, b: number): number => a / b,
    '^': (a: number, b: number): number => Math.pow(a, b),
}


export const POSTFIX_OPERATIONS = {
    '!': (a: number): number => a === 0 ? 1 : POSTFIX_OPERATIONS["!"](a - 1) * a,
}


export const UNARY_OPERATIONS = {
    'sin': (a: number): number => Math.sin(a),
    'cos': (a: number): number => Math.cos(a),
    'tan': (a: number): number => Math.tan(a),
    'cot': (a: number): number => 1 / UNARY_OPERATIONS.tan(a),
    'sqrt': (a: number): number => Math.sqrt(a),
    'ln': (a: number): number => Math.log(a),
}

interface RPNBuffer {
    result: IToken[]
    stack: IToken[]
}
/**
 * Получение обратной польской нотации данного выражения
 * @param {IToken[]} expr Выражение, которое преобразуем в обратную польскую нотацию
 */
export const getRPN = (expr: IToken[]): IToken[] => {
    const {result, stack} = expr.reduce(getRPNSymbol, {result: [], stack: []})
    return result.concat(stack.reverse())
}

const getRPNSymbol = (accum: RPNBuffer, symbol: IToken): RPNBuffer => {
    if (   symbol.type == TokenType.Literal
        || symbol.type == TokenType.Variable
        || symbol.value in POSTFIX_OPERATIONS) {
        return {...accum, result: [...accum.result, symbol]}
    } else if ( symbol.value in UNARY_OPERATIONS ) {
        return {...accum, stack: [...accum.stack, symbol]}
    } else if ( symbol.type == TokenType.LeftParenthesis ) {
        return {...accum, stack: [...accum.stack, symbol]}
        
    } else if ( symbol.type == TokenType.RightParenthesis ) {
        let tempAccum = Object.assign({}, accum)
        while ( tempAccum.stack.at(-1)?.type != TokenType.LeftParenthesis) 
            tempAccum = popStack(tempAccum)
        
        tempAccum.stack.pop() // Убираем из стека открывающуюся скобку
        return tempAccum
    } else if ( symbol.value in BINARY_OPERATIONS ) {
        let tempAccum = Object.assign({}, accum)
        while ( tempAccum.stack.length > 0 &&
                (tempAccum.stack.at(-1).value in UNARY_OPERATIONS
             || PRIORITY[tempAccum.stack.at(-1)?.value] >= PRIORITY[symbol.value] ))
             tempAccum = popStack(tempAccum)
        return {...tempAccum, stack: [...tempAccum.stack, symbol]}
    }
    
    return accum
}

/**
 * Переносит вершину стека в результат
 * @param accum 
 * @returns 
 */
const popStack = (accum: RPNBuffer): RPNBuffer => {
    const last = accum.stack.pop()
    return (typeof last === 'undefined') ? accum   
                   : {...accum, result: [...accum.result, last]}
}
