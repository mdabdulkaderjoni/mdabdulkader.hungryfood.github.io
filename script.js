 const reSetAll=()=> {
    document.getElementById('mainDiv').style.display = 'grid';
    document.getElementById('mainDiv').innerHTML = "";
    document.getElementById('subDiv').style.display = 'none';
}

//search-button event listener
const submit = document.getElementById('submit-btn');
submit.addEventListener('click', () => {
    //this function will reset everything after search clicked
    reSetAll(); 

    let input = document.getElementById('getName').value;

    if(input.length==0){
        swal("Empty Input!", "Please Search Agian!", "info");
    }
    else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
            .then(res => res.json())
            .then(data => displayItems(data))
            
    }
    //displayItems function to display items list
    let displayItems = items => {
        if(items.meals==null){
            swal("Item Not Available!", "Please Search Something Else!", "info");

        }
        const mainDiv = document.getElementById('mainDiv');

        for (let item in items.meals) {

            const itemDiv = document.createElement('div');
            itemDiv.className = 'itemDiv';
            itemDiv.setAttribute("id", "itemDiv");

            const itemInfo = `
                <h3>${items.meals[item].strMeal}</h3>
                <img src="${items.meals[item].strMealThumb}">
                `;
            itemDiv.innerHTML = itemInfo;
            mainDiv.appendChild(itemDiv);

            //calling IIFE function to showInfo for info event 
                (()=>{
                    itemDiv.addEventListener('click', () => {
                        document.getElementById('mainDiv').style.display = 'none';
                        document.getElementById('subDiv').style.display = 'block';
                
                        const itemDiv = document.createElement('div');
                        itemDiv.className = 'itemInfo';
                        itemDiv.setAttribute("id", "itemInfo");
                        
                        let incredient=items.meals[item];
                        let icon=`<i class="fa fa-check-circle" aria-hidden="true"></i>`
                        const itemInfo = `
 
                        <img src="${items.meals[item].strMealThumb}">
                        <h2>${incredient.strMeal}</h2>
                        <h4>Incredients</h4>
                        <ul>
                        <li>${icon}  ${incredient.strMeasure1} ${incredient.strIngredient1}</li>
                        <li>${icon}  ${incredient.strMeasure2} ${incredient.strIngredient2}</li>
                        <li>${icon}  ${incredient.strMeasure3} ${incredient.strIngredient3}</li>
                        <li>${icon}  ${incredient.strMeasure4} ${incredient.strIngredient4}</li>
                        <li>${icon}  ${incredient.strMeasure5} ${incredient.strIngredient5}</li>
                        <li>${icon}  ${incredient.strMeasure6} ${incredient.strIngredient6}</li>
                        <ul>
 
                        `;
                        itemDiv.innerHTML = itemInfo;
                        subDiv.appendChild(itemDiv);
                
                    })
                })()
         
        }
    }
})

//event listener for back button
const backBtn=document.getElementById('back-btn');

backBtn.addEventListener('click',()=>{
    document.getElementById('subDiv').style.display='none';
    document.getElementById('mainDiv').style.display='grid';
})







