module.exports = {
    TRANSACTIONS_BASE_URL: 'http://localhost:8080/transactions',
    CATEGORIES_BASE_URL: 'http://localhost:8080/categories',
    SUMMARY_BASE_URL: 'http://localhost:8080/summary',
    transaction: {
        RECENT: '/recent/',
        ADD_NEW_RECURRING: '/recurring',
        DELETE_BY_ID: '/deleteTransaction?id=',
        UPDATE:'/updateTransaction',
        UPDATE_RECURRING: '/updateTransaction/recurring',
    },
    category :{
        ADD_CATEGORY: '/addCategory',
        UPDATE_CATEGORY: '/updateCategory?id=',
        DELETE_CATEGORY: '/deleteCategory?id=',
        GET_CATEGORY_BY_ID: '/category?id='
    }
}