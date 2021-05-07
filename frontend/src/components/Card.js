import React from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import samplecompanyLogo from "../assets/img/samplecompanyLogo.png";
import analyticsLogo from "../assets/img/analyticsLogo.png";
const CardExampleLinkCardProp = () => (
  <Card.Group
    style={{
      marginTop: "10%",
      marginBottom: "16%",
    }}
  >
    <Card style={{ marginLeft: "20%"}} as={Link} name="samplecompany" to="/samplecompany">
      <Card.Content>
        <img
          src={samplecompanyLogo}
          style={{
            width: "75%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0)",
          }}
        />
      </Card.Content>
    </Card>

    <Card
      style={{ marginLeft: "18%" }}
      as={Link}
      name="analytics"
      to="/analytics"
    >
      <Card.Content>
        <img
          src={analyticsLogo}
          style={{
            marginTop: "20px",
            width: "75%",
            height: "70%",
            backgroundColor: "rgba(0,0,0,0)",
          }}
        />
      </Card.Content>
    </Card>
  </Card.Group>
);

export default CardExampleLinkCardProp;
