export default ({subscribeDispatch}) => {
    return subscribeDispatch(action => {
        const { type } = action
        if(type === "logoutComplete") {
            if(document) {
                const cookies = document.cookie.split("; ")
                const ocStateDataCookie = cookies.find(cookie => cookie.includes("OCStateData"))
                if(ocStateDataCookie) {
                    const oneDayAgo = new Date()
                    oneDayAgo.setTime(oneDayAgo.getTime() + (-1*24*60*60*1000))
                    document.cookie = `OCStateData = ; expires = ${oneDayAgo.toUTCString()}`
                }
            }
        }
    });
};