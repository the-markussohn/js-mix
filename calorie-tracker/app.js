/**
 * @todo Storage controller
 */

const ItemCtrl = (() => {

    class Item {
        constructor(id, name, calories) {
            this.id = id;
            this.name = name;
            this.calories = calories;
        }
    }

    const data = {
        items: [],
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
            const newItem = new Item(ID, name, calories);
            data.items.push(newItem);
            return newItem;
        },
        getTotalCalories: () => {
            let total = 0;
            data.items.forEach(item => {
                total += item.calories;
            });
            data.totalCalories = total;
            return data.totalCalories;
        },
        updateItem: (name, calories) => {
            calories = parseInt(calories);
            let found = null;
            data.items.forEach((item) => {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            return found;
        },
        getItemById: (id) => {
            let found = null;
            data.items.forEach(item => {
                if (item.id === id) {
                    found = item;
                }
            });
            return found;
        },
        setCurrentItem: (item) => {
            data.currentItem = item;
        },
        getCurrentItem: () => {
            return data.currentItem;
        },
        logData: () => {
            return data;
        }
    };

})();

const UICtrl = (() => {

    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
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
        addListItem: (item) => {
            document.querySelector(UISelectors.itemList).style.display = 'block';
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            li.innerHTML = `
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="fa fa-pencil edit-item"></i>
                </a>
            `;
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        updateListItem: (item) => {
            let listItems = document.querySelectorAll(UISelectors.listItems);
            listItems = Array.from(listItems);
            listItems.forEach((listItem) => {
                const itemID = listItem.getAttribute('id');
                if (itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="fa fa-pencil edit-item"></i>
                </a>
            `;
                }
            })
        },
        clearInput: () => {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        addItemToForm: () => {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        hideList: () => {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showCalories: (calories) => {
            document.querySelector(UISelectors.totalCalories).textContent = calories;
        },
        clearEditState: () => {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: () => {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
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
        document.addEventListener('keypress', (e) => {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
    };

    const itemUpdateSubmit = (e) => {
        const input = UICtrl.getInputItem();
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
        UICtrl.updateListItem(updatedItem);
        const totalCalories = ItemCtrl.getTotalCalories();
        UICtrl.showCalories(totalCalories);
        UICtrl.clearEditState();
        e.preventDefault();
    };

    const itemAddSubmit = (e) => {
        const input = UICtrl.getInputItem();
        if (input.name !== '' && input.calories !== '') {
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            UICtrl.addListItem(newItem);
            const totalCalories = ItemCtrl.getTotalCalories();
            UICtrl.showCalories(totalCalories);
            UICtrl.clearInput();
        }
        e.preventDefault();
    };

    const itemEditClick = (e) => {
        if (e.target.classList.contains('edit-item')) {
            const listId = e.target.parentNode.parentNode.id;
            const listIdArray = listId.split('-');
            const id = parseInt(listIdArray[1]);
            const itemToEdit = ItemCtrl.getItemById(id);
            ItemCtrl.setCurrentItem(itemToEdit);
            UICtrl.addItemToForm();
        }

        e.preventDefault();
    };

    return {
        init: () => {
            UICtrl.clearEditState();
            const items = ItemCtrl.getItems();
            if (items.length === 0) {
                UICtrl.hideList();
            } else {
                UICtrl.populateItemList(items);
            }
            const totalCalories = ItemCtrl.getTotalCalories();
            UICtrl.showCalories(totalCalories);
            loadEventListeners();
        }
    };

})(ItemCtrl, UICtrl);

App.init();