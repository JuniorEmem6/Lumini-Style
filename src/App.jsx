import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"
import ShopPage from "./Pages/Shop";

const App = () => {

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
      </BrowserRouter>

  )
}

export default App

