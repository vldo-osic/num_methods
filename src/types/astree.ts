import { TokenType } from "./tokenizer"

type TNode = {
    value: string
    type: TokenType
    parent?: TNode
    lchild?: TNode
    rchild?: TNode
}