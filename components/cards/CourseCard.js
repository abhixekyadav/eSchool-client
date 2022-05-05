import { Card, Badge } from "antd";
import Link from "next/link";
import { currencyFormatter } from "../../utils/helpers";
import { useState, useEffect } from "react";
import axios from "axios";

const { Meta } = Card;

const CourseCard = ({ course }) => {
  const { name, instructor, image, slug, categories } = course;
  const [students, setStudents] = useState(0);

  const studentCount = async () => {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/instructor/student-count`,
      {
        courseId: course._id,
      }
    );
    setStudents(data.length);
  };

  useEffect(() => {
    course && studentCount();
  }, [course]);

  // console.log("studentCount", students);

  return (
    <Link href={`/course/${slug}`}>
      <a>
        <Card
          className="mb-4"
          cover={
            <img
              src={image.Location}
              alt={name}
              style={{ height: "300px", objectFit: "cover" }}
              className="p-1"
            />
          }
        >
          <h2 className="font-weight-bold">{name}</h2>
          <p>by {instructor.name}</p>
          <Badge
            count={students}
            style={{ backgroundColor: "#03a9f4" }}
            className=" mr-2"
          />
          <span className="p-2">{!students && "No"} Student(s) Enrolled</span>
        </Card>
      </a>
    </Link>
  );
};

export default CourseCard;
