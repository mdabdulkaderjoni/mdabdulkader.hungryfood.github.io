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
    let getName = input[0];

    if(input.length==0){
        swal("Nothing Found!", "Please Search Agian!", "info");
    }
    else if (input.length == 1) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${getName}`)
            .then(res => res.json())
            .then(data => displayItems(data))
    }
    else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
            .then(res => res.json())
            .then(data => displayItems(data))
            
    }


    let displayItems = items => {
        if(items.meals==null){
            swal("Invalid Item Name!", "Please Search Agian!", "info");

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

            //calling showInfo for info event 
                (()=>{
                    itemDiv.addEventListener('click', () => {
                        document.getElementById('mainDiv').style.display = 'none';
                        document.getElementById('subDiv').style.display = 'block';
                
                        const itemDiv = document.createElement('div');
                        itemDiv.className = 'itemInfo';
                        itemDiv.setAttribute("id", "itemInfo");
                        
                        let incredient=items.meals[item];
                        const itemInfo = `
                        
                        
                        <img src="${items.meals[item].strMealThumb}">
                        <h2>${incredient.strMeal}</h2>
                        <ul>
                        <li>${incredient.strMeasure1} ${incredient.strIngredient1}</li>
                        <li>${incredient.strMeasure2} ${incredient.strIngredient2}</li>
                        <li>${incredient.strMeasure3} ${incredient.strIngredient3}</li>
                        <li>${incredient.strMeasure4} ${incredient.strIngredient4}</li>
                        <li>${incredient.strMeasure5} ${incredient.strIngredient5}</li>
                        <li>${incredient.strMeasure6} ${incredient.strIngredient6}</li>
                        <ul>

                        
                      
                        `;
                        itemDiv.innerHTML = itemInfo;
                        subDiv.appendChild(itemDiv);
                
                
                
                    })
                })()
         
        }
    }
})





