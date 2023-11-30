import { TMatrix } from "../../types/matrix"

export const getTMatrix = (matrix: number[][]): TMatrix => {
    return { 
        matrix: matrix.map( v => { return { vector: v.map( c => { return { value: c }} ) }} )
    }
}

export const fill = (size: number): number[][] => {
    
    const matrix = []
    for(let i = 0; i < size; i++) matrix.push([])

    for(let i = 0; i < size; i++) 
        for(let j = 0; j < size; j++)
            matrix[i][j] = +(Math.random() * 20 - 10).toFixed(0)
        
    return matrix
}

export const fillTridiagonal = (size: number): number[][] => {
    const matrix = []
    for(let i = 0; i < size; i++) matrix.push(Array(size).fill(0))

    matrix[0][1] = +(Math.random() * 20 - 10).toFixed(0)
    matrix[0][0] = Math.abs(matrix[0][1]) + +(Math.random() * 10).toFixed(0)
    for(let i = 1; i < size - 1; i++) {
        matrix[i][i - 1] = +(Math.random() * 20 - 10).toFixed(0)
        matrix[i][i + 1] = +(Math.random() * 20 - 10).toFixed(0)
        matrix[i][i] = Math.abs(matrix[i][i - 1]) + Math.abs(matrix[i][i + 1]) + +(Math.random() * 10).toFixed(0)
    }
    matrix[size - 1][size - 2] = +(Math.random() * 20 - 10).toFixed(0)
    matrix[size - 1][size - 1] = Math.abs(matrix[size - 1][size - 2]) + +(Math.random() * 10).toFixed(0)

    return matrix
}

export const fillForLU = (size: number): number[][] => {
    
    const matrix = fill(size)
    let isCorrect = true
    for (let s = 0; s < size; s++) {
        const minor: number[][] =  matrix.slice(0, s + 1).map(vector => vector.slice(0, s + 1))
        if (getDeterminant(minor) == 0) {
            isCorrect = false
            break
        }
        console.log(getDeterminant(minor))
    }
    return isCorrect ? matrix
                     : fillForLU(size)
}

export const fillHilbert = (size: number): number[][] => {
    const matrix:number[][] = []
    for (let i = 0; i < size; i++) {
        matrix.push([])
        for (let j = 0; j < size; j++)
            matrix[i].push(1/(i + j + 1))
    }
    return matrix
}

export const fillDiagDominant = (size: number): number[][] => {
    const matrix: number[][] = []
    for (let i = 0; i < size; i++) {
        matrix.push([])
        let sum = 0;
        for (let j = 0; j < size; j++) {
            const rand = +(Math.random() * 20 - 10).toFixed(0);
            sum += Math.abs(rand)
            matrix[i].push((i != j) ? rand
                                    : 0)
        }
        matrix[i][i] = sum + +(Math.random() * 20).toFixed(0)
    }
    return matrix
}
export const multiplyMatrices = (a: number[][], b: number[][]): number[][] => {
    const m = new Array(a.length);

    for (let row = 0; row < a.length; row++) {
        m[row] = new Array(b[0].length);

        for (let column = 0; column < b[0].length; column++) {
            m[row][column] = 0;

            for (let i = 0; i < a[0].length; i++) {
                m[row][column] += a[row][i] * b[i][column];
            }
        }
    }

    return m;
}

const getMinor = (matrix: number[][], colIndex: number): number[][] => {
    const newMatrix: number[][] = []
    for (let i = 1; i < matrix.length; i++) 
        newMatrix.push(matrix[i].slice(0, colIndex - 1).concat(matrix[i].slice(colIndex)))
        
    return newMatrix
}

const getDeterminant = (matrix: number[][]): number => {
    const n = matrix.length
    let det = 0
    let degree = 1
    if (n == 1) return matrix[0][0]
    else if (n == 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
    else {
        for (let j = 0; j < n; j++) {
            const minor = getMinor(matrix, j)
            det += (degree * matrix[0][j] * getDeterminant(minor))
            degree *= -1
        }
    }
    return det
}

