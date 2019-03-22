export const CurrentCache = {
    set: function (date) {
        sessionStorage["cacheDate"] = JSON.stringify(date);
    },
    get: function () {
        const json = sessionStorage["cacheDate"];
        if (!json){
            return null;
        }
        return JSON.parse(json);
    },
    remove: function () {
        sessionStorage.removeItem("cacheDate");
    }
}