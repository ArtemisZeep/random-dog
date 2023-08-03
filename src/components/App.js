import Header from "./Header";
import StartPage from "./Start";
import MainPage from "./Main";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header></Header>
                <StartPage></StartPage>
              </>
            }
          />

          <Route
            path="/generate"
            element={
              <>
                <Header></Header>
                <MainPage></MainPage>
              </>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
