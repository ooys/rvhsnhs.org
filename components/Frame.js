import React from "react";
import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer";
import Link from "next/link";
function withFrame(C, currPage) {
    function getTuteeId() {
        // get tutee id from location.pathname
        const pathname = window.location.pathname;
        var indices = [];
        var idx = pathname.indexOf("/");
        while (idx != -1) {
            indices.push(idx);
            idx = pathname.indexOf("/", idx + 1);
        }
        if (indices.length === 4) {
            return pathname.substring(pathname.lastIndexOf("/") + 1);
        } else {
            return pathname.substring(indices[3] + 1, indices[4]);
        }
    }

    function ToolbarTitle({ page, isHidden }) {
        if (typeof isHidden != "undefined") {
            if (!isHidden.includes(currPage)) {
                return null;
            }
        }
        return (
            <div className="column is-full toolbar-title toolbar-is-hidden">
                {page}
            </div>
        );
    }

    function ToolbarElement({ page, route, isHidden }) {
        if (typeof isHidden != "undefined") {
            if (!isHidden.includes(currPage)) {
                return null;
            }
        }
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
                    <ToolbarTitle page="Opportunities" />
                    <ToolbarElement
                        page="Find Opportunity"
                        route="/member/opportunities"
                    />
                    <ToolbarTitle page="Tutoring" />
                    <ToolbarElement page="Dashboard" route="/member/tutoring" />
                    <ToolbarElement
                        page="Calendar"
                        route="/member/tutoring/calendar"
                    />
                    <ToolbarElement
                        page="Find Tutee"
                        route="/member/tutoring/findtutee"
                    />
                    <ToolbarTitle
                        page="Tutee"
                        isHidden={["Information", "Plan Sessions", "Feedback"]}
                    />
                    <ToolbarElement
                        page="Information"
                        route={"/member/tutoring/tutee/" + getTuteeId()}
                        isHidden={["Information", "Plan Sessions", "Feedback"]}
                    />
                    <ToolbarElement
                        page="Plan Sessions"
                        route={
                            "/member/tutoring/tutee/" +
                            getTuteeId() +
                            "/plansessions"
                        }
                        isHidden={["Information", "Plan Sessions", "Feedback"]}
                    />
                    <ToolbarElement
                        page="Feedback"
                        route={
                            "/member/tutoring/tutee/" +
                            getTuteeId() +
                            "/feedback"
                        }
                        isHidden={["Information", "Plan Sessions", "Feedback"]}
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
