// import "../node_modules/bulma/css/bulma.css";
import "../styles/globals.css";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "../node_modules/nprogress/nprogress.css"; //styles of nprogress
import React, { useEffect } from "react";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;
