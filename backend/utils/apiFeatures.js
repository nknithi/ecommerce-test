class APIFeatures {
    constructor(query, queryStr) {
        this.query = query; // MongoDB query object (Mongoose Query)
        this.queryStr = queryStr; // Query parameters from the request
    }

    // Method to implement search functionality based on keyword
    search() {

        // Check if keyword exists in query parameters
        let keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,  // Case-insensitive regex search
                $options: 'i' // 'i' flag for case insensitivity
            }
        } : {};

        // Update the query with the keyword filter
        this.query.find({ ...keyword })
        return this; // Return the APIFeatures object for method chaining
    }

    // Method to filter query based on query parameters
    filter() {

        // Create a copy of queryStr to manipulate without affecting the original
        const queryStrCopy = { ...this.queryStr };

        //removing fields from query
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(field => delete queryStrCopy[field]);

        // Convert the remaining queryStrCopy object to JSON string
        let queryStr = JSON.stringify(queryStrCopy);

        // Replace comparison operators (gt, gte, lt, lte) with MongoDB operators ($gt, $gte, $lt, $lte)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g, match => `$${match}`)

        // Update the query with the filtered criteria
        this.query.find(JSON.parse(queryStr));

        return this;  // Return the APIFeatures object for method chaining
    }

    paginate(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1; // Current page number from query parameters
        const skip = resPerPage * (currentPage - 1) // Number of documents to skip

        // Limit the number of results per page and skip to the appropriate page
        this.query.limit(resPerPage).skip(skip);
        return this; // Return the APIFeatures object for method chaining
    }
}

module.exports = APIFeatures; // Export the APIFeatures class to be used in other parts of the application