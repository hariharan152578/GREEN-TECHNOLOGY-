import { Routes , Route} from "react-router-dom"
import Home from "../pages/home/layout/Home"
import Course from "../pages/course/layout/Course"
import { MainLayout } from "../layout/MainLayout"
import Domain from "../pages/Domain/Layout/Domain"

const Approutes = () => {
  return (
    <Routes>
        <Route path="/" element={<MainLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="/course" element={<Course/>}/>
            <Route path="/Domain" element={<Domain/>}/>
        </Route>
    </Routes>
  )
}

export default Approutes