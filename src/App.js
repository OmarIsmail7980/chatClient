import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {Chat,Join} from "./components"

import "./App.css";

const App = ()=>{
    return(
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Join/>}/>
                    <Route path="/chat" element={<Chat/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;