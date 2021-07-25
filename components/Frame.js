import React from "react";
import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer";
import Link from "next/link";
function withFrame(C, currPage) {
    function ToolbarElement({ page, route }) {
        if (currPage === page) {
            return (
                <Link href={route}>
                    <a className="column is-full toolbar-element element-selected">
                        {page}
                    </a>
                </Link>
            );
        } else {
            return (
                <Link href={route}>
                    <a className="column is-full toolbar-element">{page}</a>
                </Link>
            );
        }
    }

    function Toolbar() {
        return (
            <>
                <div className="columns is-multiline frame-toolbar">
                    <div className="column is-full toolbar-title">Tutoring</div>
                    <ToolbarElement page="Dashboard" route="/member/tutoring" />
                    <ToolbarElement
                        page="Calendar"
                        route="/member/tutoring/calendar"
                    />
                    <ToolbarElement
                        page="Find Tutee"
                        route="/member/tutoring/findtutee"
                    />
                </div>
            </>
        );
    }

    function Frame() {
        return (
            <>
                <Navbar user="member" />
                <div className="frame-wrapper">
                    <div className="columns">
                        <div className="column is-3">
                            <Toolbar />
                        </div>
                        <div className="column is-9">
                            <C />
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return class FrameComponent extends React.Component {
        render() {
            return (
                <>
                    <Frame />
                </>
            );
        }
    };
}

export default withFrame;
