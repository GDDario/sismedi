import {Provider} from "react-redux";
import Message from "../src/shared-components/Message/Message.tsx";
import {MemoryRouter, RouterProvider} from "react-router-dom";
import {render} from "@testing-library/react";
import configureStore from "../src/config/store.ts";

const ProvidersWrap = ({children, store = {}}) => {
    return (
        <>
            <Provider store={store}>
                <Message/>
                <MemoryRouter>
                    {children}
                </MemoryRouter>
            </Provider>
        </>
    );
};

export function fullyRender(
    ui,
    {
        preloadState = {},
        store = configureStore,
        ...renderOptions
    } = {}
) {
    return {
        store, ...render(ui,
            {
                wrapper: (
                    props) => <ProvidersWrap {...props} store={store}/>,
                ...renderOptions
            }
        )
    };
}