const Login = () => {

    //images
    const loginImg = '/assets/images/login/login-side.png';

    return (
        <section className='login'>
            <div className="background">
                <div className="curve"></div>
                <div className="content">
                    <div className="main-content">
                        <h1>Ankurshala</h1>
                        <p>Login to your account</p>
                        <form>
                            <input type="email" placeholder="Email" required />
                            <input type="password" placeholder="Password" required />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                    <div className="img-content">
                        <img src={loginImg} alt="Login" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login