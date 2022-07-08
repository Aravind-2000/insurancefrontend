import $ from 'jquery';
import React from 'react';

const DraggableJquery = () => {

    $(document).ready(function (){
        $('.modal-dialog').draggable({
            handle: ".modal-header",
            cursor:"move"
        });
    })
    return (
        <div>
        </div>
    );
};

export default DraggableJquery;
