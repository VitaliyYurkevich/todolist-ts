import React from 'react';
import {Provider} from "react-redux";

export const ReduxStoreProviderDecorator = (story: any) => {

    return <Provider store={story}> story() </Provider>

}
