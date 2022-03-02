import Link from 'next/link'

const ErrorPage = () => {
  return (
    <div className="flex flex-col w-full max-w-xl text-center">
      <img
        className="object-contain w-auto h-64 mb-8"
        src="/images/illustration.svg"
        alt="svg"
      />
      <h2 className="text-6xl text-blue-500 mb-4">Página invalida</h2>

      <div className="mb-8 text-center text-white">
        A página que você está tentando acessar é invalida ou expirou
      </div>
      <div className="flex w-full">
        <a href="/" className="btn btn-lg btn-rounded btn-block bg-blue-500 hover:bg-blue-600 text-white">
          Go back
        </a>
      </div>
    </div>
  )
}

export default ErrorPage
