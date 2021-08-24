import Head from "next/head";

function HeadTag({ page }) {
    return (
        <div>
            <Head>
                <title>
                    Riverside National Honor Society{+page ? " - " + page : ""}
                </title>
                <meta name="title" content="Riverside National Honor Society" />
                <meta
                    name="description"
                    content="Riverside National Honor Society is dedicated to empowering Northern Virginia communities through meaningful volunteering and tutoring services."
                />
                <meta name="theme-color" content="#2793fa" />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://rvhnhs.vercel.app/" />
                <meta
                    property="og:title"
                    content="Riverside National Honor Society"
                />
                <meta
                    property="og:description"
                    content="Riverside National Honor Society is dedicated to empowering Northern Virginia communities through meaningful volunteering and tutoring services."
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
                    content="Riverside National Honor Society is dedicated to empowering Northern Virginia communities through meaningful volunteering and tutoring services."
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
