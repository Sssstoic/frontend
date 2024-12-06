import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { auth } from '../_utils/Firebase';
import { useNavigate } from 'react-router-dom';

const Popup = ({ showPopup, setShowPopup, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (isSignUp) {
      // Sign Up Logic
      if (password !== confirmPassword) {
        setError("Passwords don't match!");
        return;
      }

      try {
        // Create user account
        await createUserWithEmailAndPassword(auth, email, password);

        // Show success message
        setSuccessMessage('Account created successfully! Please log in.');
        
        // Reset form and switch to login
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setIsSignUp(false);
      } catch (error) {
        setError(error.message);
        console.error('Error during sign up:', error.message);
      }
    } else {
      // Login Logic
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        setShowPopup(false);
      } catch (error) {
        setError(error.message);
        console.error('Error during login:', error.message);
      }
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setShowPopup(false);
    } catch (error) {
      console.error('Error signing in with social provider:', error.message);
    }
  };

  return (
    <div>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/50 z-50 backdrop-blur-sm">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 shadow-md bg-white rounded-md w-[90%] sm:w-[400px] transition-all duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{isSignUp ? 'Sign Up' : 'Login'}</h1>
              <IoCloseOutline
                className="text-2xl cursor-pointer text-gray-600 hover:text-primary"
                onClick={() => setShowPopup(false)}
              />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {isSignUp && (
                <div className="mb-6">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full rounded-md border border-gray-300 dark:border-gray-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}

              {/* Error and Success Messages */}
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-primary text-white font-semibold py-2 px-4 rounded-md w-full hover:bg-primary-dark transition duration-200"
                >
                  {isSignUp ? 'Sign Up' : 'Login'}
                </button>
              </div>
            </form>

            {/* Toggle between Sign Up and Login */}
            <div className="flex justify-center mt-4">
              <button
                type="button"
                className="text-sm text-primary hover:underline transition duration-300"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setSuccessMessage('');
                  // Reset form fields when switching
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                }}
              >
                {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
              </button>
            </div>

            {/* Social Login */}
            <div className="mt-4 text-center">
              <p className="text-gray-600 mb-2">Or log in with</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleSocialLogin(new GoogleAuthProvider())}
                  className="flex items-center justify-center bg-red-600 text-white rounded-full p-2 w-12 h-12 hover:bg-red-700 transition duration-200"
                >
                  <FaGoogle className="text-xl" />
                </button>
                <button
                  onClick={() => handleSocialLogin(new FacebookAuthProvider())}
                  className="flex items-center justify-center bg-blue-600 text-white rounded-full p-2 w-12 h-12 hover:bg-blue-700 transition duration-200"
                >
                  <FaFacebook className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;