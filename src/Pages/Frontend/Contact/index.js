import axios from "axios";
import React, { useState } from "react";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!name || !email || !message) { return window.toastify("Please fill in all fields!", "info") }
      setIsLoading(true)
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/frontend/contact`, {
        name,
        email,
        message,
      });

      if (res.data.success) {
        window.toastify("Message sent successfully!", 'success');
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err) {
      console.error(err);
      window.toastify("Failed to send message.", 'error');
    }
    finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen dashboard-bg dark:text-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/*===== Header =====*/}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">Get in Touch</h1>
          <p className="text-black dark:text-gray-300 text-lg">
            We’d love to hear from you — whether you’re a student, teacher, or curious visitor.
          </p>
        </div>

        {/*===== Form and Info =====*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 card-bg dark:text-white border border-blue-600 shadow-xl rounded-2xl p-6">
          {/*===== Contact Form =====*/}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-sm font-medium">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-blue-600 dark:bg-gray-800 focus:ring-2 focus:ring-blue-600 outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Your Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-blue-600 dark:bg-gray-800 focus:ring-2 focus:ring-blue-600 outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Your Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-blue-600 dark:bg-gray-800 focus:ring-2 focus:ring-blue-600 outline-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition"
            >
              {isLoading ? <span class="loading loading-dots loading-md"></span> : "Send Message"}
            </button>
          </form>

          {/*==== Contact Info ====*/}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-600 ">📍 Our Location</h3>
              <p className="text-black dark:text-white">GCUF, Faisalabad, Pakistan</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-600 ">📞 Call Us</h3>
              <p className="dark:text-white">+92 322 6075308</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-600 ">📧 Email</h3>
              <p className="text-black dark:text-white">noteworthyuziham@gmail.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-600 ">💬 Social</h3>
              <p className="text-black dark:text-white">Follow us on LinkedIn | Instagram | Twitter</p>
            </div>
          </div>
        </div>

        {/*==== Footer ====*/}
        <div className="text-center text-xs text-gray-500 dark:text-white mt-12">
          &copy; {new Date().getFullYear()} NoteWorthy — Made with ❤️ by BSCS Final Year Students @GCUF
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

