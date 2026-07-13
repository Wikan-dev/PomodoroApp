import { Route, BrowserRouter, Routes } from "react-router-dom" 
import AquaTimerLanding from "./pages/mainPages"
import AquaTimerDashboard from "./pages/mainDashboard"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AquaTimerLanding />} />
        <Route path="/dashboard" element={<AquaTimerDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}