import { FC } from "react";
import { TCell } from '../../types/matrix'

export const Cell: FC<TCell> = ({value}) => {
    return (
        <div className="matrix-container__cell">{value}</div>
    )
}