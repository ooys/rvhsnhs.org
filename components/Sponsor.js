import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import LazyLoad from "react-lazyload";

function Picture({ rawpicture, name }) {
    if (rawpicture != null) {
        return (
            <LazyLoad once={true}>
                <img
                    className="is-profile-picture"
                    src={rawpicture}
                    alt={name}
                />
            </LazyLoad>
        );
    } else {
        return null;
    }
}

function Sponsor({ name, picture, url }) {
    return (
        <div className="column is-6-mobile is-4-tablet is-4-desktop">
            <div className="is-sponsor">
                <a href={url}>
                    <Picture rawpicture={picture} name={name} />
                    <div className="is-profile-text">
                        <div className="is-profile-name">{name}</div>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default Sponsor;
