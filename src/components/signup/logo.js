import { useSelector, shallowEqual } from "react-redux";
import Link from "next/link";

const Logo = () => {
  const { config } = useSelector(
    (state) => ({
      config: state.config
    }),
    shallowEqual
  );
  const { name } = { ...config };
  return (
    <div
      className="uppercase font-bold text-base tracking-wider flex flex-row items-center justify-start w-full whitespace-nowrap text-white">
      <Link href="/">
        <a className="flex flex-row items-center justify-start space-x-2">
          <img
            style={{ width: "28px" }}
            src="/favicon.png"
            className="h-auto w-full"
          />
          <span>{name}</span>
        </a>
      </Link>
    </div>
  );
};

export default Logo;
