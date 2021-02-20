import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {Container,Menu,Header,Image,Divider} from 'semantic-ui-react';
import Head from 'next/head';
// import 'semantic-ui-css';
import Header1 from './Header';

const exp = (props) => {
    return (
    <div>
    <div style = {{height:'75px',margin:'',backgroundColor:'lightskyblue',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
        {/* <Header as='h2'>
             <Image circular src='C:\Users\priya\Downloads\Downloads 2\img.jpg' style ={{padding:'10px'}} /> Patrick
        </Header>     */}
        <Header1/>
    </div>
    <Divider horizontal style = {{width:'100%',padding:'0px'}}>.</Divider>
    <Container style = {{margin:'15px'}}>
        <Head> <link async rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@${props.versions.sui}/dist/semantic.min.css"/></Head>
        {props.children}
     </Container>
     </div>
    );
};
export default exp;