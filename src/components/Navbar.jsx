// import { FaGithub, FaLinkedin } from "react-icons/fa";

 function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      <h1 className="text-xl font-bold">YourName</h1>
      <div className="space-x-4">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
        {/* <a href="https://github.com/yourusername" target="_blank"><FaGithub /></a> */}
        {/* <a href="https://linkedin.com/in/yourprofile" target="_blank"><FaLinkedin /></a> */}
      </div>
    </nav>
  );
}
export default Navbar