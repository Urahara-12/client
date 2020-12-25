const reqOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
};

const noDepartmentsHTML = `
    <div class='column col-9'>
        <div class='panel m-2' style='height:98%'>
            <div class='panel-body p-2'>
                <div class='empty m-2' style='padding-top:30%;padding-bottom:78%'>
                    <div class='empty-icon'>
                        <i class='icon icon-3x icon-emoji'></i>
                    </div>
                    <p class='empty-title h5'>There are no Departments</p>
                    <pre class='empty-subtitle code' data-lang='CURL'>
                    <code class='text-left'>
$ c:/xampp/mysql/bin/mysql.exe \\
  -hlocalhost -uroot app \\
  -e "insert into depts 
  (name, description) values
  ('dept 1', 'this is depts 1'),
  ('dept 2', 'this is depts 2'),
  ('dept 3', 'this is depts 3')"
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    </div>

    `;

let Home = {
    render : async () => {
        if (!localStorage.getItem('token')) {
            window.location.hash='#/login';
        } else {
            const userReq = await fetch(
                //`https://youssef-server.herokuapp.com/user`, reqOptions
                `http://localhost:80/user`, reqOptions
            )
            const departmentsReq = await fetch(
                //`https://youssef-server.herokuapp.com/departments`, reqOptions
                `http://localhost:80/departments`, reqOptions
            )

            let user = await userReq.json();
            let departments = await departmentsReq.json();
            let departmentsHMTL;
            if (Object.entries(departments).length === 0) {
                departmentsHMTL = noDepartmentsHTML;
            } else {
                let departmentsRows = '';
                for (let department of departments) {
                    departmentsRows += `
                        <tr>
                            <td>${department.id}</td>
                            <td>${department.name}</td>
                            <td>${department.description}</td>
                        </tr>
                    `
                }
                departmentsHMTL = `
                    <div class='column col-9'>
                        <div class='panel m-2' style='height:98%'>
                            <div class='panel-body'>
                                <table class='table table-striped'>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${departmentsRows}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
            }

            return departmentsHMTL + `
                <div class='colmun col-3 pr-2'>
                    <div class='panel m-2' style='height:98%;'>
                        <div class='panel-header text-center'>
                            <figure class='avatar avatar-xl'>
                                <img src='static/avatar.png'>
                                <i class='avatar-presence online'></i>
                            </figure>
                            <div class='panel-title h5 mt-10'>${user.name}</div>
                        </div>
                        <div class='panel-nav'>
                            <div class='divider text-center'
                            data-content='-----------------------------'></div>
                        </div>
                        <div class='panel-body'>
                            <div class='tile tile-centered py-2'>
                                <div class='tile-content'>
                                    <div class='tile-title text-bold'>Email</div>
                                    <div class='tile-subtitle'>${user.email}</div>
                                </div>
                                <div class='tile-action'>
                                    <button id='edit_email' class='btn btn-link btn-action
                                        btn-lg tooltip tooltip-left' data-tooltip="Edit Email">
                                        <i class='icon icon-edit'></i>
                                    </button>
                                </div>
                            </div>
                            <div class='tile tile-centered py-2'>
                                <div class='tile-content'>
                                    <div class='tile-title text-bold'>Password</div>
                                    <div class='tile-subtitle'>**********</div>
                                </div>
                                <div class='tile-action'>
                                    <button id='edit_password' class='btn btn-link btn-action
                                        btn-lg tooltip tooltip-left' data-tooltip="Edit Password">
                                        <i class='icon icon-edit'></i>
                                    </button>
                                </div>
                            </div>
                            <div class='tile tile-centered py-2'>
                                <div class='tile-content'>
                                    <div class='tile-title text-bold'>Registration Date</div>
                                    <div class='tile-subtitle'>${user.registration_date}</div>
                                </div>
                            </div>
                        </div>
                        <div class='panel-footer'>
                            <button id='delete_account' class="btn btn-error btn-block">Delete Account</button>
                        </div>

                    </div>
                </div>
            `
        }
    }
    , after_render: async () => {
        if (!localStorage.getItem('token')) {
        } else {
        }
    }

}

export default Home;
