import { TokenType, IToken, Buffer } from '../../types/tokenizer'
import token from './tokenQualifier'


export const tokenize = (expr: string): IToken[] => {
    let result = expr.replace(/\s+/g, "")
        .split('')
        .reduce(getToken, {result: [], letterBuffer: [], numberBuffer: []})
    if (result.numberBuffer.length) {
        result = token.numberBufferAsLiteral(result);
    }
    
    if (result.letterBuffer.length) {
        result = token.letterBufferAsVariables(result);
    }
    return result.result
}

// Функция - коллбек для получения токена
const getToken = (accum: Buffer, char: string): Buffer => {
    if (token.isDigit(char) || char === '.') {
        return {...accum, numberBuffer: [...accum.numberBuffer, char]}
    } else if (token.isLetter(char)) {
        if (accum.numberBuffer.length) {
            accum = token.numberBufferAsLiteral(accum)
            accum.result.push({type: TokenType.Operator, value: '*'})
        }
        return {...accum, letterBuffer: [...accum.letterBuffer, char]}
    } else if (token.isOperator(char)) {
        accum = token.numberBufferAsLiteral(accum)
        accum = token.letterBufferAsVariables(accum)
        return {...accum, result: [...accum.result, {type: TokenType.Operator, value: char}]}
    } else if (token.isLeftParenthesis(char)) {
        if (accum.letterBuffer.length) {
            accum.result.push({type: TokenType.Function, value: accum.letterBuffer.join('')})
            accum.letterBuffer = []
        } else if (accum.numberBuffer.length) {
            accum = token.numberBufferAsLiteral(accum)
            accum.result.push({type: TokenType.Operator, value: '*'})
        }
        return {...accum, result: [...accum.result, {type: TokenType.LeftParenthesis, value: char}]}
    } else if (token.isRightParenthesis(char)) {
        accum = token.letterBufferAsVariables(accum)
        accum = token.numberBufferAsLiteral(accum)
        return {...accum, result: [...accum.result, {type: TokenType.RightParenthesis, value: char}]}
    }
    return accum
}

