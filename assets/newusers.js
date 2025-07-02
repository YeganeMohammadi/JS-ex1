let usersInfo = localStorage.getItem('Users')
const main = document.getElementsByClassName('container')[0]
const usersRow = document.getElementById('users')
console.log(usersInfo)

let newUsers = JSON.parse(usersInfo)
let id =0
console.log(newUsers)
newUsers.forEach(element => {
    id++;
    let usersSec = document.createElement('section')
    usersSec.classList.add('col-md-4')

    let userSpanRow = document.createElement('section')
    userSpanRow.classList.add('row') 

    let userSpan = document.createElement('span')
    userSpan.classList.add('badge')
    userSpan.classList.add('bg-danger')
    userSpan.innerHTML=`New user ${id}:`

    userSpanRow.append(userSpan)

    let userInfoTable = document.createElement('table')
    userInfoTable.setAttribute('id','Table')
    let userInfoTbody = document.createElement('tbody')
    userInfoTbody.setAttribute('id','Tbody')
    userInfoTable.append(userInfoTbody)


    let nameTR =document.createElement('tr')
    let phoneTR =document.createElement('tr')
    let emailTR =document.createElement('tr')
    userInfoTbody.append(nameTR)
    userInfoTbody.append(phoneTR)
    userInfoTbody.append(emailTR)

    let nameTD1 =document.createElement('td')
    nameTD1.innerText='Username: '
    let nameTD2 =document.createElement('td')
    nameTD2.innerHTML=`${element.name}`
    nameTR.append(nameTD1)
    nameTR.append(nameTD2)

    let phoneTD1 =document.createElement('td')
    phoneTD1.innerText='Phonenumber: '
    let phoneTD2 =document.createElement('td')
    phoneTD2.innerHTML=`${element.phone}`
    phoneTR.append(phoneTD1)
    phoneTR.append(phoneTD2)




    let emailTD1 =document.createElement('td')
    emailTD1.innerText='Phonenumber: '
    let emailTD2 =document.createElement('td')
    emailTD2.innerHTML=`${element.email}`
    emailTR.append(emailTD1)
    emailTR.append(emailTD2)



    usersSec.append(userSpanRow)
    usersSec.append(userInfoTable)
    usersRow.append(usersSec)

});