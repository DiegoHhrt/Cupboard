const filterItems = (list, filters) => {
    let filteredList = list;
    if (filters.includes('all')) {
        return filteredList;
    }
    else{
        filters.forEach(filter => {
            filteredList = filteredList.filter(item => item.category.includes(filter));
        });
        return filteredList;
    }
};

module.exports = {
    filterItems
}