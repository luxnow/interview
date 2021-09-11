

export function login(params: any): Promise<any> {
    return fetch("/api/login", {
        method: "POST",
        body: params
    })
}

export function register(params: any): Promise<any> {
    return fetch("/api/register", {
        method: "POST",
        body: params
    })
}

export function checkName(params: any): Promise<any> {
    return fetch("/api/checkName", {
        method: "POST",
        body: params
    })
}








