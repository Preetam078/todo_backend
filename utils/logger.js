const info = (...args) => {
    console.log(...args);
}

const error = (...errors) => {
    console.error(...errors);
}

module.exports = {info, error};