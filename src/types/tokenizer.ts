export enum TokenType {
    Variable,
    Operator,
    Function,
    Literal,
    LeftParenthesis,
    RightParenthesis
}
export interface IToken {
    type: TokenType,
    value: string
}
export interface Buffer {
    result: IToken[]
    letterBuffer: string[]
    numberBuffer: string[]
}