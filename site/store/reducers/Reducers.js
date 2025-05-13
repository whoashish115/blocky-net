import { ACTIONS } from '../actions/Actions'

const reducers = (state, action) => {
    switch (action.type) {
        case ACTIONS.THEME:
            return {
                ...state,
                theme: action.payload 
            };
        case ACTIONS.AUTH:
            return {
                ...state,
                auth: action.payload
            };
        case ACTIONS.NOTIFY:
            return {
                ...state,
                notify: action.payload
            };
        case ACTIONS.REPORT_BLOG:
            return {
                ...state,
                reportblog: {blog:action.payload}
            };
        case ACTIONS.REPORT_COMMENT:
            return {
                ...state,
                reportcomment: {comment:action.payload}
            };
        case ACTIONS.ADD_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case ACTIONS.ADD_USERS:
            return {
                ...state,
                users: action.payload
            };
        case ACTIONS.ADD_NAVIGATIONS:
            return {
                ...state,
                navigations: action.payload
            };
        case ACTIONS.ADD_NAVIGATION_CATEGORIES:
            return {
                ...state,
                navigationCategories: action.payload
            };
        case ACTIONS.ADD_BLOGS:
            return {
                ...state,
                blogs: action.payload
            };
        case ACTIONS.ADD_PAGES:
            return {
                ...state,
                pages: action.payload
            };
        default:
            return state;
    }
}

export default reducers