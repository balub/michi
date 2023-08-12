import axios from "axios"

export default function Signin() {

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-navy">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-slate-800 border-gray-500 border-2 text-violet-600  py-4 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 className="text-lg font-semibold text-center text-navy-light mb-6">Sign In</h2>
            <div className="mt-6">
              <div onClick={()=>window.open(`http://localhost:4000/v1/auth/github`, "_blank", "noreferrer")}>
                <a
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300  rounded-md shadow-sm bg-slate-900 text-sm font-medium text-gray-300 hover:bg-slate-800 mb-2"
                >
                  Continue with GitHub
                </a>
              </div>

              <div onClick={()=>window.open(`http://localhost:4000/v1/auth/google`, "_blank", "noreferrer")}>
                <a
                  className="w-full inline-flex mb-8 justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-slate-900 text-sm font-medium text-gray-300 hover:bg-slate-800"
                >
                  Continue with Google
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}
