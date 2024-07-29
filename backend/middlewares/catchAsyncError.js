// Export a higher-order function to handle asynchronous errors
module.exports = func => (req, res, next) =>

        // Resolve the promise returned by the asynchronous function and catch any errors
        Promise.resolve(func(req, res, next)).catch(next)
