import CATEGORY_MAPPING from "../../../User/CategoryServey/CATEGORY_MAPPING";

const toCategoryBookDataList = (readingLogs) => {
    const response = []
    for(let key in readingLogs) {
        let category = CATEGORY_MAPPING[key];
        let value = readingLogs[key]
        response.push({category : category, count : value})
    }
    return response
}

export default toCategoryBookDataList