const LogOut = () => {
  return (
    <div
      className="flex flex-col w-full max-w-xl text-center"
      style={{ background: "rgba(17,24,39)" }}>
      <img
        className="object-contain w-auto h-64 mb-8"
        src="/images/illustration.svg"
        alt="svg"
      />
      <div className="mb-8 text-center text-white">
        Você foi deslogado com sucesso.
      </div>
      <div className="flex w-full">
        <a
          href="/auth/login"
          className="btn btn-lg btn-rounded btn-block bg-blue-500 hover:bg-blue-600 text-white">
          Log In
        </a>
      </div>
    </div>
  );
};

export default LogOut;