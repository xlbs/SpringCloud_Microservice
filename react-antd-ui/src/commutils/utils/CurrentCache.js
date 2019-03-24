//sessionStorage(会话存储),
// sessionStorage的生命周期是在仅在当前会话下有效,关闭页面或浏览器之后sessionStorage中的数据将会销毁
export const CurrentSessionCache = {
    set: function (key,value) {
        sessionStorage[key] = JSON.stringify(value);//将对象转成json数据
    },
    get: function (key) {
        const json = sessionStorage[key];
        if (!json || json==="undefined"){
            return null;
        }
        return JSON.parse(json);
    },
    add: function(key,value){
        let json = sessionStorage[key];
        if(!json || json==="undefined"){
            sessionStorage[key] = JSON.stringify(value);
        }else{
            json = JSON.parse(json);
            let cache = [];
            if(json instanceof Array){
                for(let i=0; i<json.length; i++){
                    cache.push(json[i]);
                }
                if(value instanceof Array){
                    for(let j=0; j<value.length; j++){
                        cache.push(value[j]);
                    }
                }else{
                    cache.push(value);
                }
                sessionStorage[key] = JSON.stringify(cache);
            }else{
                cache.push(json);
                if(value instanceof Array){
                    for(let j=0; j<value.length; j++){
                        cache.push(value[j]);
                    }
                }else{
                    cache.push(value);
                }
                sessionStorage[key] = JSON.stringify(cache);
            }
        }
    },
    remove: function (key) {
        sessionStorage.removeItem(key);
    },
    clear: function () {
        sessionStorage.clear();
    }
};

//localStorage(本地存储)
// localStorage的生命周期是永久的,关闭页面或浏览器之后localStorage中的数据也不会消失,除非主动删除数据
export const CurrentLocalCache = {
    set: function (key,value) {
        localStorage[key] = JSON.stringify(value);//将对象转成json数据
    },
    get: function (key) {
        const json = localStorage[key];
        if (!json || json==="undefined"){
            return null;
        }
        return JSON.parse(json);
    },
    remove: function (key) {
        localStorage.removeItem(key);
    },
    clear: function () {
        localStorage.clear();
    }
};