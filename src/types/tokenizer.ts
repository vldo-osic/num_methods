export enum TokenType {
    Variable = 'Variable',
    Operator = 'Operator',
    Function = 'Function',
    Literal = 'Literal',
    LeftParenthesis = 'LeftParenthesis',
    RightParenthesis = 'RightParenthesis'
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