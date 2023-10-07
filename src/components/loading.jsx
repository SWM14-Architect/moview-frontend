import React from 'react';
import { SyncLoader } from "react-spinners";

function Loading({ message, isLoading }) {
  return (
    <div className={`loading_modal ${isLoading ? 'active' : ''}`}>
      <h3>{message}</h3>
      <SyncLoader color="#fff"/>
    </div>
  )
}

export default Loading;