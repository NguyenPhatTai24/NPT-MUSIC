import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { publicRouters } from "./routers";
import './GlobalStyle.scss'
function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        {
        publicRouters.map(
          (page,index) => 
          (
            <Route key={index} path= {page.path} element = {<page.page/>}/>
          ))}
      </Routes>
    </div>
    </Router>
  );
}

export default App;
