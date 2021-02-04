import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {Container,Menu} from 'semantic-ui-react';
import Head from 'next/head';
// import 'semantic-ui-css';
import Header from './Header';

const exp = (props) => {
    return (
    <Container>
        <Head> <link async rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@${props.versions.sui}/dist/semantic.min.css"/></Head>
        <Header/>
        {props.children}
     </Container>
    );
};
export default exp;