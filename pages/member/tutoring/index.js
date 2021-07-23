import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer";
import withAuth from "/components/auth/withAuth.js";
import { useRouter } from "next/router";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import {
    AddBox,
    Check,
    Clear,
    DeleteOutline,
    ChevronRight,
    Edit,
    SaveAlt,
    FilterList,
    FirstPage,
    LastPage,
    ChevronLeft,
    Search,
    ArrowDownward,
    Remove,
    ViewColumn,
} from "@material-ui/icons";

initFirebase();
const db = firebase.firestore();

function TutorSelect() {
    const router = useRouter();
    const tuteeRef = db.collection("tutee-requests");
    const [snapshot, loading, error] = useCollectionOnce(tuteeRef);
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => (
            <DeleteOutline {...props} ref={ref} />
        )),
        DetailPanel: forwardRef((props, ref) => (
            <ChevronRight {...props} ref={ref} />
        )),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => (
            <FirstPage {...props} ref={ref} />
        )),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => (
            <ChevronRight {...props} ref={ref} />
        )),
        PreviousPage: forwardRef((props, ref) => (
            <ChevronLeft {...props} ref={ref} />
        )),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => (
            <ArrowDownward {...props} ref={ref} />
        )),
        ThirdStateCheck: forwardRef((props, ref) => (
            <Remove {...props} ref={ref} />
        )),
        ViewColumn: forwardRef((props, ref) => (
            <ViewColumn {...props} ref={ref} />
        )),
    };

    function TuteeCard(tutee) {
        return null;
    }

    function DisplayTutees({ tutees }) {
        let tableData = [];
        {
            tutees.docs.map((tutee, index) => {
                if (tutee.id != "init") {
                    let tuteeData = tutee.data();
                    console.log(tuteeData);
                    tableData.push({
                        timestamp: new Date(
                            tuteeData.timestamp.seconds * 1000
                        ).toString(),
                        termlength: tuteeData.termlength,
                        school: tuteeData.tutee.school.name,
                        grade: tuteeData.tutee.school.grade,
                        subject: tuteeData.tutee.school.subject,
                        course: tuteeData.tutee.school.course,
                        studyhall: tuteeData.availability.studyhall,
                        exterior: tuteeData.availability.exterior,
                    });
                }
            });
        }
        const subjects = [
            "English",
            "Social Sciences & History",
            "Mathematics",
            "Science",
            "World Languages",
            "Arts",
            "Music",
        ];
        return (
            <div className="tutee-table-wrapper">
                <MaterialTable
                    icons={tableIcons}
                    title="Select Tutee"
                    columns={[
                        // { title: "Timestamp", field: "timestamp" },
                        { title: "Term Length", field: "termlength" },
                        { title: "School", field: "school" },
                        {
                            title: "Grade",
                            field: "grade",
                        },
                        {
                            title: "Subject",
                            field: "subject",
                            lookup: {
                                English: "English",
                                "Social Sciences & History":
                                    "Social Sciences & History",
                                Mathematics: "Mathematics",
                                Science: "Science",
                                "World Languages": "World Languages",
                                Arts: "Arts",
                                Music: "Music",
                            },
                        },
                        {
                            title: "Course",
                            field: "course",
                        },
                        {
                            title: "Study Hall",
                            field: "studyhall",
                        },
                        {
                            title: "Availabilities",
                            field: "exterior",
                        },
                    ]}
                    data={tableData}
                    options={{
                        filtering: true,
                    }}
                />
            </div>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error != undefined || snapshot == undefined) {
        return <div>Error: {error}</div>;
    } else {
        return (
            <>
                <Navbar user="member" />
                <div className="page-wrapper" id="tutor-index">
                    <DisplayTutees tutees={snapshot} />
                </div>
                <Footer />
            </>
        );
    }
}

export default withAuth(TutorSelect, "member");
