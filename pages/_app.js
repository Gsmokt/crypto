import React from "react";
import App from "next/app";
import styled, { createGlobalStyle } from 'styled-components'


const GlobalStyles = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
      <GlobalStyles />
      <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
