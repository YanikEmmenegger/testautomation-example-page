import {Toaster} from "react-hot-toast";

const ToasterProvider = () => {
    return (
        <Toaster containerClassName={"toast-container"}  position="bottom-right" toastOptions={
            {
                duration: 10000,
                className: "toast",
                style: {
                    background: "#ff9f0f",
                    color: "#fff"
                }
            }
        }/>
    )
}
export default ToasterProvider
