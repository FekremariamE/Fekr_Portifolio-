 function Hero() {
    return (
      <section className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-blue-100 to-white">
        <h2 className="text-4xl md:text-6xl font-bold">Hi, I'm Your Name</h2>
        <p className="mt-4 text-lg md:text-xl text-gray-700">Frontend Developer | Designer | Tech Enthusiast</p>
        <a href="#contact" className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
          Contact Me
        </a>
      </section>
    );
  }
  export default Hero