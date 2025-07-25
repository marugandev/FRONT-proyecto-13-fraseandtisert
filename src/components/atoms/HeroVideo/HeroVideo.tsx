import "./HeroVideo.css";

const HeroVideo = () => {
  return (
    <video
      className="hero-video"
      autoPlay
      loop
      muted
      playsInline
      /* controls
      controlsList="nodownload noplaybackrate" */
    >
      <source src="/videos/fraseandtisert_hero_video.mp4" type="video/mp4" />
    </video>
  );
};

export default HeroVideo;
