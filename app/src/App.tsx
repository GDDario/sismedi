import './App.css'
import {Provider} from "react-redux";
import store from "./config/store.ts";
import {RouterProvider} from "react-router-dom";
import router from "./config/router.tsx";

function App() {

    return (
        <>
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        </>
    )
}

export default App
