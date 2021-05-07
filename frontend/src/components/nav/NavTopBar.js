import { React } from 'react'
import { Menu, Header, Dropdown, Input, Icon, Container, MenuHeader } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import "../../assets/css/components/main/NavTopBar.css"

export default function NavTopBar(props) {

    const toggleSideBarIcon = (visible) => {
        return (
            (visible ? <Icon className='top-nav-icon' name='indent'></Icon> : <Icon className='top-nav-icon' name='outdent'></Icon>)
        );
    }

    return (
        <Menu inverted>

            <Menu.Item as='a' onClick={() => props.toggleSideBarState(!props.isVisible)}>
                {toggleSideBarIcon(props.isVisible)}
            </Menu.Item>

            <Menu.Item>
                <Header size="large" color="red" as={Link} name='Main' to='/'>
                    samplecompany Health Check
                </Header>
            </Menu.Item>
            
            <Menu.Item>
                <Icon inverted name='th' />
                <Dropdown text='Dashboards'>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} name='samplecompany' to='/samplecompany'>
                            <Icon name="caret right" />
                            samplecompany
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} name='analytics' to='/analytics'>
                            <Icon name="caret right" />
                            analytics
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>

            <Menu.Menu position="right">
                <Menu.Item>
                    <Input icon={<Icon name='search' color="red" inverted circular link />} placeholder='Search...' />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}
