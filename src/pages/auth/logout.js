import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const LogOut = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "LOGOUT" });
  }, []);
  return (
    <div className="flex flex-col w-full max-w-xl text-center">
      <img
        className="object-contain w-auto h-64 mb-8"
        src="/images/illustration.svg"
        alt="svg"
      />
      <div className="mb-8 text-center text-gray-900">
        You have succesfully signed out.
      </div>
      <div className="flex w-full">
        <Link href="/auth/login">
          <a
            className="btn btn-lg btn-rounded btn-block bg-blue-500 hover:bg-blue-600 text-white">
            Log In
          </a>
        </Link>
      </div>
    </div>
  );
};

export default LogOut;
