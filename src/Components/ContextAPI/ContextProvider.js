import React, {createContext, useContext} from 'react';

const userContext = createContext();

export const useCounter = () => useContext(userContext);

const ContextProvide = (props) => {


    console.log(props.userDetails)

    return (
        <userContext.Provider value={props.userDetails}>
            {props.children}
        </userContext.Provider>
    );
};

export default ContextProvide;
