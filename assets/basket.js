let priceData = localStorage.getItem('Prices')
let itemData = localStorage.getItem('Items')
let priceArr = JSON.parse(priceData)
let itemArr = JSON.parse(itemData)

const PRL = document.getElementById('PRL')

let SUM = 0
let itemIndex=0
let sumation = document.createElement('tr')
let total = document.createElement('td')
total.innerText = 'Total: '
priceArr.map (element=>{

    let itemR = document.createElement('tr')
    itemR.classList.add('TR')
    let itemC1 = document.createElement('td')
    itemC1.innerHTML = `${itemArr[itemIndex]}`

    let itemC2 = document.createElement('td')
    itemC2.classList.add('prL')
    itemC2.innerHTML=`${element}$`

    itemR.append(itemC1)
    itemR.append(itemC2)
    PRL.append(itemR)

    itemIndex += 1

    SUM += Number(element)
})
let TotalP = document.createElement('td')
TotalP.innerHTML = `${SUM}$`

sumation.append(total)
sumation.append(TotalP)
PRL.append(sumation)