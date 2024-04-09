import { Button, Modal } from "react-bootstrap";

interface LogoutPanelProps {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export const LogoutPanel2 = ({ show, onConfirm, onCancel }: LogoutPanelProps) => {
    const handleConfirm = () => {
        onConfirm();
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <>
            <Modal show={show} onHide={handleCancel} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Kijelentkezés
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Biztos ki szeretnél lépni?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleConfirm}>Igen</Button>
                    <Button onClick={handleCancel}>Nem</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
