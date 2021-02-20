import React, { memo } from 'react';
import {Menu,Input} from 'semantic-ui-react';
import {Link} from '../routes';
const exp = () => {
    return (
        // <div>
        
        <Menu style ={{width:'80%', height:'60%'}}>
            {/* <Menu.Item>Crowd Coin</Menu.Item> */}
            <Link route='/'>
            <a className="item">CrowdCoin</a>    
            </Link>
            <Link route='/campaigns/new'>
            <a className="item">+</a>    
            </Link>
         

            <Menu.Menu position ='right'>
            {/* <Link route='/'>
            <a className="item">Campaigns</a>    
            </Link> */}
             <Menu.Item  style = {{width:'100%'}}>
              <Input  className='icon' icon='search' placeholder='Search...'style = {{}}/>
            </Menu.Item>

            {/* <Link route='/campaigns/new'>
            <a className="item">+</a>    
            </Link> */}

            </Menu.Menu>
           
        </Menu>
      
        );
    };
    export default exp ;