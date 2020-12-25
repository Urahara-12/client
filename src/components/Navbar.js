let Navbar = {
    render: async () => {
        let view;
        if (!localStorage.getItem('token')) {
            view = `
                <section class='navbar-section'>
                    <a href='/#/' class='navbar-brand text-bold mr-2'>APP</a>
                </section>
                <section class='navbar-section'>
                    <a href='/#/register' class='btn btn-link'>Register</a>
                    <a href='/#/login' class='btn btn-link'>Login</a>
                </section>
            `
        } else {
            view = `
                <section class='navbar-section'>
                    <a href='/#/' class='navbar-brand text-bold mr-2'>APP</a>
                </section>
            `
        }
        return view
    },
    after_render: async () => { }
}

export default Navbar;
