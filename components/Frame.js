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

    function ToolbarTitle({ page, isNotHidden }) {
        if (typeof isNotHidden != "undefined") {
            if (!isNotHidden.includes(currPage)) {
                return null;
            }
        }
        return (
            <div className="column is-full toolbar-title toolbar-is-hidden">
                {page}
            </div>
        );
    }

    function ToolbarElement({ page, route, isNotHidden }) {
        if (typeof isNotHidden != "undefined") {
            if (!isNotHidden.includes(currPage)) {
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
                    <ToolbarTitle page="Member" />
                    <ToolbarElement page="Home" route="/member" />
                    <ToolbarElement page="Profile" route="/profile" />
                    <ToolbarTitle page="Opportunities" />
                    <ToolbarElement
                        page="Find Opportunity"
                        route="/member/opportunities"
                    />
                    <ToolbarTitle page="Tutoring" />
                    <ToolbarElement
                        page="Tutoring Dashboard"
                        route="/member/tutoring"
                    />
                    <ToolbarElement
                        page="Find Tutee"
                        route="/member/tutoring/findtutee"
                    />
                    <ToolbarTitle
                        page="Tutee"
                        isNotHidden={["Information", "Feedback"]}
                    />
                    <ToolbarElement
                        page="Information"
                        route={"/member/tutoring/tutee/" + getTuteeId()}
                        isNotHidden={["Information", "Feedback"]}
                    />
                    <ToolbarElement
                        page="Feedback"
                        route={
                            "/member/tutoring/tutee/" +
                            getTuteeId() +
                            "/feedback"
                        }
                        isNotHidden={["Information", "Feedback"]}
                    />
                    <ToolbarTitle
                        page="Officer"
                        isNotHidden={[
                            "Officer Home",
                            "Verify Hours",
                            "Verify Tutoring",
                            "Moderator Dashboard",
                            "Create Opportunity",
                            "Create Session",
                        ]}
                    />
                    <ToolbarElement
                        page="Officer Home"
                        route={"/officer"}
                        isNotHidden={[
                            "Officer Home",
                            "Verify Hours",
                            "Verify Tutoring",
                            "Moderator Dashboard",
                            "Create Opportunity",
                            "Create Session",
                        ]}
                    />
                    <ToolbarElement
                        page="Verify Hours"
                        route={"/officer/verify/hours"}
                        isNotHidden={[
                            "Officer Home",
                            "Verify Hours",
                            "Verify Tutoring",
                            "Moderator Dashboard",
                            "Create Opportunity",
                            "Create Session",
                        ]}
                    />
                    <ToolbarElement
                        page="Verify Tutoring"
                        route={"/officer/verify/tutoring"}
                        isNotHidden={[
                            "Officer Home",
                            "Verify Hours",
                            "Verify Tutoring",
                            "Moderator Dashboard",
                            "Create Opportunity",
                            "Create Session",
                        ]}
                    />
                    <ToolbarTitle
                        page="Moderator"
                        isNotHidden={[
                            "Moderator Dashboard",
                            "Create Opportunity",
                            "Create Session",
                        ]}
                    />
                    <ToolbarElement
                        page="Moderator Dashboard"
                        route={"/moderator/"}
                        isNotHidden={[
                            "Moderator Dashboard",
                            "Create Opportunity",
                            "Create Session",
                        ]}
                    />
                    <ToolbarElement
                        page="Create Opportunity"
                        route={"/moderator/create/opportunity"}
                        isNotHidden={[
                            "Moderator Dashboard",
                            "Create Opportunity",
                            "Create Session",
                        ]}
                    />
                    <ToolbarElement
                        page="Create Session"
                        route={"/moderator/create/session"}
                        isNotHidden={[
                            "Moderator Dashboard",
                            "Create Opportunity",
                            "Create Session",
                        ]}
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
                    <div className="columns is-desktop">
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
