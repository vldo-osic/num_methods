
export const LU = (matrix: number[][]) => {
    const size = matrix.length
    const L: number[][] = []
    const U: number[][] = matrix
    for (let i = 0; i < size; i++) {
        L.push([])
        for (let j = 0; j < size; j++)
            L[i].push(i >= j ? U[j][j] / U[i][j] : 0) 
    }
}
