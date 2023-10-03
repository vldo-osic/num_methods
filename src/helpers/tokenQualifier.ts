import { TokenType, Buffer } from '../types/tokenizer'


function isComma(ch: string) {
    return /,/.test(ch)
}

function isDigit(ch: string) {
    return /\d/.test(ch)
}

function isLetter(ch: string) {
    return /[a-z]/i.test(ch)
}

function isOperator(ch: string) {
    return /\+|-|\*|\/|\^/.test(ch)
}

function isLeftParenthesis(ch: string) {
    return /\(/.test(ch)
}

function isRightParenthesis(ch: string) {
    return /\)/.test(ch)
}
function letterBufferAsVariables({result, letterBuffer, numberBuffer}: Buffer) {
    const l = letterBuffer.length;
    for (let i = 0; i < l; i++) {
        result.push({type: TokenType.Variable, value: letterBuffer[i]})
        if (i < l-1) { 
            result.push({type: TokenType.Operator, value: '*'})
        }
    }
    return {
        result: result,
        letterBuffer: [],
        numberBuffer: numberBuffer
    }
}

function numberBufferAsLiteral({result, letterBuffer, numberBuffer}: Buffer) {
    if(numberBuffer.length) {
        result.push({type: TokenType.Literal, value: numberBuffer.join('')})
    }
    return {
        result: result,
        letterBuffer: letterBuffer,
        numberBuffer: []
    }
}

export default {isComma, isDigit, isLetter, isOperator, isLeftParenthesis, isRightParenthesis, letterBufferAsVariables, numberBufferAsLiteral}
