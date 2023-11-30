import { GaussResult, TMatrix } from "../../types/matrix"
import { multiplyMatrices } from "./matrixHelp"


export const gauss = (matrixVis: TMatrix): GaussResult => {
    let countOperations = 0
    const matrix = matrixVis.matrix.map( vector => vector.vector.map( cell => cell.value ) )
    const size = matrix.length

    const x = ( matrix.map((_value, index) => [index + 1]) )

    const d = multiplyMatrices(matrix, x)
    const b = multiplyMatrices(matrix, x)
    for (let k = 0; k < size - 1; k++) {
        for (let i = k + 1; i < size; i++) {
            const factor = matrix[i][k] / matrix[k][k]
            countOperations++
            matrix[i][k] = 0;
            countOperations++
            for (let j = k + 1; j < size; j++) {
                matrix[i][j] -= factor * matrix[k][j]
                countOperations+=2
            }
            b[i][0] -= factor * b[k][0]
            countOperations++
        }
    }

    const solution = new Array(size);
    solution[size - 1] = b[size - 1][0] / matrix[size - 1][size - 1]
    countOperations++
    for (let i = size - 1; i >= 0; i--) {
        let s = 0
        for (let j = i + 1; j < size; j++) {
            s += matrix[i][j] * solution[j];
            countOperations++
        }
        solution[i] = (b[i][0] - s) / matrix[i][i]
        countOperations++
    }
    
    console.log(countOperations)
    console.log(solution)
    const result: GaussResult = {
        upperTriangular: { 
            matrix: matrix.map( v => { return { vector: v.map( c => { return { value: +c.toFixed(1) }} ) }} )
        },
        b: {
            matrix: d.map(  v => { return { vector: [ { value: +v[0].toFixed(1)} ] }} )
        },
        solution: {
            matrix: solution.map( v => { return { vector: [ { value: +v.toFixed(2)} ] }} )
        },
        countOperations: countOperations
    }
    return result
}