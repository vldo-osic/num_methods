import { useEffect, useState } from 'react'
import {MathJax } from "better-react-mathjax"

import { FunctionInput } from '../components/FunctionInput'
import { tokenize } from '../helpers/parser/tokenizer'
import { getRPN } from '../helpers/parser/parser'
import { calcFunction } from '../helpers/methods/calcFunction'
import { getInterval } from '../helpers/methods/getInterval'
import { FunctionGraph } from '../components/FunctionGraph'

import { TMethods } from '../types/method'
import { FuncData } from '../types/function'
import BackButton from '../components/BackButton'

interface Handler {
    handleNewFunction: (param: TMethods) => void
}

export const FunctionVisualization = (handle: Handler) => {
    const [func, setFunc] = useState('')
    const [approx, setApprox] = useState<number>(0)
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
    
    useEffect( () => {
        handle.handleNewFunction({func: rpn, approx, interval})
    }, [func, approx, interval])
    return (
        <div className='visual-container'>
            <BackButton/>
            <FunctionInput handleFunction={(value: string) => setFunc(value)}
                           handleInterval={(l, r) => setInterval({l: l, r: r})}/>
            <MathJax className='visual-container__mathjax'>{"`" + func + "`"}</MathJax>
            {func && <div style={{height: 600, width: 1000, margin: 'auto'}}>
                <FunctionGraph data={data.data} handleApprox={(x0) => setApprox(x0)}/>
            </div>}
        </div>
        
    )
}
