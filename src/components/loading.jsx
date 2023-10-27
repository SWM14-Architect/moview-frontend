import React from 'react';
import { SyncLoader } from "react-spinners";

function Loading({ message, isLoading }) {
  return (
    <div className={`loading_modal ${isLoading ? 'active' : ''}`}>
      <h4>{message}</h4>
      <SyncLoader color="#fff"/>
    </div>
  )
}

export default Loading;