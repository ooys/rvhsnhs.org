function Rank({ hours, active, setActive }) {
    function BadgeModal(props) {
        if (props.active === props.title) {
            return (
                <div className={"modal is-active"} id="badge-modal">
                    <div
                        className="modal-background"
                        onClick={() => {
                            props.setActive("");
                        }}></div>
                    <div className="modal-content" id="badge-modal-content">
                        <div className="columns is-mobile is-variable is-4 modal-wrapper">
                            <div className="column is-one-third modal-picture">
                                <img
                                    className={"modal-badge " + props.color}
                                    src={props.src}
                                    alt={props.title}></img>
                            </div>
                            <div className="column is-two-thirds modal-text">
                                <div className="modal-title">{props.title}</div>
                                <hr></hr>
                                <div className="modal-desc">{props.desc}</div>
                            </div>
                        </div>
                    </div>
                    <button
                        className="modal-close is-large"
                        aria-label="close"
                        onClick={() => {
                            props.setActive("");
                        }}></button>
                </div>
            );
        } else {
            return <></>;
        }
    }

    function RankBadge({ text, hours, active, setActive, size }) {
        let src = "";
        let desc = "";
        let title = "";
        let color = "";
        if (hours >= 80) {
            color = "dark_purple";
            desc =
                "Very few members will ever be awarded the Master badge, as members in this tier come close to doubling the official amount of hours required by NHS. Volunteers in this tier dedicate a significant portion of their time to volunteering and for this reason they are awarded the highest tier badge for their efforts.";
            if (hours >= 95) {
                title = "Master Volunteer IV";
                src = "/images/badges/rank4.svg";
            } else if (hours >= 90) {
                title = "Master Volunteer III";
                src = "/images/badges/rank3.svg";
            } else if (hours >= 85) {
                title = "Master Volunteer II";
                src = "/images/badges/rank2.svg";
            } else {
                title = "Master Volunteer I";
                src = "/images/badges/rank1.svg";
            }
        } else if (hours >= 60) {
            color = "light_purple";
            desc =
                "Members in the Expert tier have gone outside the official requirements of NHS and begun volunteering for the greater good of the community. At this tier, members have surpassed significant contributions to their community and have embraced what it truly means to be an NHS volunteer.";
            if (hours >= 75) {
                title = "Expert Volunteer IV";
                src = "/images/badges/rank4.svg";
            } else if (hours >= 70) {
                title = "Expert Volunteer III";
                src = "/images/badges/rank3.svg";
            } else if (hours >= 65) {
                title = "Expert Volunteer II";
                src = "/images/badges/rank2.svg";
            } else {
                title = "Expert Volunteer I";
                src = "/images/badges/rank1.svg";
            }
        } else if (hours >= 40) {
            color = "gold";
            desc =
                "Members in the advanced tier are more often than not senior members of NHS. At this tier, members have made a significant contribution to the community through their volunteer work and continue to excel in their volunteer pursuits. These members are awarded a gold status for their hard work.";
            if (hours >= 55) {
                title = "Advanced Volunteer IV";
                src = "/images/badges/rank4.svg";
            } else if (hours >= 50) {
                title = "Advanced Volunteer III";
                src = "/images/badges/rank3.svg";
            } else if (hours >= 45) {
                title = "Advanced Volunteer II";
                src = "/images/badges/rank2.svg";
            } else {
                title = "Advanced Volunteer I";
                src = "/images/badges/rank1.svg";
            }
        } else if (hours >= 20) {
            color = "silver";
            desc =
                "Members in this tier have begun to spread their wings as a National Honor Society volunteer. Seasoned volunteers are beginning to make a significant impact on the community, devoting a significant portion of their time to serving as an NHS member.";
            if (hours >= 35) {
                title = "Seasoned Volunteer IV";
                src = "/images/badges/rank4.svg";
            } else if (hours >= 30) {
                title = "Seasoned Volunteer III";
                src = "/images/badges/rank3.svg";
            } else if (hours >= 25) {
                title = "Seasoned Volunteer II";
                src = "/images/badges/rank2.svg";
            } else {
                title = "Seasoned Volunteer I";
                src = "/images/badges/rank1.svg";
            }
        } else {
            color = "bronze";
            desc =
                "Members in the novice tier are often newer members or those who have yet to engage in significant volunteer work. While it may not be the most visually appealing badge, it’s a starting point for our volunteering journey.";
            if (hours >= 15) {
                title = "Novice Volunteer IV";
                src = "/images/badges/rank4.svg";
            } else if (hours >= 10) {
                title = "Novice Volunteer III";
                src = "/images/badges/rank3.svg";
            } else if (hours >= 5) {
                title = "Novice Volunteer II";
                src = "/images/badges/rank2.svg";
            } else {
                title = "Novice Volunteer I";
                src = "/images/badges/rank1.svg";
            }
        }
        return (
            <>
                <div className={"column is-full rank-text"}>
                    {text}: {title}
                </div>
                <div className={"column " + size}>
                    <a
                        className="badge-wrapper"
                        title={title}
                        onClick={() => {
                            setActive(title);
                        }}>
                        <img
                            className={"badge " + color}
                            src={src}
                            alt={title}></img>
                    </a>
                    <BadgeModal
                        active={active}
                        title={title}
                        desc={desc}
                        src={src}
                        setActive={setActive}
                        color={color}
                    />
                </div>
            </>
        );
    }
    return (
        <div className="columns is-multiline is-centered is-mobile">
            <RankBadge
                text={"Current Rank"}
                hours={hours}
                active={active}
                setActive={setActive}
                size={"is-half"}
            />
            <RankBadge
                text={"Next Rank"}
                hours={hours + 5}
                active={active}
                setActive={setActive}
                size={"is-3"}
            />
        </div>
    );
}

export default Rank;
