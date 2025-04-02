import { Route, Routes } from "react-router";
import MainLayout from "./layout/Index";
import Home from "./pages/home/Index";
import Login from "./pages/auth/Login";
import { ToastContainer } from "react-toastify";
import Comments from "./pages/comments/Index";
import RandomConfig from "./pages/random-config/Index";
import Missions from "./pages/missions/Index";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/random-config" element={<RandomConfig />} />
          <Route path="/missions" element={<Missions />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
