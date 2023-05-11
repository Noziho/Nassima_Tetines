import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home} from './pages/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
);
