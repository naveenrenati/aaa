// TeamMemberCard.js
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "bootstrap/dist/css/bootstrap.min.css";
import "./TeamMemberCard.css";

const TeamMemberCard = ({ name, email, image, address, phoneNumber }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  useEffect(() => {
    const card = document.getElementById(`card-${name}`);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [name]);

  return (
    <div
      className={`col-md-3 col-xl-4 mb-8 rounded ${
        isFlipped ? "card-flipped" : ""
      }`}
    >
      <Card
        id={`card-${name}`}
        className="text-center card
          text-bg-info p-3 card-hover
         shadow-sm transition"
        style={{ height: "50vh" }}
       
      >
        <div className="circle-card"  >
          <img src={image} alt={name} className="img-fluid rounded-circle" />
        </div>
          <div className="card-body">
            <div className="mt-3">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td className="text-dark bg-info align-middle"><strong>Name:</strong>{name}</td>
                  </tr>
                  <tr>
                     
                    <td className="text-dark bg-info align-middle"><strong>Email:</strong>{email}</td>
                  </tr>
                  <tr>
                    
                    <td className="text-dark bg-info align-middle">
                    <strong>Contact:</strong> {phoneNumber}
                    </td>
                  </tr>
                  <tr>
                    
                    <td className="text-dark bg-info align-middle">
                    <strong>Address:</strong>{address}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </Card>
    </div>
  );
};

export default TeamMemberCard;
