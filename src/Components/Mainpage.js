import React, {useState} from 'react';
import {Form, Modal} from "react-bootstrap";



const Mainpage = (props) => {

    const [termsModal, setTermsModal] = useState(false);
    const showtermsmodal = () => setTermsModal(true);
    const hidetermsmodal = () => {
        setTermsModal(false);
    }

    const gotoadd = (e) => {
        e.preventDefault();
        window.location = "/add";
    }


    return (
        <div>
            <br/> <br/>
            <div className="container">

                <button
                    className="btn btn-danger"
                    onClick={showtermsmodal}
                    >
                    Enroll Now
                </button>
<br/> <br/>

            </div>

            <Modal
                show={termsModal}
                onHide={hidetermsmodal}
                backdrop="static"
                keyboard={false}
             >

               <Modal.Header closeButton>
                   <Modal.Title>
                       Disclaimer
                   </Modal.Title>
               </Modal.Header>

                <Modal.Body>
                    <Form className="container" onSubmit={(e) => gotoadd(e)}>

                        <Form.Group>

                            <Form.Check
                                label="By checking this you accept to our terms and conditions"
                                id="terms"
                                required
                            />
                            <Form.Check
                                label="I am ready to share my personal details with your company."
                                id="self"
                                required
                            />

                            <button
                                type="submit button"
                                className="btn btn-danger"
                            >
                                Ok, I understand

                            </button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default Mainpage;
