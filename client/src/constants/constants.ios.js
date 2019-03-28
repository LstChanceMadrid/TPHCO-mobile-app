const domain = 'http://localhost:5000'

export const URL = {
    // authentication
    LOGIN_URL: domain + '/login',
    REGISTER_URL: domain + '/register',
    FORGOT_PASSWORD_URL: domain + '/forgotPassword',
    RESET_PASSWORD_URL: domain + '/resetPassword/:token',

    // API
    NEWS_ARTICLES_URL: domain + '/api/newsArticles',

    //energy tech weekly
    ALT_STORY_URL: domain + '/altstory',
    ENERGY_TECH_WEEKLY_URL: domain + '/energyTechWeekly',
    ENERGY_TECH_WEEKLY__TITLES_URL: domain + '/energyTechWeeklyTitles',
    ADMIN_ENERGY_TECH_WEEKLY_URL: domain + '/admin/energyTechWeekly',
    ADMIN_ADD_ISSUE_URL: domain + '/admin/addIssue',

    // stocks
    ADD_STOCK_URL: domain + '/addStock',
    REMOVE_STOCK_URL: domain + '/removeStock',
    TICKERS_URL: domain + '/tickers',
    STORE_TICKERS_URL: domain + '/storeTickers',
    ADMIN_STOCKS_URL: domain + '/admin/stocks',
    ADMIN_ADD_STOCK_URL: domain + '/admin/addStock',
    ADMIN_REMOVE_STOCK_URL: domain + '/admin/removeStock',

    // timestamps
    TIMESTAMP_URL: domain + '/timestamp',
    ADMIN_TIMESTAMPS_URL: domain + '/admin/timestamps',

    // events
    EVENTS_URL: domain + '/events',
    ADMIN_TPH_EVENTS_URL: domain + '/admin/tPHEvents'
}

