import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AppLayout
from "./layouts/AppLayout";

import DashboardPage
from "./pages/DashboardPage";

import InventoryPage
from "./pages/InventoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<AppLayout />}
        >
          <Route
            path="/"
            element={
              <DashboardPage />
            }
          />

          <Route
            path="/inventory"
            element={
              <InventoryPage />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;