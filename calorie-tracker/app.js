/**
 * @todo Storage controller
 */

const ItemCtrl = (() => {

    class Item {
        constructor(id, name, calories) {
            this._id = id;
            this._name = name;
            this._calories = calories;
        }
    }

    const data = {
        items: [
            { id: 0, name: 'Steak Dinner', calories: 1200 },
            { id: 1, name: 'Cookie', calories: 400 },
            { id: 2, name: 'Eggs', calories: 300 }
        ],
        currentItem: null,
        totalCalories: 0
    };

    return {
        getItems: () => {
            return data.items;
        },
        addItem: (name, calories) => {
            let ID;
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }
            calories = parseInt(calories);
            newItem = new Item(ID, name, calories);
            data.items.push(newItem);
            return newItem;
        },
        logData: () => {
            return data;
        }
    };

})();

const UICtrl = (() => {

    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'
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
        },
        getInputItem: () => {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            };
        },
        getSelectors: () => {
            return UISelectors;
        }
    };

})();

const App = ((ItemCtrl, UICtrl) => {

    const loadEventListeners = () => {
        const UISelectors = UICtrl.getSelectors();
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    }

    const itemAddSubmit = (e) => {
        const input = UICtrl.getInputItem();
        if (input.name !== '' && input.calories !== '') {
            const newItem = ItemCtrl.addItem(input.name, input.calories);
        }
        e.preventDefault();
    }

    return {
        init: () => {
            const items = ItemCtrl.getItems();
            UICtrl.populateItemList(items);
            loadEventListeners();
        }
    };

})(ItemCtrl, UICtrl);

App.init();