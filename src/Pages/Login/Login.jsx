import { Link, NavLink, useLocation, useNavigate } from "react-router";

import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthContext";

// import animationData from "../assets/login-animation.json";
// import Lottie from "lottie-react";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !isLongEnough) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        navigate(location.state || "/");
        toast.success("Sign in successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleLoginWithGoogle = () => {
    signInWithGoogle()
      .then(() => {
        navigate(location.state || "/");
        toast.success("Sign in successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    document.title = "Login | FOOD KING";
  }, []);

  return (
    <div className="min-h-screen px-4 pb-10 sm:pb-16 flex items-center justify-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="w-full max-w-5xl mx-auto mb-6 sm:mb-10 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Column */}
        <div className="bg-gradient-to-br from-[#F0F3F4] to-red-400 text-white p-6 sm:p-10 md:w-1/2 flex flex-col justify-center items-center">
          <div className="w-full max-w-xs">
            {/* <Lottie animationData={animationData} loop={true} /> */}
          </div>
        </div>

        {/* Right Column */}
        <div className="p-6 sm:p-10 md:w-1/2">
          <h3 className="text-2xl font-bold text-center mb-2">FOOD KING</h3>
          <p className="text-center mb-6 text-gray-600">
            Hungry? Let’s Get You Logged In!
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              required
              value={email}
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full px-4 py-2 text-sm border rounded-md"
            />
            <input
              name="password"
              required
              autoComplete="current-password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 text-sm border rounded-md"
            />

            <div className="flex items-center justify-between text-sm">
              <span className="hover:underline cursor-pointer">
                Forgot Password?
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition text-sm"
            >
              Login
            </button>

            <button
              onClick={handleLoginWithGoogle}
              type="button"
              className="w-full rounded-full bg-white text-black border border-[#e5e5e5] py-2 text-sm flex items-center justify-center gap-2"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>

            <p className="text-center pt-4 text-sm">
              Don’t have an account?{" "}
              <Link
                to="/auth/register"
                className="text-red-600 font-semibold hover:underline"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
