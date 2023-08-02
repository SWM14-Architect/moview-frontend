import {ToastContainer} from "react-toastify";

function ToastContainerComponent(){
  return <ToastContainer
    position="top-center"
    autoClose={2000}
    hideProgressBar={true}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss={false}
    draggable
    theme="colored"
  />
}

export default ToastContainerComponent;