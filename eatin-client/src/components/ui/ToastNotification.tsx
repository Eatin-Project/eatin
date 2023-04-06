import "./ToastNotification.css";

import React, { FC } from "react";
import { ToastContainer, Zoom } from "react-toastify";

export const ToastNotification: FC = () => {
    return (
        <ToastContainer
            limit={1}
            position="top-center"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop
            transition={Zoom}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    );
};
