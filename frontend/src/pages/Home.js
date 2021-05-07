import React from "react";
import { Header, Segment, Menu } from "semantic-ui-react";
import Card from "../components/Card";

function Home() {
  return (
    <div style={{ marginTop: "1px" }}>
      <Segment.Group>
        <Segment.Group>
          <Segment className="segmentStyle">
            <Menu attached="top" className="headerStyle">
            </Menu>
            <Header
              inverted
              size="large"
              content="Welcome! Choose a dashboard from the dropdown."
              className="headerText center"
            />
            <Card />
          </Segment>
        </Segment.Group>
      </Segment.Group>
    </div>
  );
}

export default Home;
