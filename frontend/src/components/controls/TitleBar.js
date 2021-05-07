// dependencies
import { React } from 'react';
import { Header, Menu, Image, Icon } from 'semantic-ui-react';
import "../../assets/css/components/controls/TitleBar.css"

function TitleBar(props) {
    return (
        <Menu attached='top' className="headerStyle">
            <div className="title-bar-container">
                <div className="title-bar-header">
                    <Header
                        inverted
                        size="large"
                        content={"Currently Viewing: " + props.company}
                        className="headerText"
                    />
                </div>
                <div className="title-bar-menu" >
                    <Image className="title-bar-logo" src={props.logo} size='small' />
                    <Icon className="title-bar-filter" name="ellipsis vertical" />
                </div>
            </div>
        </Menu>
    )    
}

export default TitleBar