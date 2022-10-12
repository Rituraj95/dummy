import { CircularProgress } from "@mui/material"
import './Modal.css'

function Loader({ load }) {
    if (load)
        return (
            <div className="modal__background">
                <CircularProgress />
            </div>
        )
}

export default Loader