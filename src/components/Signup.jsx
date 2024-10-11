//This is simply a component that renders a form.  The form doesn't actually do anything, it is just an example
export default function Signup() {
    return (
        <div style={{margin: "0 auto", width: "max-content"}}>
            <h4>Create Account</h4>
            <form>
                <label style={{margin: "4px"}} htmlFor="fullName">Full Name</label>
                <input type="text" name="fullName" id="fullName" />
                <br />
                <label style={{margin: "4px"}} htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                <br />
                <label style={{margin: "4px"}} htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
