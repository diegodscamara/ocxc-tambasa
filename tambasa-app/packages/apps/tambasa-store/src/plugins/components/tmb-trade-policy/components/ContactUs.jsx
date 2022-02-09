import React from "react";

export default (props) => {

  const {
  } = props

  return (
    <div className="card-form" >
      <form name="ContactUs" method="post" >
        <div className="box" >
          <div className="title-form" >
            <h4>{props.contactUsTitle}</h4 >
            <h1>TAMBASA</h1 >
          </div >
          <div className="box__fields" >
            <input type="text" className="input_text" placeholder={props.contactUsCompany} />
            <input type="text" className="input_text" placeholder={props.contactUsEmail} />
            <input type="text" className="input_text" placeholder={props.contactUsTelephone} />
            <textarea className="input_text message" placeholder={props.contactUsMessage} ></textarea >
            <button className="button" type="button" > {props.contactUsButton}</button >
          </div >

        </div >
      </form >
    </div >
  )
}
