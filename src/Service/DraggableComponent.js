import React from 'react';
import Draggable from "react-draggable";
import {ModalDialog} from "react-bootstrap";

const DraggableComponent = (props) => {
    return (
        <Draggable handle=".modal-header">
            <ModalDialog {...props} />
        </Draggable>
    );
};

export default DraggableComponent;


