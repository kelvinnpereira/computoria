import Link from "next/link";

const Footer = () => {
  return (
    <div
      className="flex flex-row items-center justify-between w-full text-xs z-10">
      <div
        className="text-white">&copy; Computoria {(new Date()).getFullYear()}</div>
      <div className="flex flex-row ml-auto space-x-2">
        <Link href="https://github.com/kelvinnpereira/computoria#readme">
          <a>Sobre</a>
        </Link>
        <Link href="https://github.com/kelvinnpereira/computoria">
          <a>Github</a>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
