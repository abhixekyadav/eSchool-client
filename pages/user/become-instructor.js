import { useContext, useState } from "react";
import { Context } from "../../context";
import { Button } from "antd";
import axios from "axios";
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import UserRoute from "../../components/routes/UserRoute";

const BecomeInstructor = () => {
  // state
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const becomeInstructor = () => {
    // console.log("become instructor");
    setLoading(true);
    axios
      .post(
        `/api/make-instructor`
        // `${process.env.NEXT_PUBLIC_API}/make-instructor`
      )
      .then((res) => {
        // console.log("res", res);
        window.location.href = "/instructor";
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.status);
        toast("Something went wrong. Try again.");
        setLoading(false);
      });
  };

  return (
    <>
      <h1 className="text-center square mt-3">Become Instructor</h1>
      <div className="container text-center">
        This feature provides you to upload your courses and publish them for
        other users.
      </div>
      <div className="container text-center">
        <img
          src="/Instructor.jpg"
          className="img-fluid w-50 p-2"
          alt="Instructor image"
        ></img>
        <br />
      </div>
      <div className="container text-center">
        <Button
          className="mb-3"
          type="primary"
          shape="round"
          icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
          size="large"
          onClick={becomeInstructor}
          disabled={
            (user && user.role && user.role.includes("Instructor")) || loading
          }
        >
          Become Instructor
        </Button>
      </div>
    </>
  );
};

export default BecomeInstructor;
