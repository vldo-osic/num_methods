import { MathJaxContext, MathJax } from "better-react-mathjax"
import { calcFunction } from "./helpers/calcFunction"
import { getRPN } from "./helpers/parser"
import { tokenize } from "./helpers/tokenizer"
import { Methods } from "./modules/Methods"
import { FunctionVisualization } from "./modules/FunctionVisualization"

function App() {
    const config = {
        loader: { load: ["input/asciimath"] },
        asciimath: {
            delimiters: [['$','$'], ['`','`']]
        }
    };
    console.log(tokenize('6 + 4cos(-3x) / 5 + 5x'))
    console.log(calcFunction(3, getRPN(tokenize('6 + 4cos(3x) / 5 + 5x'))))
    return (
        <div>
            <MathJaxContext config={config}>
              <FunctionVisualization/>
            </MathJaxContext>
        </div>
    )
}

export default App
