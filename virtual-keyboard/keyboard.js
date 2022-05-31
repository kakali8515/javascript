const keyboard = {

    elements: {
        main: null,
        keyContainer: null,
        keys: []
    },

    eventHandler: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capslock: false,
    },

    init() {

        //create element
        this.elements.main = document.createElement('div');
        this.elements.keyContainer = document.createElement('div');

        //set class

        this.elements.main.classList.add("keyboard", "keyboard--hidden")
        this.elements.keyContainer.classList.add("keyboard-keys")
        this.elements.keyContainer.appendChild(this._createKeys())

        this.elements.keys = this.elements.keyContainer.querySelectorAll(".keyboard-key")

        // add to DOM
        this.elements.main.appendChild(this.elements.keyContainer);
        document.body.appendChild(this.elements.main);

        document.querySelectorAll(".use-keyboard-input").forEach(element=>{
            element.addEventListener("focus",()=>{
                this.open(element.value,currentValue=>{
                    element.value=currentValue;
                });
            })
        })


    },

    _createKeys() {

        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        //creatr html icon
        const createHtmlIcon = (icon_name) => {
            return ` <i class="material-icons">${icon_name}</i>`;
        }

        keyLayout.forEach(key => {
            const keyElement = document.createElement('button');
            const lineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            keyElement.setAttribute('type', "button");
            keyElement.classList.add('keyboard-key');

            switch (key) {
                case "backspace":
                    keyElement.classList.add('keyboard-key-wide');
                    keyElement.innerHTML = createHtmlIcon("backspace");

                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });
                    break;

                case "caps":
                    keyElement.classList.add('keyboard-key-wide', 'keyboard-key-activale');
                    keyElement.innerHTML = createHtmlIcon("keyboard_capslock");

                    keyElement.addEventListener('click', () => {

                        this._toggleCapsLock("oninput");
                        keyElement.classList.toggle('keyboard-key-active', this.properties.capslock)
                    });
                    break;

                case "enter":
                    keyElement.classList.add('keyboard-key-wide');
                    keyElement.innerHTML = createHtmlIcon("keyboard_return");

                    keyElement.addEventListener('click', () => {
                        this.properties.value += "/n";
                        this._triggerEvent("oninput");
                    });
                    break;

                case "space":
                    keyElement.classList.add('keyboard-key-extra-wide');
                    keyElement.innerHTML = createHtmlIcon("space_bar");

                    keyElement.addEventListener('click', () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });
                    break;

                case "done":
                    keyElement.classList.add('keyboard-key-wide', 'keyboard-key-dark');
                    keyElement.innerHTML = createHtmlIcon("check_circle");

                    keyElement.addEventListener('click', () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });
                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener('click', () => {
                        this.properties.value += this.properties.capslock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });
                    break;
            }

            fragment.appendChild(keyElement);

            if (lineBreak) {
                fragment.appendChild(document.createElement('br'));
            }
        })

        return fragment;

    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandler[handlerName] == "function") {
            this.eventHandler[handlerName](this.properties.value)
        }
    },

    _toggleCapsLock() {
        this.properties.capslock = !this.properties.capslock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capslock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {

        this.properties.value = initialValue || "";
        this.eventHandler.oninput = oninput;
        this.eventHandler.onclose = onclose;
        this.elements.main.classList.remove('keyboard--hidden')

    },

    close() {
        this.properties.value = "";
        this.eventHandler.oninput = oninput;
        this.eventHandler.onclose = onclose;
        this.elements.main.classList.add('keyboard--hidden')
    }

};

window.addEventListener('DOMContentLoaded', function () {
    keyboard.init();
    // keyboard.open("dcode", function(currentValue){
    //     console.log(currentValue)
    // },function (currentValue) {
    //     console.log("keyboard close")
    // })
})