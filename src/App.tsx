import { tokenize } from "./helpers/parser"
import { Methods } from "./modules/Methods"

function App() {
    console.log(tokenize('1 + 2sin(45)/2 * 34x - (34 * 3)'))
    return (
        <Methods>
            
        </Methods>
    )
}

export default App
