import { Routes , Route} from "react-router-dom"
import Home from "../pages/home/layout/Home"

const Approutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
    </Routes>
  )
}

export default Approutes