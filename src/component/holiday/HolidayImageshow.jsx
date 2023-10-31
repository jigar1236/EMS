import React from 'react'
import Modal from "react-bootstrap/Modal";

const HolidayImageshow = ({show , onHide,imageurl}) => { 
  return (
  <Modal show={show} onHide={onHide}>
    <Modal.Body>
        <img src={imageurl} alt='Holiday' style={{width: "100%"}}/>
    </Modal.Body>
  </Modal>
  )
}

export default HolidayImageshow