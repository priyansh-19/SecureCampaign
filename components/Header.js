import React, { memo } from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';
const exp = () => {
    return (
        <Menu style ={{marginTop:'10px'}}>
            {/* <Menu.Item>Crowd Coin</Menu.Item> */}
            <Link route='/'>
            <a className="item">CrowdCoin</a>    
            </Link>
            <Menu.Menu position = "right">
                {/* <Menu.Item>Campaigns</Menu.Item> */}

            <Link route='/'>
            <a className="item">Campaigns</a>    
            </Link>

            <Link route='/campaigns/new'>
            <a className="item">+</a>    
            </Link>

                {/* <Menu.Item>+</Menu.Item> */}
            </Menu.Menu>
        </Menu>
        );
    };
    export default exp ;