let postUser = async (email, password) => {
     const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    };
    try {
        //return await fetch(`https://youssef-server.herokuapp.com/login/`, options)
        return await fetch(`http://localhost:80/login/`, options)
    } catch (err) {
        // TODO: put a toaster
        console.log('Error getting documents', err)
    }
}

let Login = {
    // TODO: add event listner for email checker on there
    render: async () => {
        if (localStorage.getItem('token')) {
            window.location.hash='#/';
        } else {
            return `
                <div class='column col-12' style='display:none;' id='toaster'>
                    <div class="toast toast-error">
                        <p id='toast'></p>
                    </div>
                </div>
                <form class='column col-3 form-group p-centered' style='height:100%; padding-top:200px'>
                    <div class='form-group has-icon-right' id='email_group'>
                        <input class='form-input' id='email_input' type='text' placeholder='test@example.com'>
                        <i class='form-icon icon' id='email_icon'></i>
                        <p class='form-input-hint' id='email_hint' style='display:none;'></p>
                    </div>
                    <div class='form-group'>
                        <input class='form-input' id='pass_input' type='password' placeholder='password'>
                    </div>
                    <div class='p-2' style='width:100%; margin: 0 auto;'>
                        <button class='btn btn-primary p-centered disabled' id='login_submit_btn'>Login</button>
                    </div>
                </form>
            `
        }
    }

    , after_render: async () => {
        if (localStorage.getItem('token')) {
        } else {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;
            document.getElementById('email_input').addEventListener(
                'keyup',
                async () => {
                    let email = document.getElementById('email_input');
                    let email_group = document.getElementById('email_group');
                    let email_icon = document.getElementById('email_icon');
                    let email_hint = document.getElementById('email_hint');
                    let button = document.getElementById('login_submit_btn');

                    email_group.classList.remove('has-error');
                    email_group.classList.remove('has-success');
                    email_icon.classList.add('loading')
                    email_icon.classList.remove('icon-check')
                    email_hint.style.display = 'none';
                    if (!re.test(String(email.value).toLowerCase())) {
                        email_group.classList.add('has-error');
                        email_icon.classList.remove('loading');
                        email_hint.style.display = 'block';
                        email_hint.innerHTML = 'Not Valid Email';
                        button.classList.add('disable');
                    } else {
                        //let resp = await fetch(`https://youssef-server.herokuapp.com/email_checker?email=${email.value}`);
                        let resp = await fetch(`http://localhost:80/email_checker?email=${email.value}`);
                        if (resp.ok) {
                            email_group.classList.add('has-success');
                            email_icon.classList.remove('loading');
                            email_icon.classList.add('icon-check');
                            button.classList.remove('disabled');
                        } else {
                            email_group.classList.add('has-error');
                            email_icon.classList.remove('loading');
                            email_hint.style.display = 'block';
                            email_hint.innerHTML = 'Email Doesn\'t Exists';
                            button.classList.add('disable');
                        }
                    }
                }
            )

            document.getElementById('login_submit_btn').addEventListener (
                'click',
                async () => {
                    let button = document.getElementById('login_submit_btn');
                    button.classList.add('loading');
                    button.classList.add('disable');

                    let email = document.getElementById('email_input');
                    let password = document.getElementById('pass_input');
                    let resp = await postUser(email.value, password.value);
                    const body = await resp.json();
                    if (resp.ok) {
                        localStorage.setItem('token', body.token);
                        window.location.hash='#/';
                    } else if (resp.status == 500) {
                        // TODO: add toaster
                        console.log(resp.status, body.details);

                    } else {
                        // TODO: add toaster
                        let toaster = document.getElementById('toaster');
                        let toast = document.getElementById('toast');
                        toast.innerHTML = body.details;
                        toaster.style.display = 'block';
                        button.classList.remove('loading');
                        button.classList.remove('disabled');
                    }
                }
            )
        }
    }
}

export default Login;
