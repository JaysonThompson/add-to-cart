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

addBtnEl.addEventListener('click', () => {
  let inputValue = inputFieldEl.value
  push(shoppingListInDB, inputValue)
  clearInputFieldEl()
})

onValue(shoppingListInDB, snapshot => {
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

const clearInputFieldEl = () => inputFieldEl.value = ''

const clearShoppingListEl = () => shoppingListEl.innerHTML = ''


const appendItemToShoppingListEl = item => {
  let itemID = item[0]
  let itemValue = item[1]
  let newEl = document.createElement('li')

  newEl.addEventListener('click', () => {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
    remove(exactLocationOfItemInDB)
  })

  newEl.textContent = itemValue
  shoppingListEl.append(newEl)
}
