// import React, { useState } from "react";
// import { FaGoogle, FaFacebookF } from "react-icons/fa";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});

//   // ✅ Validation Function
//   const validateForm = () => {
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const passwordStrong = password.length >= 8;

//     if (!emailRegex.test(email)) {
//       newErrors.email = "Enter a valid email address.";
//     }

//     if (!passwordStrong) {
//       newErrors.password = "Password must be at least 8 characters long.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ✅ Submit Handler
//   const handleSignIn = (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     // TODO: Connect with backend login API
//     console.log("Logging in with:", { email, password });
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center"
//       style={{
//         backgroundImage: "url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg')",
//       }}
//     >
//       <div className="bg-white w-full max-w-sm rounded-lg shadow-md p-6">
//         <h2 className="text-xl font-bold text-indigo-600 font-sans mb-6 text-center">Sign In to Business Nexus</h2>

//         <form onSubmit={handleSignIn}>
//           {/* Email */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Email *</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className={`mt-1 block w-full px-3 py-2 border ${
//                 errors.email ? "border-red-500" : "border-gray-300"
//               } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
//             />
//             {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
//           </div>

//           {/* Password */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Password *</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               className={`mt-1 block w-full px-3 py-2 border ${
//                 errors.password ? "border-red-500" : "border-gray-300"
//               } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
//             />
//             {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
//           </div>

//           {/* Forgot Password */}
//           <div className="mb-4 text-right">
//             <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
//           </div>

//           {/* Sign In Button */}
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
//           >
//             Sign In
//           </button>
//         </form>

//         {/* Sign Up Redirect */}
//         <p className="mt-4 text-center text-sm text-gray-600">
//           Not Registered? <a href="/register" className="text-indigo-600 hover:underline">Sign Up</a>
//         </p>

//         {/* Divider */}
//         <div className="my-4 border-t pt-4 text-center text-sm text-gray-500">
//           Or continue with social account
//         </div>

//         {/* Social Buttons */}
//         <div className="flex justify-center gap-4">
//           <button className="p-2 border rounded-full hover:bg-gray-100 transition">
//             <FaGoogle className="text-red-500" />
//           </button>
//           <button className="p-2 border rounded-full hover:bg-gray-100 transition">
//             <FaFacebookF className="text-blue-600" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../auth/login.js"; // Make sure this exists

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      
      const user = await loginUser(email, password);

      if ( user.role === "Investor") {
        navigate("/dashboard/investor");
      } else if (user.role === "Entrepreneur") {
        navigate("/dashboard/entrepreneur");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg')",
      }}
    >
      <div className="bg-white w-full max-w-sm rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-indigo-600 font-sans mb-6 text-center">
          Sign In to Business Nexus
        </h2>

        <form onSubmit={handleSignIn}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Forgot Password */}
          <div className="mb-4 text-right">
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Redirect */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Not Registered?{" "}
          <a href="/register" className="text-indigo-600 hover:underline">
            Sign Up
          </a>
        </p>

        {/* Social Login */}
        <div className="my-4 border-t pt-4 text-center text-sm text-gray-500">
          Or continue with social account
        </div>
        <div className="flex justify-center gap-4">
          <button className="p-2 border rounded-full hover:bg-gray-100 transition">
            <FaGoogle className="text-red-500" />
          </button>
          <button className="p-2 border rounded-full hover:bg-gray-100 transition">
            <FaFacebookF className="text-blue-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
