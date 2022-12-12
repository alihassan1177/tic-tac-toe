const boxes = document.querySelectorAll(".box")
const helper = document.querySelector(".helper")
const modal = document.querySelector(".modal")

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let playerOne = true

document.body.addEventListener("mousemove", (e)=>{
    helper.style.left = `${e.clientX}px`
    helper.style.top = `${e.clientY}px`
})

boxes.forEach(box => {
    box.addEventListener("click", ()=>{
        if (box.innerText != "") return 
        if (playerOne) {
            box.innerText = "X"
            box.classList.add("x")
        } else {
            box.innerText = "O"
            box.classList.add("o")
        }
        if(checkWin("x")){
            modal.innerText = "X won"
            modal.style.display = "block"
        }else if(checkWin("o")){
            modal.innerText = "O won"
            modal.style.display = "block"
        }else if (isDraw()) {    
            modal.innerText = "Game Draw"
            modal.style.display = "block"
        }
        playerOne = !playerOne
    })

    box.addEventListener("mouseover", (e)=>{
        helper.style.opacity  = "1"
        if (playerOne) {
            helper.innerText = "X"
        } else {
            helper.innerText = "O"
        }
    })

    box.addEventListener("mouseleave", ()=>{
        helper.style.opacity  = "0"
    })
})

function checkWin(player) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return boxes[index].classList.contains(player)
        })
    })
}

function isDraw() {
    return [...boxes].every(cell => {
      return cell.classList.contains("x") || cell.classList.contains("o")
    })
}