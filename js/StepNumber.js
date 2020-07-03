import Utils from "./Utils.js";

export default class StepNumber{
    elem;
    input;
    ids;
    step = 1;
 
    constructor() {

        this.elem = this.createElem();
    }

    createElem() {
        let div = Utils.ce("div", {
            width: "80px",
            height: "22px",
            position: "relative"
        });
        this.createBnList(div);
        this.cteateInput(div);
        return div;
    }
    createBnList(parent) {
        var leftBn = Utils.ce("div", {
            width: "15px",
            height: "20px",
            position: "absolute",
            textAlign: "center",
            userSelect: "none",
            border: "1px solid #CCCCCC"
        });
        var rightBn = leftBn.cloneNode(false);
        leftBn.style.left = "0px";
        rightBn.style.right = "0px";
        leftBn.textContent = "-";
        rightBn.textContent = "+";
        parent.appendChild(leftBn);
        parent.appendChild(rightBn);
        leftBn.addEventListener("click", e => this.clickHandler(e));
        rightBn.addEventListener("click", e => this.clickHandler(e));
    }
    cteateInput(parent) {
        this.input = Utils.ce("input", {
            width: "46px",
            height: "18px",
            position: "absolute",
            left: "17px",
            border: "none",
            textAlign: "center",
            borderTop: "1px solid #CCCCCC",
            borderBottom: "1px solid #CCCCCC"
        });
        this.input.value = "1";
        parent.appendChild(this.input);
        this.input.addEventListener("input", e => this.inputHandler(e));
    }
    appendTo(parent) {
        if (typeof parent === "string") {
            parent = document.querySelector(parent);
        }
        parent.appendChild(this.elem);
    }

    inputHandler(e) {
        this.input.value = this.input.value.replace(/\D/g, "");
        // 节流
        if (this.ids) return;
        this.ids = setTimeout(() => {
            clearTimeout(this.ids);
            this.ids = 0;
            this.setStep(this.input.value);
        }, 500);
    }

    clickHandler(e) {
        if (e.currentTarget.textContent === "-") {
            this.setStep(this.step - 1);
        } else {
            this.setStep(this.step + 1);
        }
    }

    setStep(value) {
        value = Number(value);
        if (value < 1) value = 1;
        if (value > 999) value = 999;
        this.step = value;
        this.input.value = this.step;
        var evt=new Event("step_change");
        evt.step=this.step;
        evt.elem=this.elem;
        document.dispatchEvent(evt);
    }
}