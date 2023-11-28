/*
react-router-dom 5버전 -> 버전6 바뀐 부분

1. Switch컴포넌트가 Routes컴포넌트로 대체됨
Switch -> Routes

2. Route컴포넌트 사이에 자식 컴포넌트를 넣지 않고, element prop에 자식 컴포넌트를 할당하도록 바뀜
Route path="/" element={< Home / >}
*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/movie/:id" element={<Detail />}></Route>
            </Routes>
            <Routes>
                <Route path="/" element={<Home />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
