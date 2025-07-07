import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import { Typewriter } from "react-simple-typewriter";

const AboutUs = () => {
  const { ThemeToggle } = useAuthContext();

  return (
    <div className="min-h-screen font-raleway bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white px-4 sm:px-8 py-12">
      <div className="max-w-5xl mx-auto text-center">
        <div className="absolute right-6 top-3">
          <ThemeToggle />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-blue-600 mt-10">
          About NoteWorthy
        </h1>

        {/*==== Typewriter Effect ====*/}
        <h2 className="text-2xl sm:text-3xl font-bold  dark:text-white mb-6">
          <Typewriter
            words={[
              "One Platform. One Mission. Unlimited Possibilities.",
              "Built by students, for students & teachers.",
              "Learning should be beautiful, effortless, and shared.",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={1500}
          />
        </h2>


        <p className="text-lg sm:text-xl max-w-3xl text-black dark:text-white mx-auto">
          Empowering students and educators with easy access to academic notes, feedback, and learning tools — all in one place. NoteWorthy is not just a platform, it’s a mission to build brighter academic futures.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-black dark:text-white">
        <div className=" card-bg shadow-md rounded-2xl p-6 hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">📚 Our Mission</h3>
          <p>
            We aim to make quality academic content available, accessible, and organized for all Computer Science students.
          </p>
        </div>
        <div className=" card-bg shadow-md rounded-2xl p-6 hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">👩‍🏫 For Teachers</h3>
          <p>
            Teachers can easily upload, manage, and share notes, track student downloads, and provide meaningful feedback.
          </p>
        </div>
        <div className="card-bg shadow-md rounded-2xl p-6 hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">🎓 For Students</h3>
          <p>
            Students can download reliable course materials, give feedback, and even favorite helpful resources to review later.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Why Choose Us?</h2>
        <p className="text-lg max-w-3xl mx-auto text-black dark:text-white">
          Because we care. NoteWorthy is created by Computer Science students, for students and educators. We understand your academic journey and we're here to make it smoother, smarter, and more collaborative.
        </p>
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          to="/contact"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-300"
        >
          Contact Us
        </Link>
      </div>

      <footer className="mt-20 text-center text-sm">
        &copy; {new Date().getFullYear()} NoteWorthy. Made with ❤️ for the CS Community.
      </footer>
    </div>
  );
};

export default AboutUs;
