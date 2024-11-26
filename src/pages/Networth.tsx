import { Link } from "react-router-dom"


function Networth() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-5">
      <h1 className="text-2xl">Page is Under Development {":("}</h1>
      <Link className="text-blue-600 dark:text-blue-500 hover:underline" to='/'>Go Back</Link>
      </div>
    </div>
  )
}

export default Networth