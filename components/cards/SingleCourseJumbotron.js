import SingleCourse from "../../pages/course/[slug]";
import { currencyFormatter } from "../../utils/helpers";
import { Badge, Modal, Button } from "antd";
import ReactPlayer from "react-player";
import { LoadingOutlined, SafetyOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const SingleCourseJumbotron = ({
  course,
  showModal,
  setShowModal,
  preview,
  setPreview,
  loading,
  user,
  handlePaidEnrollment,
  handleFreeEnrollment,
  enrolled,
  setEnrolled,
}) => {
  // destructure
  const {
    name,
    description,
    instructor,
    updatedAt,
    lessons,
    image,
    price,
    paid,
    category,
  } = course;

  const [dot, setDot] = useState("(View Full)");
  const [desc, setDesc] = useState(description.substring(0, 260));

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-8">
          {/* title */}
          <h1 className=" font-weight-bold">{name}</h1>
          {/* <p className="lead">
            {description && desc}
            <a
              href="#"
              className="link-secondary"
              onClick={(e) => setDesc(description) & setDot("")}
            >
              {dot}
            </a>
          </p> */}
          <h5>
            <b>About this Course</b>
          </h5>
          <ReactMarkdown
            children={description && desc}
            className="single-post"
          />
          <a
            href="#"
            className="link-secondary"
            onClick={(e) => setDesc(description) & setDot("")}
          >
            {dot}
          </a>

          {/* category */}
          {/* <Badge
            count={category}
            style={{ backgroundColor: "#03a9f4" }}
            className="pb-4 mr-2"
          /> */}
          {/* author */}
          <p className="mt-3">Created by {instructor.name}</p>
          {/* updated at */}
          <p>Last udpated {new Date(updatedAt).toLocaleDateString()}</p>
          {/* price */}
          {/* <h4 className="text-light">
            {paid
              ? currencyFormatter({
                  amount: price,
                  currency: "usd",
                })
              : "Free"}
          </h4> */}
        </div>
        <div className="col-md-4">
          {/* {JSON.stringify(lessons[0])} */}
          {/* show video preview or course image */}
          {lessons[0].video && lessons[0].video.Location ? (
            <div
              onClick={() => {
                setPreview(lessons[0].video.Location);
                setShowModal(!showModal);
              }}
            >
              <ReactPlayer
                className="react-player-div"
                url={lessons[0].video.Location}
                light={image.Location}
                width="100%"
                height="225px"
              />
            </div>
          ) : (
            <>
              <img src={image.Location} alt={name} className="img img-fluid" />
            </>
          )}
          {/* enroll button */}
          {loading ? (
            <div className="d-flex justify-content-center">
              <LoadingOutlined className="h1 text-danger" />
            </div>
          ) : (
            <Button
              className="mb-3 mt-3"
              type="danger"
              block
              shape="round"
              icon={<SafetyOutlined />}
              size="large"
              disabled={loading}
              onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
            >
              {user
                ? enrolled.status
                  ? "Go to course"
                  : "Enroll"
                : "Login to enroll"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCourseJumbotron;
