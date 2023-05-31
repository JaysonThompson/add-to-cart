import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
  databaseURL: 'https://realtime-database-40718-default-rtdb.firebaseio.com/',
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, 'shoppingList')

const inputFieldEl = document.querySelector('#input-field')
const addBtnEl = document.querySelector('#add-button')
const shoppingListEl = document.querySelector('#shopping-list')

addBtnEl.addEventListener('click', function () {
  let inputValue = inputFieldEl.value
  push(shoppingListInDB, inputValue)
  clearInputFieldEl()
})

onValue(shoppingListInDB, function (snapshot) {
  // Challenge: Change the onValue code so that it uses snapshot.exists() to show items when there are items in the database and if there are not displays the text 'No items here... yet'.
  if (snapshot.exists()) {
    clearShoppingListEl()
    let arrayItem = Object.entries(snapshot.val())
    for (let i = 0; i < arrayItem.length; i++) {
      let currentItem = arrayItem[i]
      // let currentItemID = currentItem[0]
      // let currentItemValue = currentItem[1]
      appendItemToShoppingListEl(currentItem)
    }
  } else {
    shoppingListEl.innerHTML = `<p>No items here... yet</p>`
  }
})

function clearInputFieldEl() {
  inputFieldEl.value = ''
}

function clearShoppingListEl() {
  shoppingListEl.innerHTML = ''
}

function appendItemToShoppingListEl(item) {
  let itemID = item[0]
  let itemValue = item[1]
  let newEl = document.createElement('li')

  newEl.addEventListener('click', function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
    remove(exactLocationOfItemInDB)
  })

  newEl.textContent = itemValue
  shoppingListEl.append(newEl)
}
