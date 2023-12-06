
function Home() {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <video
        style={{
          width: '100%',
          height: '80vh', 
          objectFit: 'cover',
          position: 'fixed',
          left: 0,
          zIndex: -1, //detras del resto de elementos
        }}
        // autoplay para que se reproduzca solo pero muted porque sino el navegador me lo bloquea 
        controls
        autoPlay
        muted
      >
        <source src="https://res.cloudinary.com/dxatd4ai4/video/upload/v1701879223/wethem-app/WeThem-Project_vxhhpj.mp4" type="video/mp4" />
        Your browser does not support the video format.
      </video>
    </div>
  );
}

export default Home;