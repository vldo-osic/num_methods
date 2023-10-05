import { FC } from "react"
import { TMethodCard } from "../types/method"
import '../styles/methods.css'

export const MethodCard: FC<TMethodCard> = ({title, solution}) => {
    return (
        <div className="method-card">
            <h3>{title}</h3>
            <h3>Решение: x = {solution.x}</h3>
            <h3>Количество итераций: {solution.numCalc}</h3>
            <h3>Затраченное время: {solution.time}</h3>
        </div>
    )
}