import withAuth from "/components/auth/withAuth.js";
import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import withFrame from "/components/Frame.js";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import dynamic from "next/dynamic";

const WelcomeTour = dynamic(() => import("/components/WelcomeTour"), {
    ssr: false,
});

initFirebase();
const db = firebase.firestore();

function Event({ opportunity }) {
    const router = useRouter();
    return (
        <>
            <a
                className="column is-full event"
                key={opportunity.eid}
                onClick={() => {
                    router.push("/member/opportunities/" + opportunity.eid);
                }}
                style={{
                    backgroundImage: `url("` + opportunity.picture + `")`,
                }}>
                <div className="event-title">{opportunity.title}</div>
            </a>
        </>
    );
}

function Events() {
    const eventRef = db.collection("opportunities").doc("master");
    const [data, loading, error] = useDocumentDataOnce(eventRef);
    if (loading) {
        return <>Loading Events...</>;
    }
    if (error != undefined || data == undefined) {
        // console.log("error");
        return <div>Error!</div>;
    } else {
        const opportunities = data.ongoing;
        return (
            <div className="columns is-multiline is-mobile events">
                {opportunities.map((opportunity, index) => {
                    return <Event key={index} opportunity={opportunity} />;
                })}
            </div>
        );
    }
}

function Opportunities() {
    const [isTourOpen, setIsTourOpen] = useState(true);
    const steps = [
        {
            selector: ".events",
            content: (
                <>
                    <div className="tour-header">Hours Opportunities</div>
                    <div className="tour-body">
                        All your volunteering opportunities are listed on this
                        page.
                        <br></br>
                        <br></br>
                        You can click on an opportunity to view more details. No
                        more SignUpGenious or google forms! <b>
                            Registration
                        </b>{" "}
                        and <b>verification</b> are all included.
                        <br></br>
                        <br></br>
                        However, please remember to register before showing
                        up... :)
                    </div>
                    <div className="tour-footer">
                        <img src="/images/nhslogo.png" />
                    </div>
                </>
            ),
            stepInteraction: false,
        },
        {
            selector: ".frame-toolbar-tutoring",
            content: (
                <>
                    <div className="tour-header"></div>
                    <div className="tour-body">
                        Here are all your <b>tutoring</b> related pages.
                    </div>
                    <div className="tour-footer">
                        <img src="/images/nhslogo.png" />
                    </div>
                </>
            ),
            stepInteraction: false,
        },
        {
            selector: "#toolbar-element-TutoringDashboard",
            content: (
                <>
                    <div className="tour-header"></div>
                    <div className="tour-body">
                        Let's check out your <b>Tutoring Dashboard</b>!<br></br>
                        <br></br>
                        Click "Tutoring Dashboard" to continue.
                    </div>
                    <div className="tour-footer">
                        <img src="/images/nhslogo.png" />
                    </div>
                </>
            ),
        },
    ];
    return (
        <>
            <WelcomeTour
                steps={steps}
                open={isTourOpen}
                setOpen={setIsTourOpen}
                route={"/member"}
                startAt={0}
                offset={0}
            />
            <div className="columns is-multiline tutor-list">
                <div className="column is-full tutor-list-title">
                    Hours Opportunities
                    <hr className="tutor-list-hr"></hr>
                </div>
                <div className="column is-full">
                    <Events />
                </div>
            </div>
        </>
    );
}

export default withAuth(
    withFrame(Opportunities, "Find Opportunity", true),
    "member"
);
