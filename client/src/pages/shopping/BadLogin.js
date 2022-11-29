

function BadLogIn() {


    return (
        <div>
            <h2>
                Login Was Not Successful 
            </h2>
            <h3>
                Please try again
            </h3>
            <a
                href="/login"
                className="font-medium text-red-400 hover:text-black"
              >
                Log In
              </a> 
        </div>
    )
}

export default BadLogIn;