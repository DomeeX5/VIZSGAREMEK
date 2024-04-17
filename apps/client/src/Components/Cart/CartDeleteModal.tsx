import { Button, Modal } from "react-bootstrap";

/**
 * Props for the LogoutPanel2 component.
 */
interface LogoutPanelProps {
    /** Boolean indicating whether the modal should be shown. */
    show: boolean;
    /** Function to be called when the user confirms the logout action. */
    onConfirm: () => void;
    /** Function to be called when the user cancels the logout action. */
    onCancel: () => void;
}

/**
 * Component for displaying a logout confirmation panel.
 * @param show - Boolean indicating whether the modal should be shown.
 * @param onConfirm - Function to be called when the user confirms the logout action.
 * @param onCancel - Function to be called when the user cancels the logout action.
 * @returns JSX.Element
 */
export const LogoutPanel = ({ show, onConfirm, onCancel }: LogoutPanelProps): JSX.Element => {
    /**
     * Handles the confirmation action.
     */
    const handleConfirm = (): void => {
        onConfirm();
    };

    /**
     * Handles the cancellation action.
     */
    const handleCancel = (): void => {
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
