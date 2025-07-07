import React, { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";

const faqs = [
  {
    question: "📥 How can I download notes from NoteWorthy?",
    answer:
      "Simply create an account, go to your dashboard, browse the notes, and click on the download button for any subject you like.",
  },
  {
    question: "📝 Can I upload my own notes?",
    answer:
      "Yes! If you are a teacher, you can upload notes via your dashboard. Just go to 'Upload Note', fill in the details, and submit.",
  },
  {
    question: "🔒 Are my uploaded notes secure?",
    answer:
      "Absolutely. All your notes are stored securely and accessible only to authorized users depending on their roles.",
  },
  {
    question: "❓ I forgot my password. What should I do?",
    answer:
      "Click on the 'Forgot Password' option on the login page. We’ll send a password reset link to your registered email.",
  },
  {
    question: "💬 How can I contact the support team?",
    answer:
      "You can use the Contact Us form or email us directly at hamzaahmad12@gmail.com. We're always happy to help.",
  },
  {
    question: "👥 Who can use NoteWorthy?",
    answer:
      "NoteWorthy is built for Computer Science students and educators. Whether you’re a learner or a teacher, there’s something here for you.",
  },
  {
    question: "🎯 Is there any cost to use NoteWorthy?",
    answer:
      "No, NoteWorthy is completely free to use for students and teachers. Our aim is to make education accessible to everyone.",
  },
  {
    question: "🌐 Can I use NoteWorthy on my mobile?",
    answer:
      "Yes! The platform is fully responsive and works beautifully on mobile, tablet, and desktop devices.",
  },
  {
    question: "🗂 What subjects are available on NoteWorthy?",
    answer:
      "We cover a wide range of BS(CS) subjects from all 8 semesters — including OS, DBMS, AI, DSA, Web Development and more.",
  },
  {
    question: "⭐ How can I mark notes as favorites?",
    answer:
      "Just click the heart icon on any note to add it to your favorites. You can view and manage your favorites from the dashboard.",
  },
  {
    question: "📊 Will my activity be tracked?",
    answer:
      "Only basic activity like uploaded and downloaded notes is tracked — and that too just to help you see your progress. Your data is private and never shared.",
  },
  {
    question: "🔄 Will more features be added in the future?",
    answer:
      "Yes! We’re constantly working to add new features like quizzes, MCQs, performance tracking, and student-teacher collaboration tools.",
  },
];


const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { ThemeToggle } = useAuthContext()

  const toggleAnswer = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="min-h-screen font-raleway dashboard-bg  dark:text-white px-4 py-10 sm:px-6 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <div className=" absolute right-6 top-3">

          <ThemeToggle />
        </div>
        <h1 className="text-4xl font-bold text-center text-blue-600  mb-8">
          ❓ Frequently Asked Questions
        </h1>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full text-left text-lg font-semibold flex justify-between items-center focus:outline-none"
              >
                <span>{faq.question}</span>
                <span className="text-xl">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <p className="mt-2 ">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>

        {/*==== Footer ====*/}
        <div className="text-center text-xs  mt-12">
          Can’t find what you’re looking for?{" "}
          <a href="/contact" className="text-blue-600 underline dark:text-blue-400">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
