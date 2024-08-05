import './App.css'
import {Provider} from "react-redux";
import store from "./config/store.ts";
import {RouterProvider} from "react-router-dom";
import router from "./config/router.tsx";

function App() {

    return (
        <h1 className="text-3xl font-bold underline">
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        </h1>
    )
}

export default App
