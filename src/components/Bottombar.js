let Bottombar = {
    render: async () => {
        let view = `
            <p class='column col-12'>
                <a href='https://github.com/' target='_blank'>GitHub</a> ·
                <a href='https://twitter.com/' target='_blank'>Twitter</a> ·
                <a href='https://facebook.com/' target='_blank'>Facebook</a> ·
                <a href='https://instagram.com/' target='_blank'>Instagram</a>
            </p>
            <p class='column col-12'>
                Designed and Built with <span class='text-error'>&hearts;</span> by
                <a href='https://github.com/' target='_blank'>Youssef</a>.
            </p>
        `
        return view
    },
    after_render: async () => { }
}

export default Bottombar;
