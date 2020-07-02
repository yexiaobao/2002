// const { expr } = require("jquery");
export default class Utils{
    static ce(type,style){
        let elem=document.querySelector(type);
        Object.assign(type.style,style);
        return elem;
    }
}
