import { React } from 'react';
import HashLoader from "react-spinners/HashLoader";
import { Dimmer } from 'semantic-ui-react';

function Loader (props) {
    const override = `
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
    return (
        <Dimmer active>
            {/* <MoonLoader color={"red"} loading={true} css={override} size={150}/> */}
            <HashLoader color={"#db2828"} loading={true} css={override} size={150}/>
            {(props.company ? 
            <h4>Gathering {props.company}'s analytics...</h4> :
            <h4>Select A Company...</h4>)}
        </Dimmer>
    )
}

export default Loader;