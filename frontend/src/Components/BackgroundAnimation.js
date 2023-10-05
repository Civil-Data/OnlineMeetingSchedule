import bgd_video from "../video/background.mp4";

//Component for background video
const BackgroundAnimation = () => {
	return (
		<video autoPlay loop muted>
			<source src={bgd_video} type="video/mp4" />
		</video>
	);
};

export default BackgroundAnimation;
