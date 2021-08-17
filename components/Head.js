import Head from "next/head";

function HeadTag() {
    return (
        <div>
            <Head>
                {/* <title>Riverside National Honor Society</title>
                <meta
                    property="og:title"
                    content="Riverside National Honor Society"
                    key="title"
                />
                <meta property="og:site_name" content="Website Name"></meta>
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://rvhnhs.vercel.app/" />
                <meta
                    property="og:image"
                    content="https://rvhnhs.vercel.app/images/nhslogowhite.png"
                    key="image"
                />
                <meta
                    property="og:description"
                    content="Volunteer. Lead. Serve."
                    key="description"
                />
                <meta name="theme-color" content="#2793fa" />
                <meta name="twitter:card" content="summary_large_image" /> */}
                {/* <!-- Primary Meta Tags --> */}
                <title>Riverside National Honor Society</title>
                <meta name="title" content="Riverside National Honor Society" />
                <meta
                    name="description"
                    content="National Honor Society is dedicated to empowering communities through meaningful service. With Group Service Projects, Individual Volunteering, and the most successful tutoring program in Loudoun County, the Riverside Chapter is making a difference. Think you've got what it takes?"
                />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://rvhnhs.vercel.app/" />
                <meta
                    property="og:title"
                    content="Riverside National Honor Society"
                />
                <meta
                    property="og:description"
                    content="National Honor Society is dedicated to empowering communities through meaningful service. With Group Service Projects, Individual Volunteering, and the most successful tutoring program in Loudoun County, the Riverside Chapter is making a difference. Think you've got what it takes?"
                />
                <meta
                    property="og:image"
                    content="https://rvhnhs.vercel.app/images/nhslogowhite.png"
                />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    property="twitter:url"
                    content="https://rvhnhs.vercel.app/"
                />
                <meta
                    property="twitter:title"
                    content="Riverside National Honor Society"
                />
                <meta
                    property="twitter:description"
                    content="National Honor Society is dedicated to empowering communities through meaningful service. With Group Service Projects, Individual Volunteering, and the most successful tutoring program in Loudoun County, the Riverside Chapter is making a difference. Think you've got what it takes?"
                />
                <meta
                    property="twitter:image"
                    content="https://rvhnhs.vercel.app/images/nhslogowhite.png"
                />
            </Head>
        </div>
    );
}

export default HeadTag;
