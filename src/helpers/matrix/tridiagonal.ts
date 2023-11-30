import { TMatrix, TriangularResult } from "../../types/matrix"
import { multiplyMatrices } from "./matrixHelp"


export const thomasAlgorithm = (matrixVis: TMatrix): TriangularResult => {
    let countOperations = 0
    const matrix = matrixVis.matrix.map( vector => vector.vector.map( cell => cell.value ) )
    const size = matrix.length
    
    const x = ( matrix.map((_value, index) => [index + 1]) )
    
    const d = multiplyMatrices(matrix, x)

    // a_i * (p_i * q_i) + b_i * x_i + c_i * x_(i+1) = d_i
    const p = Array(size + 1)
    const q = Array(size + 1)
    p[0] = 0
    q[0] = 0
    for (let i = 0; i < size; i++) {
        const a = (i == 0) ? 0 : matrix[i][i - 1]
        const b = matrix[i][i]
        const c = (i == size - 1) ? 0 : matrix[i][i + 1]
        const divider = b + a * p[i]
        p[i + 1] = -c / divider
        q[i + 1] = (d[i][0] - a * q[i]) / divider
        countOperations += 6 // Не считаем унарную операцию -
    }

    //  x_(i-1) = p_i * x_i + q_i
    let solution: number[] = new Array(size + 1);
    
    solution[size] = 0
    for (let i = size - 1; i >= 0; i--) {
        solution[i] = p[i + 1] * solution[i + 1] + q[i + 1]
        
        countOperations += 2
    }
    solution = solution.slice(0, 8)
    console.log(countOperations)
    console.log(solution)
    const result: TriangularResult = {
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
