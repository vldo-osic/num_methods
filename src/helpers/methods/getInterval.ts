export const getInterval = (l: number, r: number, interval: number): number[] => {
    const result = []
    for(let i = l; i <= r; i += interval) {
        result.push(i)
    }
    return result
}