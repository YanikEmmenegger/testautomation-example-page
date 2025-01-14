import {Toaster} from "react-hot-toast";

const ToasterProvider = () => {
    return (
        <Toaster containerClassName={"toast-container"} position="bottom-center" toastOptions={
            {
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
