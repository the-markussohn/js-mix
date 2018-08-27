/**
 * @todo Storage controller
 */

const ItemCtrl = (() => {

    const Item = () => {
        this._id = id;
        this._name = name;
        this._calories = calories;
    }

    const data = {
        items: [
            {id: 0, name: 'Steak Dinner', calories: 1200},
            {id: 1, name: 'Cookie', calories: 400},
            {id: 2, name: 'Eggs', calories: 300}
        ],
        currentItem: null,
        totalCalories: 0
    };

    return {
        getItems: () => {
            return data.items;
        },
        logData: () => {
            return data;
        }
    };

})();

const UICtrl = (() => {

    const UISelectors = {
        itemList: '#item-list'
    };

    return {
        populateItemList: (items) => {
            let html = '';
            items.forEach(item => {
                html += `
                    <li id="item-${item.id}" class="collection-item">
                        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                        <a href="#" class="secondary-content">
                            <i class="fa fa-pencil edit-item"></i>
                        </a>
                    </li>
                `;
            });
            document.querySelector(UISelectors.itemList).innerHTML = html;
        }
    };
    
})();

const App = ((ItemCtrl, UICtrl) => {
    
return {
    init: () => {
        const items = ItemCtrl.getItems();
        UICtrl.populateItemList(items);
    }
};

})(ItemCtrl, UICtrl);

App.init();