import React from "react";
import { Button } from "@mui/material";

interface ConfirmationStepProps {
    handleSubmit: (event: React.FormEvent) => void;
}

function ConfirmationStep({ handleSubmit }: ConfirmationStepProps) {
    return (
        <>
            <Button variant="contained" onClick={handleSubmit}>Fizetés</Button>
        </>
    );
}

export default ConfirmationStep;
