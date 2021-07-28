import Navbar from "/components/Navbar.js";
import withAuth from "/components/auth/withAuth.js";
import withFrame from "/components/Frame.js";

function AdminGroup() {
    return (
        <div>
            <div className="admin-group-title">
                <p> Your Admin Group </p>
            </div>
            <div className="admin-group-table">
                <table className="table is-bordered is-fullwidth profile-hours-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Mixed</th>
                            <th>Tutoring</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Johnny Appleseed</td>
                            <td>10</td>
                            <td>5</td>
                            <td>15</td>
                            <div className="email-divider">
                                <a href="mailto:895090@lcps.org">
                                    <img src="/images/email.png" alt=""></img>
                                </a>
                            </div>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default withAuth(withFrame(AdminGroup, "Admin Group"), "officer");
