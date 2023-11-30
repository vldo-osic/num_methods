import { FC } from "react"
import { calc } from "../helpers/methods/simpleIterations"
import { TMethods, TMethodCard } from "../types/method"
import { MethodCard } from "../components/methods/MethodCard"

type Epsilon = {
    eps: number[]
}
export const Methods:FC<TMethods & Epsilon> = ({func, approx, eps}) => {
    const methods: TMethodCard[] = eps.map( (eps, index) => {
        return {
            title: 'e = ' + eps,
            solution: {
                ...calc(func, approx, eps), 
                x: +(calc(func, approx, eps).x.toFixed(index + 3))
            }
        }
    })

    return (
        <div className="content">
            <h2>Метод простой итерации</h2>
            <div className="methods-container">
                {
                    methods.map(method =>
                        <MethodCard title={method.title} solution={method.solution}/>
                    )
                }
            </div>
        </div>
        
    )
}