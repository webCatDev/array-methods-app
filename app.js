"use-strict";

class App {
  constructor() {
    this.selectEl = this.select(".select");
    this.codeEl = this.select(".code");
    this.descriptionEl = this.select(".description");
    this.resultEl = this.select(".result");
    this.runBtn = this.select(".run");
    this.boxContainer = this.select(".boxes");
    this.createBoxBtn = this.select(".create");
    this.charOptions = this.select(".optionbox");
    this.selectedChar = this.select(".selected-char");
    this.appInfoEl = this.select(".app-info");
    this.cat = {
      type: "cat",
      name: "Luna",
      age: 3,
    };

    this.panda = {
      type: "panda",
      name: "Zetsu",
      age: 5,
    };
    this.wolf = {
      type: "wolf",
      name: "Gaara",
      age: 10,
    };
    this.sheep = {
      type: "sheep",
      name: "Ginko",
      age: 2,
    };
    this.animalsHTML = [];
    this.animals = [];

    this.codeEl.value = `animals.push(${this.selectedChar.dataset.characterType})`;
    this.descriptionEl.textContent = `The push() method adds one or more elements to the end of an array and returns the new length of the array.`;

    this.runBtn.addEventListener("click", this.executeCode.bind(this));
    this.boxContainer.addEventListener("mouseover", this.showInfo.bind(this));
    this.boxContainer.addEventListener("mouseleave", this.hideModal.bind(this));
    this.appInfoEl.addEventListener("mouseover", this.showAppInfo.bind(this));
    this.appInfoEl.addEventListener("mouseleave", this.hideModal.bind(this));
    this.charOptions.addEventListener("click", this.selectCharacter.bind(this));

    this.selectEl.addEventListener(
      "change",
      this.onchangeHandlerSelect.bind(this)
    );
  }

  select(el) {
    return document.querySelector(el);
  }

  selectAll(el) {
    return Array.from(document.querySelectorAll(el));
  }

  getAllBoxes() {
    return Array.from(this.boxContainer.children);
  }

  hideModal() {
    const modal = this.select(".modal");
    modal.classList.remove("show");
  }

  showModal(info, index) {
    const modal = this.select(".modal");
    modal.classList.add("show");
    console.log(info);
    modal.innerHTML = "";
    modal.innerHTML = `<p>Index: ${index}</p><p style="white-space: pre-wrap">${JSON.stringify(
      info,
      null,
      " "
    )}</p>`;
  }

  showAppInfo() {
    const modal = this.select(".modal");
    modal.classList.add("show");

    modal.innerHTML = "";
    modal.innerHTML =
      "<p>This app is for practicing JavaScript array methods.</p> <p>You can add new name, age and other properties to cat,wolf,panda and sheep objects to give them new identity(e.g. cat.name = 'Pamuk';).</p><p>When you hover over array elements you can see information about them at right top.</p>";
  }

  showInfo(event) {
    const Target = event.target.closest(".target");
    if (!Target) return;
    const index = this.getAllBoxes().findIndex((box) => box === Target);
    this.showModal(this.animals[index], index);
  }

  selectCharacter(event) {
    const selected = event.target.closest(".optionbox--option");
    if (!selected) return;
    this.selectAll(".optionbox--option").forEach((el) =>
      el.classList.remove("selected-char")
    );
    selected.classList.add("selected-char");
    this.selectedChar = selected;
    this.onchangeHandlerSelect();
  }

  insertImage(parent, type = "") {
    const html = !type
      ? this.selectedChar.innerHTML
      : this.selectAll(".optionbox--option").find(
          (option) => option.dataset.characterType === type
        ).innerHTML;
    parent.insertAdjacentHTML("beforeend", html);
    parent.dataset.characterType = this.selectedChar.dataset.characterType;
  }

  generateNewBox(type) {
    const newBox = document.createElement("div");
    newBox.classList.add("box", "target");
    newBox.dataset.characterType = type;
    newBox.classList.add(type);
    this.insertImage(newBox, type);
    return newBox;
  }

  render() {
    console.log(this.animals);
    this.boxContainer.innerHTML = "";

    this.animalsHTML = this.animals.map((animal) => {
      if (animal.type === "cat") return this.generateNewBox("cat");
      if (animal.type === "wolf") return this.generateNewBox("wolf");
      if (animal.type === "panda") return this.generateNewBox("panda");
      if (animal.type === "sheep") return this.generateNewBox("sheep");
    });
    this.animalsHTML.forEach((box) => this.boxContainer.append(box));
  }

  onchangeHandlerSelect() {
    const selectedOption =
      this.selectEl.options[this.selectEl.selectedIndex].value;
    const type = this.selectedChar.dataset.characterType;
    switch (selectedOption) {
      case "push":
        this.codeEl.value = `animals.push(${type})`;
        this.descriptionEl.textContent = `The push() method adds one or more elements to the end of an array and returns the new length of the array.`;
        break;

      case "at":
        this.codeEl.value = "animals.at(-1)";
        this.descriptionEl.textContent = `The at() method takes an integer value and returns the item at that index, allowing for positive and negative integers. Negative integers count back from the last item in the array.`;
        break;

      case "concat":
        this.codeEl.value = "animals.concat([cat,wolf,panda,sheep])";
        this.descriptionEl.textContent = `The concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.`;
        break;

      case "copyWithin":
        this.codeEl.value = "animals.copyWithin(0,animals.length -1)";
        this.descriptionEl.textContent = `The copyWithin() method shallow copies part of an array to another location in the same array and returns it without modifying its length.`;
        break;

      case "entries":
        this.codeEl.value = "Array.from(animals.entries())";
        this.descriptionEl.textContent = `The entries() method returns a new Array Iterator object that contains the key/value pairs for each index in the array.`;
        break;

      case "fill":
        this.codeEl.value = "animals.fill(sheep,1)";
        this.descriptionEl.textContent = `The fill() method changes all elements in an array to a static value, from a start index (default 0) to an end index (default array.length). It returns the modified array.`;
        break;

      case "filter":
        this.codeEl.value = "animals.filter(animal => animal.name === 'Luna')";
        this.descriptionEl.textContent = `The filter() method creates a new array with all elements that pass the test implemented by the provided function.`;
        break;

      case "flat":
        this.codeEl.value = `const favouriteColors = 
        [ ["Luna likes purple"], 
        ["Gaara likes green"],
        ["Zetsu likes red"],
        ["Ginko likes blue"] ];
        
        favouriteColors.flat();
        `;
        this.descriptionEl.textContent = `The flat() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.`;
        break;

      case "flatMap":
        this.codeEl.value = `
const animalCount = [animals.length]
// Total food quantity
animalCount.flatMap(count => [count,count * 2])
        `;
        this.descriptionEl.textContent = `The flatMap() method returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level. It is identical to a map() followed by a flat() of depth 1, but slightly more efficient than calling those two methods separately.`;
        break;

      case "Arrayfrom":
        this.codeEl.value = "Array.from('Animals')";
        this.descriptionEl.textContent = `The Array.from() static method creates a new, shallow-copied Array instance from an array-like or iterable object.`;
        break;

      case "keys":
        this.codeEl.value = "Array.from(animals.keys())";
        this.descriptionEl.textContent = `The keys() method returns a new Array Iterator object that contains the keys for each index in the array.`;
        break;

      case "values":
        this.codeEl.value = "Array.from(animals.values())";
        this.descriptionEl.textContent = `The values() method returns a new array iterator object that contains the values for each index in the array.`;
        break;

      case "Arrayof":
        this.codeEl.value = "Array.of(cat,wolf)";
        this.descriptionEl.textContent = `The Array.of() method creates a new Array instance from a variable number of arguments, regardless of number or type of the arguments.

The difference between Array.of() and the Array constructor is in the handling of integer arguments: Array.of(7) creates an array with a single element, 7, whereas Array(7) creates an empty array with a length property of 7 (Note: this implies an array of 7 empty slots, not slots with actual undefined values).`;
        break;

      case "toString":
        this.codeEl.value = `
const friendsOfZetsu = ["Luna","Gaara","Ginko"];
friendsOfZetsu.toString();`;
        this.descriptionEl.textContent = `The toString() method returns a string representing the specified array and its elements.`;
        break;

      case "includes":
        this.codeEl.value = `
const favouriteFoodsOfLuna = ["Cheese", "Meat", "Peanut"];
favouriteFoodsOfLuna.includes("Grass");`;
        this.descriptionEl.textContent = `The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate.`;
        break;

      case "map":
        this.codeEl.value = `
const ages = [cat.age,wolf.age,panda.age,sheep.age]
// ages now - to see current ages comment out map method's line
ages.slice()
// 2 years later
ages.map(age => age + 2)`;
        this.descriptionEl.textContent = `The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.`;
        break;

      case "reduce":
        this.codeEl.value = `
const ages = [cat.age,wolf.age,panda.age,sheep.age]
// average age
ages.reduce((accumulator, age) => accumulator + age , 0) / ages.length`;
        this.descriptionEl.textContent = `The reduce() method executes a user-supplied "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.

The first time that the callback is run there is no "return value of the previous calculation". If supplied, an initial value may be used in its place. Otherwise the array element at index 0 is used as the initial value and iteration starts from the next element (index 1 instead of index 0).`;
        break;

      case "join":
        this.codeEl.value = `
const secretNumberOfGinko = ["2","5","9","0"];
secretNumberOfGinko.join("-");`;
        this.descriptionEl.textContent = `The join() method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.`;
        break;

      case "every":
        this.codeEl.value = "animals.every( animal => animal.age === 2)";
        this.descriptionEl.textContent = `The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.`;
        break;

      case "reverse":
        this.codeEl.value = "animals.reverse()";
        this.descriptionEl.textContent = `The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.`;
        break;

      case "shift":
        this.codeEl.value = "animals.shift()";
        this.descriptionEl.textContent = `The shift() method removes the first element from an array and returns that removed element. This method changes the length of the array.`;
        break;

      case "pop":
        this.codeEl.value = "animals.pop()";
        this.descriptionEl.textContent = `The pop() method removes the last element from an array and returns that element. This method changes the length of the array.`;
        break;

      case "unshift":
        this.codeEl.value = `animals.unshift(${type})`;
        this.descriptionEl.textContent = `The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.`;
        break;

      case "isArray":
        this.codeEl.value = "Array.isArray(animals)";
        this.descriptionEl.textContent = `The Array.isArray() method determines whether the passed value is an Array.`;
        break;

      case "length":
        this.codeEl.value = `animals.length`;
        this.descriptionEl.textContent = `The length property of an object which is an instance of type Array sets or returns the number of elements in that array.`;
        break;

      case "indexOf":
        this.codeEl.value = `const neighbours = ["Bird","Rat","Dog","Pig","Dog"];
neighbours.indexOf("Dog")`;
        this.descriptionEl.textContent = `The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.`;
        break;

      case "lastIndexOf":
        this.codeEl.value = `const neighbours = ["Bird","Rat","Dog","Pig","Dog"];
neighbours.indexOf("Dog")`;
        this.descriptionEl.textContent = `The lastIndexOf() method returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards.`;
        break;

      case "findIndex":
        this.codeEl.value = `animals.findIndex(animal => animal.name === "Luna")`;
        this.descriptionEl.textContent = `The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.`;
        break;

      case "find":
        this.codeEl.value = `animals.find(animal => animal.age === 2)`;
        this.descriptionEl.textContent = `The find() method returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.`;
        break;

      case "slice":
        this.codeEl.value = `animals.slice(3)`;
        this.descriptionEl.textContent = `The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.`;
        break;

      case "splice":
        this.codeEl.value = `animals.splice(3,1)`;
        this.descriptionEl.textContent = `The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.`;
        break;

      case "sort":
        this.codeEl.value = `animals.sort((a,b) => a.age - b.age)`;
        this.descriptionEl.textContent = `The sort() method sorts the elements of an array in place and returns the sorted array. The default sort order is ascending, built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.`;
        break;

      case "foreach":
        this.codeEl.value = `animals.forEach(animal => animals.push(animal))`;
        this.descriptionEl.textContent = `The forEach() method executes a provided function once for each array element.`;
        break;
    }
  }

  executeCode() {
    console.log("here");
    const userCode = this.codeEl.value.trim();
    const animals = this.animals;
    const cat = { ...this.cat };
    Object.defineProperty(cat, "type", {
      value: "cat",
      writable: false,
    });
    const panda = { ...this.panda };
    Object.defineProperty(panda, "type", {
      value: "panda",
      writable: false,
    });
    const wolf = { ...this.wolf };
    Object.defineProperty(wolf, "type", {
      value: "wolf",
      writable: false,
    });
    const sheep = { ...this.sheep };
    Object.defineProperty(sheep, "type", {
      value: "sheep",
      writable: false,
    });
    const result = eval(userCode);
    this.resultEl.textContent = JSON.stringify(result);
    this.render();
  }
}

const app = new App();

// cat: #A45CB9
// wolf: #02C39A
// panda: #D62828
// sheep: #35B4C9
