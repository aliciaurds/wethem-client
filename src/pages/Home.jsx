
function Home() {
  return (
    <div className = "video-container">
      <video className="video-style"        
        controls
        autoPlay // autoplay para que se reproduzca solo pero muted porque sino el navegador me lo bloquea
        muted
      >
        
        <source src="https://res.cloudinary.com/dxatd4ai4/video/upload/v1701965629/wethem-app/WeThem-Project_ka4g2e.mp4" type="video/mp4" />
        Your browser does not support the video format.
      </video>
    </div>
  );
}

export default Home;