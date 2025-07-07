import { FaCheckCircle } from "react-icons/fa";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { MdPhoneIphone } from "react-icons/md";
export const studentSays=[
    {
      name: 'Areeba Ahmed',
      review: "These notes are a life-saver! Clean, well-organized, and exactly what I needed.",
    },
    {
      name: 'Zain Ali',
      review: "Found past papers from every semester. Really helpful during exam week!",
    },
    {
      name: 'Fatima Khan',
      review: "Thanks to NoteWorthy, I finally understood Computer Graphics! 10/10 recommended.",
    },
  ]

  export const courseData = [
    {
      title: "Artificial Intelligence",
      subject: "AI",
      Notes:"CNN",
      availability: "Login to Download",
    },
    {
      title: "Database Systems",
      subject: "DBMS",
      Notes:"Data Integerity",
      availability: "Login to Download",
    },
    {
      title: "Computer Graphics",
      subject: "CG",
      Notes:"Raster Scan",
      availability: "Login to Download",
    },
  ];


  //Feature Frontend Home

export const features = [
  {
    icon: <FaCheckCircle className="text-blue-600 text-4xl" />,
    text: "Verified Teacher Notes",
    delay: "0",
    textSize: "text-lg"
  },
  {
    icon: <BsFileEarmarkTextFill className="text-blue-600 text-4xl" />,
    text: "MCQs & Past Papers",
    delay: "100",
    textSize: "text-lg"
  },
  {
    icon: <BiSearchAlt className="text-blue-600 text-4xl" />,
    text: "Search by Course Title",
    delay: "200",
    textSize: "text-lg"
  },
  {
    icon: <MdPhoneIphone className="text-blue-600 text-4xl" />,
    text: "Mobile-Friendly",
    delay: "300",
    textSize: "text-lg"
  }
]
