import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";
import Link from "next/link";
import { Context } from "../context";

const Index = ({ courses }) => {
  const { state } = useContext(Context);

  return (
    <>
      <div className="container-fluid bg-primary text-white">
        <div className="row">
          <div className="col-6 p-4 text-center">
            <div className="mt-5 pt-5">
              <div className=" pt-4">
                <h1 className="text-white mt-5 pt-5">
                  FREE E-LEARNING <br /> PLATFORM FOR YOU.
                </h1>
                <h6 className="text-white mt-4">
                  Built by students for the students.
                </h6>
                <br />
                <button type="submit" className="btn btn-light btn-lg mt-2">
                  <Link href={state.user ? "/user" : "/login"}>
                    <a>Get Started</a>
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className="col-6 p-4">
            <img
              src="/HomePageArt.png"
              className="img-fluid py-5 mt-3"
              alt="Homepage image"
            ></img>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <h1 className="my-5 text-center">Currently available courses</h1>
        <div className="row d-flex justify-content-center">
          {courses.map((course) => (
            <div key={course._id} className="col-md-4">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer  */}
      <div className="container-fluid bg-dark text-white pt-3">
        <div className="row">
          <div className="col-md-4">
            <h5 className="text-center text-white">About Us</h5>
            <p className="text-center">
              eSchool is an open source free e-learning platform for students.
              Our goal is to offer organized learning materials for and by our
              users.
            </p>
          </div>
          <div className="col-md-4">
            <h5 className="text-center text-white">Contact Us</h5>
            <p className="text-center">
              For any queries/suggestions, please contact us at:
              daddy7408429989@gmail.com
            </p>
          </div>
          <div className="col-md-4">
            <h5 className="text-center text-white">Links</h5>
            <p className="text-center">
              <a
                href="https://docs.google.com/document/d/1gZZ_u16X-80jfbZgEjt027RQMhOdQMpIocWfst20Y34/edit?usp=sharing"
                target="_blank"
                className="m-2"
              >
                Resume
              </a>
              <a
                href="https://github.com/abhixekyadav"
                target="_blank"
                className="m-2"
              >
                GitHub
              </a>
            </p>
          </div>
          <p className="text-center">© eSchool 2022 </p>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courses`);
  console.log("courses", data);
  return {
    props: {
      courses: data,
    },
  };
}

export default Index;
