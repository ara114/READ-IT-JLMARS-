export default (stories = [], action) => {
    switch(action.type) {
        case 'LIKE':
            return stories.map((story) => story.storyID === action.payload ? action.payload : story)
        case 'REVIEW':
            return stories.map((story) => story.storyID === action.payload ? action.payload : story)
        case 'REPORT':
            return stories.map((story) => story.storyID === action.payload ? action.payload : story)
        case 'UNREPORT':
            return stories.map((story) => story.storyID === action.payload ? action.payload : story)
        case 'DELETE':
            return stories.filter((story) => story.storyID !== action.payload);
        case 'FETCH_ALL':
            return action.payload;
        case 'FETCH_BY_SEARCH':
            return action.payload;    
        case 'CREATE':
            return [...stories, action.payload];
        default:
            return stories;
    }
}