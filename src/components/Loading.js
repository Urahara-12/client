let Loading = {
    render : async () => {
        let view =  `
            <div class='column col-12 loading loading-lg' ></div>
        `
        return view
    }
    , after_render: async () => { }
}
export default Loading;
