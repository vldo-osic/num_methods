import { FC } from "react"
import { TMatrix } from '../../types/matrix'
import { Vector } from "./Vector"

export const Matrix: FC<TMatrix & {isReversed: boolean}> = ({matrix, isReversed}) => {
    const className = "matrix-container__matrix".concat(isReversed ? '_reversed' : '')
    return (
        <div className={className}>
                {matrix.map((vector, index) => <Vector key={index} vector={vector.vector}/>)}
        </div>
    )
}