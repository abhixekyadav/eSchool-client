import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import user from "../../server/models/user";

const Register = () => {
  const [name, setName] = useState("Ryan");
  const [email, setEmail] = useState("ryan@gmail.com");
  const [password, setPassword] = useState("rrrrrr");
  const [loading, setLoading] = useState(false);

  const {
    state: { user },
  } = useContext(Context);

  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      });
      // console.log("REGISTER RESPONSE", data);
      toast("Registration successful. Please login.");
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-center square mt-3">Register</h1>

      <div className="container-fluid">
        <div className="row">
          <div className="col-6 text-center">
            <img
              src="/Register.jpg"
              className="img-fluid w-75 p-2"
              alt="Register image"
            ></img>
          </div>

          <div className="col-6 mt-3 p-5 text-center">
            <div className="mt-2 p-5">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control mb-4 p-4"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  required
                />

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
                  disabled={!name || !email || !password || loading}
                >
                  {loading ? <SyncOutlined spin /> : "Submit"}
                </button>
              </form>

              <p className="text-center p-3">
                Already registered?{" "}
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
