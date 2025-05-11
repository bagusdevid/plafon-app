import {createContext, useEffect, useState} from "react";

export const LayoutContext = createContext();

export default function Layout({children}) {

    // console.log(children.props)

    return <LayoutContext.Provider value={{
        auth: children.props.auth,
        flashMessage: children.props.flash.message,
    }}>
        <div className="">
            {children}
        </div>
    </LayoutContext.Provider>
}
