interface LogoutPanelProps {
    onConfirm: () => void;
    onCancel: () => void;
}

export const LogoutPanel = ({onConfirm, onCancel}: LogoutPanelProps) => {
    return (
        <div className="logout-panel">
            <div className="logout-panel-content">
                <div className="logout-panel-message">
                    Biztos ki szeretnél jelentkezni?
                </div>
                <div className="logout-panel-buttons">
                    <button onClick={onConfirm}>Igen</button>
                    <button onClick={onCancel}>Nem</button>
                </div>
            </div>
        </div>
    );
};