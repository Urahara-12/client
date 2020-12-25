let Error404 = {
    render : async () => {
        return `
            <figure class='column col-9 p-centered figure' style='margin-top:200px'>
                <img class='img-responsive ' src='static/404.jpeg'>
                <figcaption class='figure-caption text-center'>
                  <h1>You in the wrong place!</h1>
                </figcaption>
                <figcaption class='figure-caption text-center'>
                  404 Page Not Found
                </figcaption>
            </figure>
        `
    }
    , after_render: async () => { }
}

export default Error404;
