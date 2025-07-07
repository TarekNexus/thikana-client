import { Link, useLocation, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      .then(() => {
        navigate(location.state || "/");
        Swal.fire({
          icon: "success",
          title: "Welcome back!",
          text: "You're now logged in to Thikana.",
          confirmButtonColor: "#d33",
          confirmButtonText: "Let's Go!",
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleLoginWithGoogle = () => {
    signInWithGoogle()
      .then(() => {
        navigate(location.state || "/");
        Swal.fire({
          icon: "success",
          title: "Welcome!",
          text: "You're now logged in with Google.",
          confirmButtonColor: "#d33",
          confirmButtonText: "Let's Go!",
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    document.title = "Login | Thikana";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#f44336_100%)]"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <div className="w-40 sm:w-48 mb-2 mx-auto">
          <img src={logo} alt="Thikana Logo" className="w-full h-auto object-contain" />
        </div>

        <h1 className="text-center font-bold text-xl mb-2 text-red-600 ">Login</h1>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Manage your apartment, bills & more — log in to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:border-none focus:ring-2  focus:ring-red-600"
          />

          <div className="relative">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              name="password"
              required
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:border-none focus:ring-2  focus:ring-red-600 pr-10"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="hover:underline cursor-pointer">
             
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition"
          >
            Login
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
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
          </motion.button>

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
      </motion.div>
    </div>
  );
};

export default Login;
