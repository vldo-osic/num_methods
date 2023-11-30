import { MatrixResult, TMatrix } from "../../types/matrix"
import { getTMatrix, multiplyMatrices } from "./matrixHelp"

const EPS = 0.001

export const gaussSeidel = (matrixVis: TMatrix): MatrixResult | number => {
    let countOperations = 0
    const matrix = matrixVis.matrix.map( vector => vector.vector.map( cell => cell.value ) )
    const size = matrix.length
    
    const temp = ( matrix.map((_value, index) => [index + 1]) )
    const B = multiplyMatrices(matrix, temp)

    const P: number[][] = []
    for(let i = 0; i < size; i++) {
        P.push([1])
    }
    const X: number[][] = []
    for(let i = 0; i < size; i++) {
        X.push([0])
    }
    console.log(X)

    while (check(X, P)) {
        for (let i = 0; i < size; i++) {
			P[i][0] = X[i][0];
		}
        for (let i = 0; i < size; i++) {
			let preSum = 0
			for (let j = 0; j < size; j++) {
				if (j != i) {
					preSum += (matrix[i][j] * X[j][0])
					countOperations += 2
				}
			}
			X[i][0] = (B[i][0] - preSum) / matrix[i][i];
			countOperations += 2
		}
    }
    console.log(X)
    const result = {
        b: getTMatrix(B),
        solution: getTMatrix(X),
        countOperations: countOperations
    }
    console.log(result)
    return 0
}

const check = (X: number[][], P: number[][]): boolean => {
    
    let norm = 0
    for (let i = 0; i < X.length; i++) {
        norm += (X[i][0] - P[i][0]) * (X[i][0] - P[i][0])
    }
    return Math.sqrt(norm) > EPS
}