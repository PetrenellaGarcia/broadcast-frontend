import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "pages/loginPage";
import SignupPage from "pages/signupPage";
import DashboardPage from "pages/dashboardPage";
import CreateBroadcastPage from "pages/createBroadcastPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/create-broadcast" element={<CreateBroadcastPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
