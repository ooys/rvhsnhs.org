import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer";
import withAuth from "/components/auth/withAuth.js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import sendEmail from "/components/email/sendEmail.js";
import swal from "sweetalert";

initFirebase();
const db = firebase.firestore();
const auth = firebase.auth();

function TuteeApply() {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    const [userData, setUserData] = useState(["null", "null"]);
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();

    const isBlank = (value) => value.substring(0, 6) != "Select";

    let tutorsubject = watch("subject");

    const sessions = [
        ["Monday Morning", "1a"],
        ["Monday Afternoon", "1b"],
        ["Tuesday Morning", "2a"],
        ["Tuesday Afternoon", "2b"],
        ["Wednesday Morning", "3a"],
        ["Wednesday Afternoon", "3b"],
        ["Thursday Morning", "4a"],
        ["Thursday Afternoon", "4b"],
        ["Friday Morning", "5a"],
        ["Friday Afternoon", "5b"],
    ];

    function TutorCourse() {
        if (tutorsubject == undefined) {
            return null;
        } else {
            let choices = [];
            if (tutorsubject === "English") {
                choices = [
                    "English 9 Honors",
                    "English 9 Academic",
                    "English 10 Honors",
                    "English 10 Academic",
                    "English 11 Honors",
                    "English 11 Academic",
                    "AP English Language & Composition",
                    "English 12 Academic",
                    "English 12 Dual Enrollment",
                    "AP English Literature & Composition",
                    "Introduction to Journalism",
                    "Newspaper Journalism I",
                    "Newspaper Journalism II",
                    "Newspaper Journalism III",
                    "Photojournalism I",
                    "Photojournalism II",
                    "Photojournalism III",
                    "Creative Writing",
                    "21st Century Literacy Strategies 1",
                    "21st Century Literacy Strategies 2",
                ];
            } else if (tutorsubject === "Mathematics") {
                choices = [
                    "Algebra I",
                    "Geometry",
                    "Functions, Algebra & Data Analysis",
                    "Algebra II",
                    "Algebra II/Trigonometry Honors",
                    "Statistics & Probability",
                    "Discrete Mathematics",
                    "Advanced Functions & Modeling",
                    "Precalculus",
                    "Mathematical Analysis Honors",
                    "Calculus",
                    "AP Calculus AB",
                    "AP Calculus BC",
                    "AP Statistics",
                    "Computer Math/Intro. to Computer Science",
                    "AP Computer Science A",
                ];
            } else if (tutorsubject === "Social Sciences & History") {
                choices = [
                    "World History Geography 1 Academic",
                    "Intro to AP World History Honors",
                    "World History Geography 2 Academic",
                    "AP World History",
                    "U.S. & Virginia History Academic",
                    "U.S. History Dual Enrollment",
                    "AP U.S. History",
                    "U.S. & Virginia Government Academic",
                    "U.S. Government Dual Enrollment",
                    "AP U.S. Government & Comparative Gov’t",
                    "AP Economics – Micro & Macro",
                    "AP Psychology",
                    "AP Human Geography",
                    "Economics",
                    "Survey of Russian History",
                    "Foundations of Contemporary Russia",
                    "Global Social Issues",
                    "The World of Ideas",
                    "Modern International Relations",
                    "Psychology",
                    "AP Seminar (11th grade)",
                    "AP Research (12th grade)",
                    "African American History",
                ];
            } else if (tutorsubject === "Science") {
                choices = [
                    "Research Earth Science Honors",
                    "Earth Science Academic",
                    "Research Biology Honors",
                    "Biology Academic",
                    "AP Biology Dual Enrollment",
                    "Chemistry",
                    "Research Chemistry Honors",
                    "AP Chemistry",
                    "Conceptual Physics",
                    " Physics Honors",
                    " AP Physics C: Mechanics",
                    " Environmental Science",
                    " AP Environmental Science",
                    " Independent Science",
                    "Research-Dual Enrollment",
                    " Geospatial Science Dual Enrollment",
                ];
            } else if (tutorsubject === "World Languages") {
                choices = [
                    "American Sign Language I",
                    "American Sign Language II",
                    "American Sign Language III",
                    "American Sign Language IV Honors ",
                    "French I",
                    "French II",
                    "French III",
                    "French IV Honors",
                    "French V Honors",
                    "AP French Lang/Culture",
                    "German I",
                    "German II",
                    "German III",
                    "German IV Honors",
                    "DE German V#",
                    "AP German Lang/Culture",
                    "Latin I",
                    "Latin II",
                    "Latin III",
                    "Latin IV Honors",
                    "Latin V Honors",
                    "AP Latin",
                    "Spanish I",
                    "Spanish II",
                    "Spanish III",
                    "Spanish IV Honors",
                    "Spanish V Honors",
                    "AP Spanish Lang/Culture",
                    "Spanish Fluent Speakers II",
                    "Spanish Fluent Speakers III Honors",
                    "Spanish Fluent Speakers IV Honors",
                ];
            } else if (tutorsubject === "Arts") {
                choices = [
                    "Art I",
                    "Art II",
                    "Art III",
                    "Art IV",
                    "Photography",
                    "Computer Graphics & Design",
                    "AP Drawing",
                    "AP 2D Art and Design",
                    "AP 3D Art and Design",
                    "Theater Arts I",
                    "Theater Arts II",
                    "Theater Arts III",
                    "Theater Arts IV",
                    "Technical Theater I",
                    "Technical Theater 2",
                    "Musical Theater",
                ];
            } else if (tutorsubject === "Music") {
                choices = [
                    "Concert and Symphonic Band",
                    "Jazz Ensemble",
                    "Orchestra",
                    "Advanced Orchestra Honors",
                    "Artist Orchestra Honors",
                    "Chorus",
                    "Beginning Guitar",
                    "Intermediate Guitar",
                    "Advanced Guitar Honors",
                    "Artist Guitar Honors",
                    "Music Appreciation",
                ];
            }
            return (
                <label className="label">
                    Course of Tutelage
                    <div className="control">
                        <label className="label"></label>
                        <div className="select">
                            <select
                                {...register("course", {
                                    required: true,
                                    validate: isBlank,
                                })}>
                                <option>Select Course</option>
                                {choices.map((course) => (
                                    <option key={course} value={course}>
                                        {course}
                                    </option>
                                ))}
                                <option>Other</option>
                            </select>
                        </div>
                        <span className="help">
                            The course the student is currently enrolled in. If
                            the course is not listed above, please select
                            "Other" and specify in "Additional Comments" section
                            below.
                        </span>
                        <span className="help is-danger">
                            {errors.subject?.type === "required" &&
                                "A course is required."}
                            {errors.subject?.type === "validate" &&
                                "A course is required."}
                        </span>
                    </div>
                </label>
            );
        }
    }

    function Availability() {
        return (
            <div className="field">
                <label className="label">
                    Before/After School Availability
                    <div className="control">
                        {sessions.map((session) => (
                            <>
                                <input
                                    key={session[1]}
                                    className="checkbox"
                                    type="checkbox"
                                    {...register(session[1], {})}></input>
                                {"    "}
                                {session[0]}
                                <br></br>
                            </>
                        ))}
                        <span className="help">
                            Morning sessions are from 8:15 AM - 9:00 AM<br></br>
                            Afternoon sessions are from 4:15 PM to 5:15 PM
                        </span>
                    </div>
                </label>
            </div>
        );
    }

    async function getUserData(uid) {
        if (userData[0] != uid) {
            const userRef = db.collection("users").doc(uid);
            userRef.get().then((snapshot) => {
                const data = snapshot.data();
                setUserData([uid, data]);
                return data;
            });
        } else {
            return userData[1];
        }
    }

    async function onSubmitForm(values) {
        console.log(values);
        let exterior = [];
        sessions.forEach((session) => {
            if (values[session[1]]) {
                exterior.push(session[0]);
            }
        });
        console.log(exterior);

        const tuteeRef = db.collection("tutee-requests");
        await tuteeRef
            .add({
                tutee: {
                    uid: userData[0],
                    first: values.first,
                    last: values.last,
                    email: values.email,
                    school: {
                        name: values.school,
                        grade: values.grade,
                        subject: values.subject,
                        course: values.course,
                        teacher: {
                            first: values.teacherfirst,
                            last: values.teacherlast,
                            email: values.teacheremail,
                        },
                        counseloremail: values.counseloremail,
                    },
                },
                parent: {
                    first: values.parentfirst,
                    last: values.parentlast,
                    email: values.parentemail,
                },
                termlength: values.termlength,
                comments: values.comments,
                format: values.format,
                availability: {
                    studyhall: values.studyhall,
                    exterior: exterior,
                },
                timestamp: new firebase.firestore.Timestamp.now(),
            })
            .then(() => {
                let emailHtml = `You have registered for tutoring in <b>${values.subject}</b> with Riverside NHS. A follow-up email will be sent once you are paired with our tutor!`;
                sendEmail(
                    values.email + "," + values.parentemail,
                    "Registered: Riverside NHS Tutoring",
                    "Success!",
                    emailHtml
                );
            })
            .then(() => {
                swal(
                    "Success!",
                    "Tutoring application has been submitted. We have sent you a confirmation email.",
                    "success"
                );
                router.push("/findtutor");
            });
    }

    function FormWrapper({ uid }) {
        if (userData[0] === uid) {
            const data = userData[1];
            return (
                <div className="page-wrapper" id="tutee-apply">
                    <div
                        className={
                            "columns tutee-apply-section-wrapper is-vcentered is-multiline"
                        }>
                        <div className="column about-section-text is-full">
                            <div className="about-section-header">
                                Tutee Registration
                            </div>
                            <div className="about-section-body">
                                Students, please complete this form carefully
                                with a parental guardian to request a tutor in a
                                particular subject area. Please check your email
                                reguarly for our reply when we find a tutor
                                suitable for your preferences.
                            </div>
                        </div>
                    </div>
                    <div className={"tutee-apply-section-wrapper"}>
                        <form
                            className="create-opportunity-form"
                            onSubmit={handleSubmit(onSubmitForm)}>
                            <div className="field-title">Tutee Information</div>
                            <hr className="field-title-hr"></hr>
                            <fieldset disabled>
                                <div className="field is-grouped">
                                    <label className="label">
                                        First Name
                                        <div className="control">
                                            <input
                                                className="input"
                                                type="text"
                                                value={
                                                    data.first
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    data.first
                                                        .slice(1)
                                                        .toLowerCase()
                                                }
                                                {...register("first", {
                                                    required: true,
                                                })}></input>
                                            <span className="help is-danger">
                                                {errors.first?.type ===
                                                    "required" &&
                                                    "First name is required."}
                                            </span>
                                        </div>
                                    </label>
                                    <label className="label">
                                        Last Name
                                        <div className="control">
                                            <input
                                                className="input"
                                                type="text"
                                                value={
                                                    data.last
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    data.last
                                                        .slice(1)
                                                        .toLowerCase()
                                                }
                                                {...register("last", {
                                                    required: true,
                                                })}></input>
                                            <span className="help is-danger">
                                                {errors.last?.type ===
                                                    "required" &&
                                                    "Last name is required."}
                                            </span>
                                        </div>
                                    </label>
                                </div>

                                <div className="field is-grouped">
                                    <label className="label">
                                        Student LCPS Email
                                        <div className="control">
                                            <input
                                                className="input"
                                                type="text"
                                                value={data.email}
                                                {...register("email", {
                                                    required: true,
                                                })}></input>
                                            <span className="help">
                                                LCPS issued student email
                                                (Student ID +@lcps.org)
                                            </span>
                                            <span className="help is-danger">
                                                {errors.title?.type ===
                                                    "required" &&
                                                    "Email is required."}
                                            </span>
                                        </div>
                                    </label>
                                </div>
                            </fieldset>
                            <div className="field is-grouped">
                                <label className="label">
                                    <div className="control">
                                        <label className="label"></label>
                                        <input
                                            className="checkbox"
                                            type="checkbox"
                                            {...register("studentinfo", {
                                                required: true,
                                            })}></input>
                                        {"    "}I am the student displayed
                                        above, and I confirm that the above
                                        information about me is correct.
                                        <span className="help">
                                            If the above is not you, please
                                            click{" "}
                                            <Link href="/student/findtutor">
                                                <a>here</a>
                                            </Link>{" "}
                                            to refresh.
                                        </span>
                                        <span className="help is-danger">
                                            {errors.studentinfo?.type ===
                                                "required" &&
                                                "You are required to verify your student information. If the above is incorrect, please contact us."}
                                        </span>
                                    </div>
                                </label>
                            </div>
                            <br></br>
                            <div className="field-title">
                                Parent Information
                            </div>
                            <hr className="field-title-hr"></hr>
                            <div className="field is-grouped">
                                <label className="label">
                                    First Name
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Johnny"
                                            {...register("parentfirst", {
                                                required: true,
                                            })}></input>
                                        <span className="help is-danger">
                                            {errors.parentfirst?.type ===
                                                "required" &&
                                                "First name is required."}
                                        </span>
                                    </div>
                                </label>
                                <label className="label">
                                    Last Name
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Appleseed"
                                            {...register("parentlast", {
                                                required: true,
                                            })}></input>
                                        <span className="help is-danger">
                                            {errors.parentlast?.type ===
                                                "required" &&
                                                "Last name is required."}
                                        </span>
                                    </div>
                                </label>
                            </div>
                            <div className="field is-grouped">
                                <label className="label">
                                    Parent Email
                                    <div className="control">
                                        <label className="label"></label>
                                        <input
                                            className="input"
                                            type="email"
                                            {...register("parentemail", {
                                                required: true,
                                            })}></input>
                                        <span className="help is-danger">
                                            {errors.parentemail?.type ===
                                                "required" &&
                                                "A parent email is required."}
                                        </span>
                                    </div>
                                </label>
                            </div>
                            <label className="label">
                                <div className="control">
                                    <label className="label"></label>
                                    <input
                                        className="checkbox"
                                        type="checkbox"
                                        {...register("parentverify", {
                                            required: true,
                                        })}></input>
                                    {"    "}I am the student's parental
                                    guardian, and I permit my child to
                                    participate in the Riverside National Honor
                                    Society Tutoring Program.
                                    <span className="help is-danger">
                                        {errors.parentverify?.type ===
                                            "required" &&
                                            "You are required to give permission for your child to participate in the tutoring program."}
                                    </span>
                                </div>
                            </label>
                            <br></br>
                            <div className="field-title">
                                School Information
                            </div>
                            <hr className="field-title-hr"></hr>
                            <div className="field">
                                <label className="label">
                                    School
                                    <div className="control">
                                        <label className="label"></label>

                                        <div className="select">
                                            <select
                                                {...register("school", {
                                                    required: true,
                                                    validate: isBlank,
                                                })}>
                                                <option>Select School</option>
                                                <option>
                                                    Riverside High School
                                                </option>
                                                <option>
                                                    Belmont Ridge Middle School
                                                </option>
                                                <option>
                                                    Seldens Landing Elementary
                                                    School
                                                </option>
                                                {/* <option>
                                                Licoln Elementary School
                                            </option> */}
                                            </select>
                                        </div>
                                        <span className="help">
                                            Tutoring program is currently only
                                            available for schools listed above.
                                            If you are enrolled in any other
                                            school within Loudoun County Public
                                            Schools and would like to
                                            participate in the program, please
                                            directly contact us.
                                        </span>
                                        <span className="help is-danger">
                                            {errors.school?.type ===
                                                "required" &&
                                                "You are required to verify your student information. If the above is not you or incorrect, please contact us."}
                                            {errors.school?.type ===
                                                "validate" &&
                                                "You are required to verify your student information. If the above is not you or incorrect, please contact us."}
                                        </span>
                                    </div>
                                </label>
                            </div>
                            <div className="field is-grouped">
                                <label className="label">
                                    Grade Level
                                    <div className="control">
                                        <label className="label"></label>
                                        <input
                                            className="input"
                                            type="number"
                                            min={1}
                                            max={12}
                                            {...register("grade", {
                                                required: true,
                                            })}></input>
                                        <span className="help is-danger">
                                            {errors.grade?.type ===
                                                "required" &&
                                                "A grade level is required."}
                                        </span>
                                    </div>
                                </label>
                            </div>
                            <div className="field is-grouped">
                                <label className="label">
                                    Counselor Email
                                    <div className="control">
                                        <label className="label"></label>
                                        <input
                                            className="input"
                                            type="email"
                                            {...register("counseloremail", {
                                                required: true,
                                            })}></input>
                                        <span className="help is-danger">
                                            {errors.counseloremail?.type ===
                                                "required" &&
                                                "A counselor email is required."}
                                        </span>
                                    </div>
                                </label>
                            </div>
                            <br></br>
                            <div className="field-title">
                                Tutoring Information
                            </div>
                            <hr className="field-title-hr"></hr>
                            <div className="field">
                                <label className="label">
                                    Subject of Tutelage
                                    <div className="control">
                                        <label className="label"></label>
                                        <div className="select">
                                            <select
                                                {...register("subject", {
                                                    required: true,
                                                    validate: isBlank,
                                                })}>
                                                <option>Select Subject</option>
                                                <option>English</option>
                                                <option>
                                                    Social Sciences & History
                                                </option>
                                                <option>Mathematics</option>
                                                <option>Science</option>
                                                <option>World Languages</option>
                                                <option>Arts</option>
                                                <option>Music</option>
                                            </select>
                                        </div>
                                        <span className="help">
                                            The subject the student needs
                                            tutoring in. If the subject is not
                                            listed above, please select "Other"
                                            and specify in "Additional Comments"
                                            section below.
                                        </span>
                                        <span className="help is-danger">
                                            {errors.subject?.type ===
                                                "required" &&
                                                "A subject is required."}
                                            {errors.subject?.type ===
                                                "validate" &&
                                                "A subject is required."}
                                        </span>
                                    </div>
                                </label>
                                <TutorCourse />
                            </div>
                            <div className="field is-grouped">
                                <label className="label">
                                    Teacher First Name
                                    <div className="control">
                                        <label className="label"></label>
                                        <input
                                            className="input"
                                            type="text"
                                            {...register("teacherfirst", {
                                                required: true,
                                            })}></input>
                                        <span className="help">
                                            The teacher of the course above.
                                        </span>
                                        <span className="help is-danger">
                                            {errors.teacherfirst?.type ===
                                                "required" &&
                                                "A teacher name is required."}
                                        </span>
                                    </div>
                                </label>
                                <label className="label">
                                    Teacher Last Name
                                    <div className="control">
                                        <label className="label"></label>
                                        <input
                                            className="input"
                                            type="text"
                                            {...register("teacherlast", {
                                                required: true,
                                            })}></input>
                                        <span className="help is-danger">
                                            {errors.teacherlast?.type ===
                                                "required" &&
                                                "A teacher name is required."}
                                        </span>
                                    </div>
                                </label>
                            </div>
                            <div className="field is-grouped">
                                <label className="label">
                                    Teacher Email
                                    <div className="control">
                                        <label className="label"></label>
                                        <input
                                            className="input"
                                            type="email"
                                            {...register("teacheremail", {
                                                required: true,
                                            })}></input>
                                        <span className="help">
                                            The teacher's LCPS issued email.
                                            This can usually be found on the
                                            school website.
                                        </span>
                                        <span className="help is-danger">
                                            {errors.teacheremail?.type ===
                                                "required" &&
                                                "A teacher email is required."}
                                        </span>
                                    </div>
                                </label>
                            </div>
                            <br></br>
                            <div className="field-title">
                                Tutoring Preferences
                            </div>
                            <hr className="field-title-hr"></hr>
                            <div className="field">
                                <label className="label">
                                    Short or Long Term Tutoring
                                    <div className="control">
                                        <label className="label"></label>
                                        <div className="select">
                                            <select
                                                {...register("termlength", {
                                                    required: true,
                                                    validate: isBlank,
                                                })}>
                                                <option>
                                                    Select Preference
                                                </option>
                                                <option>Short Term</option>
                                                <option>Long Term</option>
                                            </select>
                                        </div>
                                        <span className="help">
                                            If the student is looking to be
                                            tutored for more than 1-3 meetings,
                                            then select Long Term.
                                        </span>
                                        <span className="help is-danger">
                                            {errors.termlength?.type ===
                                                "required" &&
                                                "A term length is required."}
                                            {errors.termlength?.type ===
                                                "validate" &&
                                                "A term length is required."}
                                        </span>
                                    </div>
                                </label>
                            </div>
                            <div className="field">
                                <label className="label">
                                    Tutoring Format
                                    <div className="control">
                                        <label className="label"></label>
                                        <div className="select">
                                            <select
                                                {...register("format", {
                                                    required: true,
                                                    validate: isBlank,
                                                })}>
                                                <option>
                                                    Select Preference
                                                </option>
                                                <option>In Person</option>
                                                <option>Virtual</option>
                                                <option>No Preference</option>
                                            </select>
                                        </div>
                                        <span className="help is-danger">
                                            All in person tutoring sessions are
                                            hosted at Riverside High School. If
                                            the student could not be present,
                                            please select "Virtual".
                                        </span>
                                        <span className="help">
                                            If student is available for both in
                                            person and virtual tutoring, please
                                            select "No Preference".
                                        </span>
                                        <span className="help is-danger">
                                            {errors.format?.type ===
                                                "required" &&
                                                "A term length is required."}
                                            {errors.format?.type ===
                                                "validate" &&
                                                "A term length is required."}
                                        </span>
                                    </div>
                                </label>
                            </div>
                            <div className="field">
                                <label className="label">
                                    Study Hall Availability
                                    <div className="control">
                                        <label className="label"></label>
                                        <div className="select">
                                            <select
                                                {...register("studyhall", {
                                                    required: true,
                                                    validate: isBlank,
                                                })}>
                                                <option>
                                                    Select Availability
                                                </option>
                                                <option>Block 1</option>
                                                <option>Block 2</option>
                                                <option>Block 3</option>
                                                <option>Block 4</option>
                                                <option>Block 5</option>
                                                <option>Block 6</option>
                                                <option>Block 7</option>
                                                <option>Block 8</option>
                                                <option>None</option>
                                            </select>
                                        </div>
                                        <span className="help">
                                            If the student does not have a study
                                            hall, please select None.
                                        </span>
                                        <span className="help is-danger">
                                            {errors.studyhall?.type ===
                                                "required" &&
                                                "An availability is required. If unavailable, please select None."}
                                            {errors.studyhall?.type ===
                                                "validate" &&
                                                "An availability is required. If unavailable, please select None."}
                                        </span>
                                    </div>
                                </label>
                            </div>
                            <Availability />
                            <br></br>
                            <div className="field-title">
                                Additional Information
                            </div>
                            <hr className="field-title-hr"></hr>
                            <div className="field">
                                <label className="label">
                                    Additional Information
                                    <div className="control">
                                        <textarea
                                            class="textarea"
                                            placeholder="Write here..."
                                            {...register(
                                                "comments",
                                                {}
                                            )}></textarea>
                                        <span className="help">
                                            Special requests, preferences, or
                                            anything that you would like us to
                                            know would go here!
                                        </span>
                                    </div>
                                </label>
                            </div>
                            <br></br>
                            <div className="field-title">Form Submission</div>
                            <hr className="field-title-hr"></hr>
                            <div className="field is-grouped">
                                <div className="control">
                                    <input
                                        className="button tutee-submit-button"
                                        type="submit"
                                        name="submit"
                                        value="Submit Registration"></input>
                                </div>
                                <div className="control">
                                    <input
                                        className="button tutee-cancel-button"
                                        type="button"
                                        name="cancel"
                                        value="Cancel"
                                        onClick={() => {
                                            router.push("/findtutor");
                                        }}></input>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            );
        } else {
            getUserData(uid);
            return null;
        }
    }

    if (loading) {
        return <>Loading Events...</>;
    }
    if (error != undefined || user == undefined) {
        // console.log("error");
        return <div>Error!</div>;
    } else {
        return (
            <>
                <Navbar />
                <FormWrapper uid={user.uid} />
                <Footer />
            </>
        );
    }
}

export default withAuth(TuteeApply, "student");
