import { useState } from "react"

import { GaussResult, TMatrix, TriangularResult } from '../../types/matrix'
import { gauss } from "../../helpers/matrix/gauss"
import { fill, fillDiagDominant, fillForLU, fillTridiagonal, getTMatrix } from "../../helpers/matrix/matrixHelp"
import { thomasAlgorithm } from "../../helpers/matrix/tridiagonal"
import { Matrix } from "../../components/matrix/Matrix"
import BackButton from "../../components/BackButton"

export const MatrixModule = () => {
    const [matrix, setMatrix] = useState<TMatrix>()
    const [result, setResutl] = useState<TriangularResult | GaussResult>()
    const generateMatrix = () => {
        setMatrix(getTMatrix(fill(8)))
        setResutl(undefined)
    }
    const generateTridiagonalMatrix = () => {
        setMatrix(getTMatrix(fillTridiagonal(8)))
        setResutl(undefined)
    }
    const generateMatrixForLU = () => {
        setMatrix(getTMatrix(fillForLU(8)))
        setResutl(undefined)
    }
    const generate20x20 = () => {
        setMatrix(getTMatrix(fillDiagDominant(20)))
    }
    const getGauss = () => {
        matrix && setResutl(gauss(matrix))
    }
    const getThomas = () => {
        matrix && setResutl(thomasAlgorithm(matrix))
    }
    return (
        <div className="matrix-container">
            <BackButton/>
            <div className="buttons-container">
                <button className="buttons-container__button" onClick={generateMatrix}>Generate</button>
                <button className="buttons-container__button" onClick={generateTridiagonalMatrix}>Generate Tridiagonal</button> 
                <button className="buttons-container__button" onClick={generateMatrixForLU}>Generate for LU</button> 
                <button className="buttons-container__button" onClick={generate20x20}>Generate 20x20</button> 
            </div>
            {matrix && <Matrix matrix={matrix.matrix} isReversed={false} />}
            {matrix && <div className="buttons-container">
                    <button className="buttons-container__button" onClick={getGauss}>Gauss</button>
                    <button className="buttons-container__button" onClick={getThomas}>Thomas</button>
                </div>
            }  
            {result && <span> Массив результатов, полученный умножением матрицы на столбец x = | 1 2 3 4 5 6 7 8 |</span> }
            {result && <Matrix matrix={result.b.matrix} isReversed={true} />}
            {result && Object.hasOwn(result, 'upperTriangular') &&  <span> Полученная верхнетреугольная матрица </span>}
            {result && Object.hasOwn(result, 'upperTriangular') && <Matrix matrix={result.upperTriangular.matrix} isReversed={false} />}
            {result && <span> Полученный столбец X </span>}
            {result && <Matrix matrix={result.solution.matrix} isReversed={true} />}
            {result && <span>Количество операций: {result.countOperations}</span>}
        </div>
    )
}