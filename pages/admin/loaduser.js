import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useRouter } from "next/router";
import React, { useState, Component } from "react";
import initFirebase from "../../services/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import Navbar from "../../components/Navbar.js";
import Footer from "../../components/Footer";
import { render } from "nprogress";
import Papa from "papaparse";
import withAuth from "/components/auth/withAuth.js";
// import memberlist from ;
// import officerlist from "/data/officers.csv";

initFirebase();
const auth = firebase.auth();
const db = firebase.firestore();

async function putData(row) {
    const userRef = db.collection("inituser").doc(row["Student ID"]);
    if (row.hasOwnProperty("Officer Role")) {
        await userRef.set(
            {
                role: row["Website"],
                hours: {
                    carryon: 0,
                },
                admingroup: "",
                grade: row["Grade"],
            },
            { merge: false }
        );
    } else {
        let hours = (parseFloat(row["Spring 2021"]) || 0) - 20;
        await userRef.set(
            {
                role: "member",
                hours: {
                    carryon: hours,
                },
                admingroup: row["Admin Group"],
                grade: row["Grade Level"],
            },
            { merge: false }
        );
    }
}

async function loadDataToDB(data) {
    console.log(data[0]);
    data.map((row) => {
        putData(row);
    });
}

class FileReader extends React.Component {
    constructor() {
        super();
        this.state = {
            csvfile: undefined,
        };
        this.updateData = this.updateData.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            csvfile: event.target.files[0],
        });
    };

    importCSV = () => {
        const { csvfile } = this.state;
        Papa.parse(csvfile, {
            complete: this.updateData,
            header: true,
        });
    };

    updateData(result) {
        var data = result.data;
        console.log(data);
        loadDataToDB(data);
    }

    render() {
        console.log(this.state.csvfile);
        return (
            <div className="App">
                <h2>Import CSV File!</h2>
                <input
                    className="csv-input"
                    type="file"
                    ref={(input) => {
                        this.filesInput = input;
                    }}
                    name="file"
                    placeholder={null}
                    onChange={this.handleChange}
                />
                <p />
                <button onClick={this.importCSV}> Upload now!</button>
            </div>
        );
    }
}

export default withAuth(FileReader, "admin");
