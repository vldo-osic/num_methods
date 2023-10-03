import { calcFunction } from "./helpers/calcFunction"
import { getRPN } from "./helpers/parser"
import { tokenize } from "./helpers/tokenizer"
import { Methods } from "./modules/Methods"

function App() {
    console.log(tokenize('6 + 4cos(-3x) / 5 + 5x'))
    console.log(calcFunction(3, getRPN(tokenize('6 + 4cos(3x) / 5 + 5x'))))
    return (
        <Methods>
            
        </Methods>
    )
}

export default App
