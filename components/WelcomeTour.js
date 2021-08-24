import Tour from "reactour";
import { useRouter } from "next/router";
import disableScroll from "disable-scroll";

function WelcomeTour({ steps, open, setOpen, route, startAt, offset }) {
    const router = useRouter();

    return (
        <Tour
            steps={steps}
            isOpen={open}
            closeWithMask={false}
            onRequestClose={() => {
                setOpen(false);
                router.push(route);
            }}
            startAt={startAt}
            maskSpace={10}
            rounded={10}
            scrollDuration={1000}
            badgeContent={(curr, tot) => `${curr} of ${tot}`}
            // prevStep={() => {}}
            // disableDotsNavigation={true}
            // prevButton={<></>}
            scrollOffset={offset}
        />
    );
}

export default WelcomeTour;
