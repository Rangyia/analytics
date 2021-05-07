import { React, useEffect, useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";

function ErrorModal(props) {
    const [toggle, setToggle] = useState(false)
    const [header, setHeader] = useState("")
    const [message, setMessage] = useState("")

    const handleModalState = (state) => {
        setToggle(state)
        refreshModal(false)
    }

    const refreshModal = (state) => {
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader>{header}</ModalHeader>
                <ModalBody>{message}</ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => handleModalState(false)}>OK</Button>
                </ModalFooter>
            </Modal>
        )
    }

    useEffect(() => {
        setToggle(props.toggle)
        setHeader(props.header)
        setMessage(props.message)
    }, [header, message])

    return refreshModal(toggle)
}

export default ErrorModal