import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../Provider/AuthContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"; // ✅ import motion
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, setUser, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;
    const name = form.name.value;

    if (!name || !photo || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !isLongEnough) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateProfile(user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate(location.state ? location.state : "/");
            Swal.fire({
              icon: "success",
              title: "Registration Complete!",
              text: "You're account registered successfully!",
              confirmButtonText: "Continue",
              confirmButtonColor: "#00aeff",
            });
          })
          .catch((error) => {
            toast.error("Failed to update profile: " + error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleLoginWithGoogle = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Welcome!",
          text: "You're now logged in with Google.",
          showConfirmButton: true,
          confirmButtonColor: "#00aeff",
          confirmButtonText: "Let's Go!",
        });
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    document.title = "Register | FOOD KING";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* 🌈 Gradient background */}
     <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#00aeff_100%)]"></div>

      {/* 🎯 Animated card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-8 py-6"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Register your Account
            </h2>
            <p className="text-sm text-gray-500">
              It’s free and only takes a minute
            </p>
          </div>

          <form onSubmit={handleRegister}>
            <div className="space-y-4">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                name="name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-none focus:ring-2  focus:ring-[#00aeff]"
              />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                name="photo"
                type="text"
                placeholder="Enter your Photo URL"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-none focus:ring-2  focus:ring-[#00aeff]"
              />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-none focus:ring-2  focus:ring-[#00aeff]"
              />

              {/* Password input */}
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="new-password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-none focus:ring-2  focus:ring-[#00aeff]"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-2 bg-[#00aeff] hover:bg-[#0090d1] text-white font-semibold rounded-lg transition duration-200"
              >
                Register
              </motion.button>

              {/* Google button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleLoginWithGoogle}
                className="flex items-center justify-center gap-3 btn bg-white w-full rounded-full text-black border-[#e5e5e5] mt-2"
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
            </div>

            <p className="text-sm text-center text-gray-600 mt-5">
              Already Have An Account?{" "}
              <Link
                to="/auth/login"
                className="text-[#00aeff] font-bold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
