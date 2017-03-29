if (process.env.NODE_ENV === 'development') {
    module.exports = require('./createStore.dev');
} else if (process.env.NODE_ENV === 'production') {
    module.exports = require('./createStore.prod');
};
