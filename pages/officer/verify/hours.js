import Navbar from "/components/Navbar.js";

function Hours() {
    return (
        <>
            <Navbar user="officer" />
            <div className="page-wrapper" id="admin-group">
                <div className="verificiation-title">
                    <p> There are (8) submissions pending confirmation </p>
                </div>
                <div className="admin-group-table">
                    <table className="table is-bordered is-fullwidth profile-hours-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Event Title</th>
                                <th>Hours Claimed</th>
                                <th>Verification</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Johnny Appleseed</td>
                                <td>RVHS Freshmen Tours</td>
                                <td>2.0</td>
                                <td>
                                    <img
                                        src="/images/insideriverside.PNG"
                                        alt=""></img>
                                </td>
                                <div className="verify-divider">
                                    <a
                                        className="check-button"
                                        onClick={() => {
                                            console.log("Accepted");
                                        }}>
                                        <img
                                            src="/images/buttons/checknohover.png"
                                            alt=""></img>
                                    </a>

                                    <a
                                        className="x-button"
                                        onClick={() => {
                                            console.log("Rejected");
                                        }}>
                                        <img
                                            src="/images/buttons/xnohover.png"
                                            alt=""></img>
                                    </a>
                                </div>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Hours;
