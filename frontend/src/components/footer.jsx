import React from 'react'
import ShipIcon from "../Images/shipIcon.png"
import DhlLogo from "../Images/dhl-logo.png"
import MasterCard from "../Images/master-card.png"
import Paypal from "../Images/paypal-card.png"
import VisaCagrd from "../Images/visa-card.png"

const footer = () => {
  return (
<div className="w-full border-t border-black px-4 sm:px-6 md:px-12 lg:px-24 py-6 bg-white">
  <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
    
    {/* Shipping & Payment Section */}
    <div className="flex flex-wrap items-center justify-center gap-3 text-gray-600 font-body text-sm sm:text-base">
      <span className="whitespace-nowrap">We ship with:</span>
      <img src={ShipIcon} alt="Shipping Icon" className="h-6 w-auto" />
      <img src={DhlLogo} alt="DHL Logo" className="h-6 w-auto" />
      <span className="ml-4 whitespace-nowrap">Payment Options:</span>
      <img src={VisaCagrd} alt="Visa Card" className="h-6 w-auto" />
      <img src={Paypal} alt="PayPal Logo" className="h-6 w-auto" />
      <img src={MasterCard} alt="MasterCard" className="h-6 w-auto" />
    </div>

    {/* Copyright */}
    <div className="text-center lg:text-right text-gray-500 font-body text-sm sm:text-base">
      <p>
        © 2022 Kaira. Design by{" "}
        <a
          href="https://al0kportfolio.netlify.app"
          className="text-black hover:underline"
        >
          Alok
        </a>
      </p>
      <p>
        Distribution by{" "}
        <a href="https://al0kportfolio.netlify.app" className="text-black hover:underline">
          Alok
        </a>
      </p>
    </div>
  </div>
</div>


  )
}

export default footer