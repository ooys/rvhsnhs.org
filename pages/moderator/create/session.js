import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import withAuth from "/components/auth/withAuth.js";
import withFrame from "/components/Frame.js";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import swal from "sweetalert";

initFirebase();
const db = firebase.firestore();
const batch = db.batch();

function CreateSession() {
    const router = useRouter();
    const sessionsRef = db.collection("tutor-sessions");
    const [data, loading, error] = useCollectionOnce(sessionsRef);
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "sessions",
    });

    const isBlank = (value) => value.substring(0, 6) != "Select";

    async function onSubmitForm(values) {
        console.log(values);
        let newValues = [];
        values.sessions.forEach((doc) => {
            var docRef = db.collection("tutor-sessions").doc(); //automatically generate unique id
            batch.set(docRef, {
                date: doc.date,
                time_start: doc.starttime,
                time_end: doc.endtime,
                format: doc.format,
                location: doc.location,
                max_pairs: doc.max_pairs,
                registrants: [],
            });
            newValues.push({
                date: doc.date,
                time_start: doc.starttime,
                time_end: doc.endtime,
                format: doc.format,
                location: doc.location,
                max_pairs: doc.max_pairs,
                sessionId: docRef.id,
                status: "Vacant",
            });
        });
        batch.commit().then(() => {
            const masterRef = db.collection("tutor-sessions").doc("master");
            masterRef
                .update({
                    sessions: firebase.firestore.FieldValue.arrayUnion(
                        ...newValues
                    ),
                })
                .then(() => {
                    swal(
                        "Success!",
                        "Your changes have been saved.",
                        "success"
                    ).then(() => {
                        router.reload(window.location.pathname);
                    });
                });
        });
    }

    const currDate = new Date().setHours(0, 0, 0, 0);

    function getDayOfWeek(date) {
        const dayOfWeek = new Date(date).getDay();
        return isNaN(dayOfWeek)
            ? null
            : [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
              ][dayOfWeek];
    }

    function DeleteSession() {}

    function SessionEdit() {
        return (
            <>
                <form
                    className="create-session-form"
                    onSubmit={handleSubmit(onSubmitForm)}>
                    <div className="field">
                        <label className="label">
                            {fields.map(({ id }, index) => {
                                return (
                                    <div className="control" key={id}>
                                        <label className="label session-label">
                                            <label className="label">
                                                Date
                                                <input
                                                    className="input"
                                                    type="date"
                                                    name={`sessions[${index}].date`}
                                                    {...register(
                                                        `sessions[${index}].date`
                                                    )}></input>
                                            </label>
                                            <label className="label">
                                                Start Time
                                                <input
                                                    className="input"
                                                    type="time"
                                                    name={`sessions[${index}].starttime`}
                                                    {...register(
                                                        `sessions[${index}].starttime`
                                                    )}></input>
                                            </label>
                                            <label className="label">
                                                End Time
                                                <input
                                                    className="input"
                                                    type="time"
                                                    name={`sessions[${index}].endtime`}
                                                    {...register(
                                                        `sessions[${index}].endtime`
                                                    )}></input>
                                            </label>

                                            <label className="label">
                                                Format
                                                <div className="control">
                                                    <label className="label"></label>
                                                    <div className="select">
                                                        <select
                                                            name={`sessions[${index}].format`}
                                                            {...register(
                                                                `sessions[${index}].format`,
                                                                {
                                                                    required: true,
                                                                    validate:
                                                                        isBlank,
                                                                }
                                                            )}>
                                                            <option>
                                                                Select Format
                                                            </option>
                                                            <option>
                                                                Virtual
                                                            </option>
                                                            <option>
                                                                In Person
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </label>
                                            <label className="label">
                                                Location
                                                <input
                                                    className="input"
                                                    type="text"
                                                    name={`sessions[${index}].location`}
                                                    {...register(
                                                        `sessions[${index}].location`
                                                    )}></input>
                                            </label>
                                            <label className="label">
                                                Max Pairs
                                                <input
                                                    className="input"
                                                    type="number"
                                                    min={1}
                                                    step={1}
                                                    name={`sessions[${index}].max_pairs`}
                                                    {...register(
                                                        `sessions[${index}].max_pairs`
                                                    )}></input>
                                            </label>
                                            <label className="label">
                                                <div
                                                    className="button is-danger"
                                                    type="button"
                                                    value="Delete"
                                                    onClick={() =>
                                                        remove(index)
                                                    }>
                                                    Remove
                                                </div>
                                            </label>
                                        </label>
                                    </div>
                                );
                            })}
                        </label>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <input
                                className="button is-info"
                                type="button"
                                value="Add Session"
                                onClick={() => {
                                    console.log(errors);
                                    append({});
                                }}></input>
                        </div>
                        <div className="control">
                            <input
                                className="button is-success"
                                type="submit"
                                name="submit"
                                value="Save"></input>
                        </div>
                        <div className="control">
                            <input
                                className="button is-danger"
                                type="button"
                                name="cancel"
                                value="Cancel"
                                onClick={() => {
                                    console.log("cancelled");
                                    reset();
                                }}></input>
                        </div>
                    </div>
                </form>
            </>
        );
    }

    function AllSessions({ data, time }) {
        return (
            <div className="columns is-multiline">
                {data.docs.map((session) => {
                    if (session.id != "master") {
                        const sessionData = session.data();
                        const sessionDate = new Date(sessionData.date);
                        if (sessionDate > currDate && time === "future") {
                            return (
                                <div className="column is-full">
                                    <div className="columns is-gapless is-multiline is-mobile">
                                        <div className="column is-6">
                                            <div className="columns is-gapless is-multiline">
                                                <div className="column is-full">
                                                    {sessionData.date}
                                                    {" " +
                                                        getDayOfWeek(
                                                            sessionData.date
                                                        )
                                                            .substring(0, 3)
                                                            .toUpperCase()}
                                                </div>
                                                <div className="column is-full">
                                                    {sessionData["time_start"] +
                                                        " - " +
                                                        sessionData["time_end"]}
                                                </div>
                                                <div className="column is-full">
                                                    {sessionData.format}
                                                </div>
                                                <div className="column is-full">
                                                    {sessionData.location}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="column is-6">
                                            <div className="columns is-gapless is-multiline">
                                                <div className="column is-full">
                                                    Max Pairs:{" "}
                                                    {sessionData["max_pairs"]}
                                                </div>
                                                <div className="column is-full">
                                                    Pairs Registered:{" "}
                                                    {
                                                        sessionData.registrants
                                                            .length
                                                    }
                                                </div>
                                                <div className="column is-full">
                                                    <a
                                                        onClick={() => {
                                                            DeleteSession();
                                                        }}>
                                                        Delete Session
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else if (sessionDate <= currDate && time === "past") {
                            return (
                                <div className="column is-full">
                                    <div className="columns is-gapless is-multiline is-mobile">
                                        <div className="column is-6">
                                            <div className="columns is-gapless is-multiline">
                                                <div className="column is-full">
                                                    {sessionData.date}
                                                    {" " +
                                                        getDayOfWeek(
                                                            sessionData.date
                                                        )
                                                            .substring(0, 3)
                                                            .toUpperCase()}
                                                </div>
                                                <div className="column is-full">
                                                    {sessionData["time_start"] +
                                                        " - " +
                                                        sessionData["time_end"]}
                                                </div>
                                                <div className="column is-full">
                                                    {sessionData.format}
                                                </div>
                                                <div className="column is-full">
                                                    {sessionData.location}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="column is-6">
                                            <div className="columns is-gapless is-multiline">
                                                <div className="column is-full">
                                                    Max Pairs:{" "}
                                                    {sessionData["max_pairs"]}
                                                </div>
                                                <div className="column is-full">
                                                    Pairs Registered:{" "}
                                                    {
                                                        sessionData.registrants
                                                            .length
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else return null;
                    }
                })}
            </div>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error != undefined || data == undefined) {
        console.log(error);
        return <div>Error</div>;
    } else {
        return (
            <>
                <div className="columns is-multiline tutor-list">
                    <div className="column is-full tutor-list-title">
                        Planned Sessions
                        <hr className="tutor-list-hr"></hr>
                    </div>
                    <div className="column is-full">
                        <AllSessions data={data} time={"future"} />
                        <SessionEdit />
                    </div>
                    <div className="column is-full tutor-list-title">
                        Past Sessions
                        <hr className="tutor-list-hr"></hr>
                    </div>
                    <div className="column is-full">
                        <AllSessions data={data} time={"past"} />
                    </div>
                </div>
            </>
        );
    }
}

export default withAuth(
    withFrame(CreateSession, "Create Session"),
    "moderator"
);
