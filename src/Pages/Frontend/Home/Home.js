import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { courseData, features, studentSays } from "../../../components/Data/data";
import { Typewriter } from "react-simple-typewriter";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuthContext } from "../../../context/AuthContext";



const HomePage = () => {
  const{themeState}=useAuthContext()
  
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration in ms
      once: true, // only animate once
    });
  }, []);

  const navigate = useNavigate()
  const goToLogin = () => {
    navigate("/auth/login")
  }
  const goToRegister = () => {
    navigate("/auth/register")
  }


  return (
    <div className="min-h-screen pt-14 dashboard-bg  text-base-content px-4 md:px-10 font-raleway " data-aos="fade-down">
   

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-evenly mb-14 font-raleway">
        <div className="max-w-xl  text-center lg:text-left space-y-4" data-aos="fade-right">
          <h2 className="text-3xl md:text-4xl dark:text-white font-bold leading-snug font-raleway">
            <Typewriter
              words={['Your Ultimate Computer Science Notes Hub']}
              loop={false}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h2>

          <p className=" dark:text-white">
            Access curated notes, MCQs, and past papers from 8 semesters —
            organized, verified, and free.
          </p>
          <p className="text-blue-700 font-semibold">
            Aligned with GC University outlines — specially curated for affiliated colleges.
          </p>
          <div className="space-x-4 mt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium" onClick={goToLogin}>Get Started</button>

            <button className="border border-gray-400 dark:border-white hover:border-gray-600 text-gray-700 dark:text-white px-6 py-2 rounded-lg font-medium" onClick={goToRegister}>Explore as Guest</button>
          </div>
        </div>

{}
        <div className="mt-10 lg:mt-0" data-aos="fade-left">
          <img
            src={themeState === 'dark' ? "/Assets/image/HomePageDark.png" : "/Assets/image/HomePage.png"}
            alt="Student Illustration"
            className="w-full max-w-md"
          />
        </div>

      </div>

      {/* Features */}
      <div className="text-center space-y-8 mb-12">
        <h3 className="text-xl md:text-2xl font-semibold dark:text-white">
          Why choose NoteWorthy?
        </h3>
        <p className="italic  dark:text-white">
          "NoteWorthy saved my exam prep!"
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {features.map((item, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={item.delay}
              className="flex flex-col items-center space-y-2"
            >
              {item.icon}
              <span className={`${item.textSize} font-medium dark:text-white`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Notes Preview Table */}
      <div data-aos="fade-up" className="max-w-4xl mx-auto   border rounded-xl overflow-hidden shadow-md dark:text-white card-bg">
        <h4 className="text-xl font-semibold text-center py-4">
          Preview of Available Notes
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-medium text-left">
            <thead className=" border-b">
              <tr>
                <th className="px-4 py-3 font-medium">Course Title</th>
                <th className="px-4 py-3 font-medium">Subject</th>
                <th className="px-4 py-3 font-medium">Topic</th>
                <th className="px-4 py-3 font-medium">Availability</th>
              </tr>
            </thead>

            <tbody className=" dark:text-white">
              {courseData.map((course, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-3">{course.title}</td>
                  <td className="px-4 py-3">{course.subject}</td>
                  <td className="px-4 py-3">{course.Notes}</td>
                  <td className="px-4 py-3 text-blue-600 cursor-pointer" onClick={goToLogin}>
                    {course.availability}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-20">
        <h3 className="text-2xl font-bold text-center mb-8 dark:text-white">What Students Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black dark:text-white">
          {studentSays.map((t, i) => (
            <div key={i} className=" border rounded-lg p-4 shadow-sm" data-aos="fade-up"
              data-aos-delay={i * 200}>
              <p className="italic  dark:text-white mb-2">"{t.review}"</p>
              <p className="font-semibold text-blue-700">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/*==== Call to Action ====*/}
      <section data-aos="fade-up" className="text-center card-bg py-12 rounded-lg mt-10 shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold">Want to Contribute or Need Help?</h2>
        <p className="mt-2">Contact us or share your notes to help other students grow!</p>
        <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-100 transition">
          Join Us / Contact
        </button>
      </section>

      {/* Footer */}
      <footer className="mt-20  bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500  text-white dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a]  py-10 px-4  rounded-t-xl " data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm ">
          <div>
            
            <img src="/Assets/image/logo_white_text.png" alt="NoteWorthy Logo" className="h-28 -my-10  object-contain position-absolute top-0 bottom-0" />
            <p className="mt-5">
              GC University outlined notes with 100% relevance — specially made for affiliated college students struggling to find structured, semester-wise study material.            </p>
          </div>

          <div>
            <h4 className="text-md font-semibold  px-5  mb-2">Quick Links</h4>
            <ul className="space-y-1 px-5">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/about" className="hover:underline">About</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              <li><Link to="/faq" className="hover:underline">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold  px-5   mb-2">Connect</h4>
            <ul className="space-y-1 px-5">
              <li><a href="mailto:support@noteworthy.com" className="hover:underline">support@noteworthy.com</a></li>
              <li><a href="https://facebook.com" className="hover:underline">Facebook</a></li>
              <li><a href="https://instagram.com" className="hover:underline">Instagram</a></li>
              <li><a href="https://linkedin.com" className="hover:underline">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs py-4 mt-6 border-t  border-white  ">
          &copy; {new Date().getFullYear()} NoteWorthy. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

