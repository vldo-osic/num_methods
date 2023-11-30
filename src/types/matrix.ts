export type TCell = {
    value: number
}
export type TVector = {
    vector: TCell[]
}
export type TMatrix = {
    matrix: TVector[]
}
export interface MatrixResult {
    b: TMatrix
    solution: TMatrix
    countOperations: number
}
export interface GaussResult extends MatrixResult {
    upperTriangular: TMatrix
}
export interface TriangularResult extends MatrixResult {
    upperTriangular?: TMatrix
}
export interface LUResult extends MatrixResult {
    LMatrix: TMatrix
    UMatrix: TMatrix
}