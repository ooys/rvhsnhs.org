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
                <meta
                    property="og:image"
                    content="https://rvhnhs.vercel.app/images/nhslogo.png"
                    key="image"
                />
                <meta
                    property="og:description"
                    content="Volunteer. Lead. Serve."
                    key="description"
                />
            </Head>
        </div>
    );
}

export default HeadTag;
