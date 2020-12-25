let postUser = async (name, email, password) => {
     const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password 
        })
    };
    try {
        //return await fetch(`https://youssef-server.herokuapp.com/register/`, options)
        return await fetch(`http://localhost:80/register/`, options)
    } catch (err) {
    
        console.log('Error getting documents', err)
    }
}

let Register = {
    
    render: async () => {
        if (localStorage.getItem('token')) {
            window.location.hash='#/';
        } else {
            return `
                <form class='column col-3 form-group p-centered' style='height:100%; padding-top:200px'>
                    <div class='form-group'>
                        <input class='form-input' id='name_input' type='text' placeholder='name'>
                    </div>
                    <div class='form-group has-icon-right' id='email_group'>
                        <input class='form-input' id='email_input' type='text' placeholder='test@example.com'>
                        <i class='form-icon icon' id='email_icon'></i>
                        <p class='form-input-hint' id='email_hint' style='display:none;'></p>
                    </div>
                    <div class='form-group'>
                        <input class='form-input' id='pass_input' type='password' placeholder='password'>
                    </div>
                    <div class='has-icon-right' id='pass_group'>
                        <input class='form-input' id='repeat_pass_input' type='password' placeholder='password again'>
                        <i class='form-icon icon' id='pass_icon'></i>
                        <p class='form-input-hint' id='pass_hint' style='display:none;'>passwords don't match</p>
                    </div>
                    <div class='p-2' style='width:100%; margin: 0 auto;'>
                        <button class='btn btn-primary p-centered disabled' id='register_submit_btn'>Register</button>
                    </div>
                </form>
            `
        }
    }

    , after_render: async () => {
        if (localStorage.getItem('token')) {
        } else {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;// regular expression to check emails
            document.getElementById('email_input').addEventListener(
                'keyup',
                async () => {
                    let email = document.getElementById('email_input');
                    let email_group = document.getElementById('email_group');
                    let email_icon = document.getElementById('email_icon');
                    let email_hint = document.getElementById('email_hint');
                    let button = document.getElementById('register_submit_btn');
                    let pass_group = document.getElementById('pass_group');

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
                        let resp = await fetch(`http://localhost:80/email_checker?email=${email.value}`);
                        if (resp.ok) {
                            email_group.classList.add('has-error');
                            email_icon.classList.remove('loading');
                            email_hint.style.display = 'block';
                            email_hint.innerHTML = 'Email Already Exists';
                            button.classList.add('disable');
                        } else {
                            email_group.classList.add('has-success');
                            email_icon.classList.remove('loading');
                            email_icon.classList.add('icon-check');
                            if (pass_group.classList.contains('has-success')) {
                                button.classList.remove('disabled');
                            }
                        }
                    }
                }
            )

            document.getElementById('repeat_pass_input').addEventListener(
                'keyup', // ama asheel 2edy,
                async () => {
                    let pass = document.getElementById('pass_input');
                    let passRepeat = document.getElementById('repeat_pass_input');
                    let pass_group = document.getElementById('pass_group');
                    let pass_icon = document.getElementById('pass_icon');
                    let pass_hint = document.getElementById('pass_hint');
                    let button = document.getElementById('register_submit_btn');
                    let email_group = document.getElementById('email_group');

                    pass_group.classList.remove('has-error');
                    pass_group.classList.remove('has-success');
                    pass_icon.classList.add('loading')
                    pass_icon.classList.remove('icon-check')
                    pass_hint.style.display = 'none';
                    if (pass.value === passRepeat.value) {
                        pass_group.classList.add('has-success');
                        pass_icon.classList.remove('loading');
                        pass_icon.classList.add('icon-check');
                        if (email_group.classList.contains('has-success')) {
                            button.classList.remove('disabled');
                        }
                    } else {
                        pass_group.classList.add('has-error');
                        pass_icon.classList.remove('loading');
                        pass_hint.style.display = 'block';
                        pass_hint.innerHTML = 'Passwords Don\'t Match';
                        button.classList.add('disable');
                    }
                }
            )

            document.getElementById('register_submit_btn').addEventListener(
                'click',
                async () => {
                    let button = document.getElementById('register_submit_btn');
                    button.classList.add('loading');
                    button.classList.add('disable');
                    let name = document.getElementById('name_input');
                    let email = document.getElementById('email_input');
                    let password = document.getElementById('pass_input');
                    let resp = await postUser(name.value, email.value, password.value);
                    const body = await resp.json();
                    localStorage.setItem('token', body.token);
                    window.location.hash='#/';
                }
            )
        }
    }
}

export default Register;
