import { useState } from 'react'
import {MathJax } from "better-react-mathjax"

import { FunctionInput } from '../components/FunctionInput'
import { tokenize } from '../helpers/tokenizer'
import { getRPN } from '../helpers/parser'
import { calcFunction } from '../helpers/calcFunction'
import { getInterval } from '../helpers/getInterval'
import { FunctionGraph } from '../components/FunctionGraph'

export const FunctionVisualization = () => {
    const [func, setFunc] = useState('')
    const [interval, setInterval] = useState<{l: number, r: number}>({l: -10, r: 10})

    const x = getInterval(interval.l, interval.r, 0.01)

    const rpn = getRPN(tokenize(func))
    const dotsPairs: {'x': number, 'y': number}[] = x.map( arg => {
        return {
            'x': arg,
            'y': calcFunction(arg, rpn)
        }
    })
    const data: FuncData = { 'data': [
        {
            'id': func,
            'data': dotsPairs
        }
    ]}

    return (
        <div>
            <FunctionInput handleFunction={(value: string) => setFunc(value)}
                           handleInterval={(l, r) => setInterval({l: l, r: r})}/>
            <MathJax>{"`" + func + "`"}</MathJax>
            <div style={{height: 600, width: 1000}}>
                <FunctionGraph data={data.data}/>
            </div>
        </div>
        
    )
}
