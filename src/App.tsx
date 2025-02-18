import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes.tsx";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Routes>
      </Router>

      {/* <h1>Carbon Emissions Dashboard</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div> */}
    </>
  );
}

export default App;
