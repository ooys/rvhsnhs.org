import Link from "next/link";

function Navbar() {
    return (
        <div className="nav">
            <nav
                className="navbar is-info"
                role="navigation"
                aria-label="main navigation">
                <div className="navbar-brand">
                    <Link href="/">
                        <a className="navbar-item" id="nav-logo">
                            <img src="/images/newnhslogo.png" />
                        </a>
                    </Link>

                    <a
                        role="button"
                        className="navbar-burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                        id="navbar-toggle"
                        onClick={() => {
                            let toggle =
                                document.querySelector("#navbar-toggle");
                            let menu = document.querySelector(
                                "#navbarBasicExample"
                            );
                            toggle.classList.toggle("is-active");
                            menu.classList.toggle("is-active");
                        }}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link href="/">
                            <a className="navbar-item">Home</a>
                        </Link>
                        <Link href="/apply">
                            <a className="navbar-item">Apply</a>
                        </Link>
                        <Link href="/about">
                            <a className="navbar-item">About</a>
                        </Link>
                    </div>

                    <div className="navbar-end">
                        <Link href="/login">
                            <a className="navbar-item">Log in</a>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
