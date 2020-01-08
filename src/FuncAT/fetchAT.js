export default (url) => {
    return new Promise((res, rej)=>{
        fetch(url).then(r=>r.json()).then((r)=>res(r))
    });
}