import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "./../../context/firebase";
import "./style.css";
import { HOME, LOGIN, SIGN_UP, FORGOTPASSWORD } from "./../../constants/routes";

const Login = () => {
    const { firebase } = useContext(FirebaseContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const isInvalid = password === "" || email === "";

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigate(HOME);
        } catch (error) {
            setEmail("");
            setPassword("");
            setError(error.message);
        }
    };

    useEffect(() => {
        document.title = "Login - Instagram";
    }, []);

    return (
        <div className="flex justify-center gap-[30px]">
            <div className="w-[30%] h-full bg-[url('/imgs/loginLeftImg.png')]  bg-no-repeat h-full flex my-[2rem]">
                <img
                    src="/imgs/screenshot1.png"
                    alt="second bg"
                    className="w-[250px] h-[541px] ml-[158px] mt-[25px]"
                />
            </div>
            <div className="h-[399px] flex align-center justify-center mt-[3rem] w-[350px] border border-grey">
                <div>
                    <div className="flex justify-center mt-[47px] mb-[20px]">
                        <img
                            className="w-[174px] h-[50px]"
                            src="/imgs/instaLogo.png"
                            alt="logo"
                        />
                    </div>
                    <div className="flex flex-col">
                        <div>
                            <div className="text-center mb-8"></div>
                            {error && (
                                <p className="mb-4 text-xs text-red-500">
                                    {error}
                                </p>
                            )}
                            <form onSubmit={handleSubmit} method="post">
                                <div>
                                    <input
                                        type="text"
                                        aria-label="Enter your email address"
                                        placeholder="Email address"
                                        className="text-[1rem] text-gray-base w-full py-5 px-4 h-2 border
                                        border-gray-primary rounded mb-[15px] bg-gray-50"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        aria-label="Enter your password"
                                        placeholder="Password"
                                        className="text-[1rem] text-gray-base w-full py-5 px-4 h-2 border
                                border-gray-primary rounded mb-[15px] bg-gray-50"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <button
                                        disabled={isInvalid}
                                        type="submit"
                                        className={`bg-[#77C8F8] cursor-pointer text-white rounded w-full h-8 font-bold ${
                                            isInvalid && "opacity-50"
                                        }`}>
                                        Log In
                                    </button>
                                    <span className="content-none "></span>
                                </div>
                                <div>
                                    <Link
                                        to={FORGOTPASSWORD}
                                        className="flex justify-center mt-[30px] font-semibold text-sm text-blue-inst">
                                        Forgot password?
                                    </Link>
                                </div>
                            </form>
                        </div>
                        <div className="mt-[60px]">
                            <div className="rounded flex align-center justify-center items-center flex-col w-full py-[23px]">
                                <p className="text-sm">
                                    Don't have an account?{` `}
                                    <Link
                                        to={SIGN_UP}
                                        className="font-bold text-blue-inst">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;