import { Provider } from "react-redux";

import { store } from "./app/store";
import AdminDashboard from "./components/admin/AdminDashboard";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AdminDashboard />
      </div>
    </Provider>
  );
}

export default App;
