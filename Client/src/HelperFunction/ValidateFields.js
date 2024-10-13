const ValidateFields = (errorMessages) =>{
let isError = false;

let updatedError = {};

Object.keys(errorMessages).forEach((key) => {
    if (!errorMessages[key].isValid) {
        isError = true;
        updatedError[key] = true;
    } else {
        updatedError[key] = false;
    }
});
return {isError,updatedError}
}
export {ValidateFields}