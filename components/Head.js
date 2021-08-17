import Head from "next/head";

function HeadTag() {
    return (
        <div>
            <Head>
                <title>Riverside National Honor Society</title>
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
                {/* <meta name="twitter:card" content="summary_large_image" /> */}
            </Head>
        </div>
    );
}

export default HeadTag;
