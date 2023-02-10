export function convertBoolean(boolean: any) {
    let bool = false
    if (boolean === 'false') bool = false
    if (boolean === 'true') bool = true
    return bool
}