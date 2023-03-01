import { RouterProvider } from "react-router-dom";
import store from "./store/authStore";
import router from "./utils/routerConfig";
import { Provider } from 'react-redux'

function App() {



  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

  );
}

export default App;
