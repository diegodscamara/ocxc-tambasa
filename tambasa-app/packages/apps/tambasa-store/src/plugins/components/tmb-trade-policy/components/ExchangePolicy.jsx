
import React from "react";

export default (props) => {
  return (
    <div className="exchange" >
      <h1><strong>{props.tradePolicyTitle}</strong ></h1>
      <div dangerouslySetInnerHTML={{ __html: props.tradePolicyConfig }}></div>
    </div >
  )
}
