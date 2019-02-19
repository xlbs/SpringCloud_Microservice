export const CurrentUser = {
    set: function (user) {
        sessionStorage["currentUser"] = JSON.stringify(user);
    },
    get: function () {
        const json = sessionStorage["currentUser"];
        if (!json){
            return null;
        }
        return JSON.parse(json);
    },
    remove: function () {
        sessionStorage.removeItem("currentUser");
    }
}