import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // state
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  // const { user } = state;

  // router
  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      // save in local storage
      window.localStorage.setItem("user", JSON.stringify(data));
      // redirect
      window.location.pathname = "/user";
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-center square mt-3">Login</h1>

      <div className="container-fluid">
        <div className="row">
          <div className="col-6 text-center">
            <img
              src="/Login.jpg"
              className="img-fluid w-75 p-2"
              alt="Login image"
            ></img>
          </div>

          <div className="col-6 mt-5 p-5 text-center">
            <div className="mt-2 p-5">
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="form-control mb-4 p-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />

                <input
                  type="password"
                  className="form-control mb-4 p-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />

                <button
                  type="submit"
                  className="btn btn-block btn-primary"
                  disabled={!email || !password || loading}
                >
                  {loading ? <SyncOutlined spin /> : "Submit"}
                </button>
              </form>

              <p className="text-center pt-3">
                Not yet registered?{" "}
                <Link href="/register">
                  <a>Register</a>
                </Link>
              </p>

              <p className="text-center">
                <Link href="/forgot-password">
                  <a className="text-danger">Forgot password</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
