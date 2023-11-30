import { FC } from "react";
import { TVector } from '../../types/matrix';
import { Cell } from "./Cell";

export const Vector: FC<TVector> = ({vector}) => {
    return (
        <div className="matrix-container__vector">
            {
                vector.map(
                    (cell, index) => <Cell key={index} value={cell.value}/>
                )
            }
        </div>
    )
}