import { Routes , Route} from "react-router-dom"
import Home from "../pages/home/layout/Home"
import Course from "../pages/course/layout/course"
import { MainLayout } from "../layout/MainLayout"

const Approutes = () => {
  return (
    <Routes>
        <Route path="/" element={<MainLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="/course" element={<Course/>}/>
        </Route>
    </Routes>
  )
}

export default Approutes