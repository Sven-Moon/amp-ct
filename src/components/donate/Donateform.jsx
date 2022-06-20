import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const DonateForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0)
  const [errorMessage, setErrorMessage] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [payEnabled, setPayEnabled] = useState(true)
  const [confirmData, setConfirmData] = useState({ 'total': 0, 'num': '' })

  const buttons = {
    coffee: {
      amount: 5,
      img: 'http://clipart-library.com/newimages/coffee-cup-clip-art-10.png'
    },
    sandwich: {
      amount: 10,
      img: 'http://clipart-library.com/clipart/586995.htm'
    },
    meal: {
      amount: 20,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY7E3aqHAbHVemj-VTLks2dlURSPXZeD48tGEji89oPIxYmi7t&s'
    },
    shirt: {
      amount: 50,
      img: 'http://clipart-library.com/images_k/shirt-clipart-transparent/shirt-clipart-transparent-20.png'
    }
  }

  const addDonation = (donation) => {
    setTotal(total + donation)
    document.querySelector(".motivate").disabled = false
  }
  const clearTotal = () => {
    setTotal(0)
    document.querySelector(".motivate").disabled = true
  }
  const AddFunds = (props) => {
    return (
      <button onClick={() => addDonation(props.obj.amount)} style={{ backgroundImage: `url({props.obj.img})` }}>
        <div className="amount">${props.obj.amount}</div>
      </button>
    )
  }
  const handlePay = async (e) => {
    e.preventDefault()
    const data = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    })
    console.log('payment intent received:', data);
    if (data['error']) {
      setErrorMessage(data['error']['message'])
      setShowForm('error')
    } else {
      setConfirmData({'total': total, 'num': data.paymentIntent.id})
      setShowForm(true)
      setTotal(0)
      toggleDonatePay()
    }
  }
  const toggleDonatePay = () => {
    console.log('happens');
    document.getElementById("donate-box").classList.toggle("show")
    document.getElementById("payment-form").classList.toggle("show")
    // expandCollapseToggle(donateBox)
    // if (payForm) expandCollapseToggle(payForm)
    
  }
  function expandCollapseToggle(el) {
    if (el.hidden) el.hidden = false
    if (el.classList.contains("show")) {
      el.classList.remove("fadeBox")
      el.classList.add("fadeInBox")
    } else {
      el.classList.remove("fadeInBox")
      el.classList.add("fadeBox")
    }
  }

  const DonateConfirm = (props) => {
    return (
      <React.Fragment>
        <div className="confirmation">
          <h1>Thank you for the motivation! I'll work ${props.confirmData.total} harder!</h1>
          <h3>Motivation Confirmation Number: {props.confirmData.num}</h3>
        </div>
      </React.Fragment>
    )
  }
  
  return (
    <React.Fragment>
     {/* Payment Element */}
      <form id="payment-form" onSubmit={handlePay}>
        <PaymentElement id="payment-element" />        
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        <button className="back_btn" onClick={toggleDonatePay}>Back</button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
          
      </form>
      {showForm ? <DonateConfirm confirmData={confirmData} />
        : showForm === 'error' ? 
          <div id="payment-message">There was an error processing your payment: {errorMessage}</div>
        : null }

      {/* Pick motivation level */}
      <div id="donate-box" className="show">
        <h3>...give me money</h3>
            <div className="amount-select_box">
              <AddFunds obj={buttons.coffee} />
              <AddFunds obj={buttons.sandwich} />
              <AddFunds obj={buttons.meal} />
              <AddFunds obj={buttons.shirt} />
            </div>
        <div className="donate-actions">
          <button className="clear-total" onClick={() => clearTotal()}>Clear total</button>
          <button className="motivate" onClick={() => toggleDonatePay()} >Motivate me!</button>
        </div>
      </div>
      <div className="total-box">Total you wish to bequeath:<div className="total"> ${total}</div></div>
        
    </React.Fragment>
  );
}

export default DonateForm