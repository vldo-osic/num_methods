import { MathJaxContext } from "better-react-mathjax"
import { FunctionVisualization } from "./modules/FunctionVisualization"

import './styles/f_visual.css'
import { Methods } from "./modules/Methods"
import { useState } from "react"
import { TMethods } from "./types/method"
import { IToken } from "./types/tokenizer"

function App() {
    const config = {
        loader: { load: ["input/asciimath"] },
        asciimath: {
            delimiters: [['$','$'], ['`','`']]
        }
    }

    const [func, setFunc] = useState<IToken[]>([])
    const [approx, setApprox] = useState<number>(0)
    const [interval, setInterval] = useState<{l: number, r: number}>({l: -10, r: 10})
    const eps = [0.01, 0.001, 0.0001, 0.00001, 0.000001]
    const handleNewFunction = (param: TMethods) => {
        setFunc(param.func)
        setApprox(param.approx)
        setInterval(param.interval)
    }
    return (
        <div className="app">
            <MathJaxContext config={config}>
              <FunctionVisualization handleNewFunction={(param: TMethods) => handleNewFunction(param)}/>
            </MathJaxContext>
            {func.length != 0 && approx != 0 && <Methods func={func} approx={approx} interval={interval}eps={eps}/>}
        </div>
    )
}

export default App
