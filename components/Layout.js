import React, { Component, ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Footer from "./Footer";
import ToggleDisplayThemeButton from "./ToggleDisplayThemeButton";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { displayTheme: "light" };
  }
  componentDidMount() {
    this.setState({
      displayTheme: window.localStorage.displayTheme || "light",
    });
  }
  toggleDisplayTheme() {
    const newDisplayTheme = this.state.displayTheme == "light"
      ? "dark"
      : "light";
    window.localStorage.setItem("displayTheme", newDisplayTheme);
    return newDisplayTheme;
  }
  render() {
    return (
      <div className={`${this.state.displayTheme} `}>
        <Head>
          <title>{this.props.title}</title>
          <meta name="viewport" content="width=device-width"></meta>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ToggleDisplayThemeButton
          onClick={() =>
            this.setState({ displayTheme: this.toggleDisplayTheme() })}
          displayTheme={this.state.displayTheme}
        />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
export default Layout;
