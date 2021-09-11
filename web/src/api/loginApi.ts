

export function login(params: any): Promise<any> {
    return fetch("/api/login", {
        method: "POST",
        body: params
    }).then(res => res.json())
}

export function register(params: any): Promise<any> {
    return fetch("/api/register", {
        method: "POST",
        body: params
    }).then(res => res.json())
}


export function updateInfo(params: any): Promise<any> {
    return fetch("/api/updateInfo", {
        method: "POST",
        body: params
    }).then(res => res.json())
}


export function checkName(params: any): Promise<any> {
    return fetch("/api/checkName", {
        method: "POST",
        body: params
    }).then(res => res.json())
}








