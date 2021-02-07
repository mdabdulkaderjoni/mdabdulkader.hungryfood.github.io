
const submit = document.getElementById('submit-btn');
submit.addEventListener('click',()=>{
    document.getElementById('mainDiv').style.visibility='visible';
    document.getElementById('mainDiv').innerHTML="";
    document.getElementById('subDiv').style.display='none';
    
   

    let input = document.getElementById('getName').value;
    let getName = input[0];
 
    if (input.length == 1) {
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
        const mainDiv = document.getElementById('mainDiv');

        for (let item in items.meals) {
            //console.log(items.meals[item].strMeal)

            const itemDiv = document.createElement('div');
            itemDiv.className = 'itemDiv';
            itemDiv.setAttribute("id", "itemDiv");


            const itemInfo = `
                <h3>${items.meals[item].strMeal}</h3>
                <img src="${items.meals[item].strMealThumb}">
                `;
            itemDiv.innerHTML = itemInfo;
            mainDiv.appendChild(itemDiv);

            //another event
            itemDiv.addEventListener('click',()=>{
                document.getElementById('mainDiv').style.visibility='hidden';
                document.getElementById('subDiv').style.display='block';

                const itemDiv = document.createElement('div');
            itemDiv.className = 'itemInfo';
            itemDiv.setAttribute("id", "itemInfo");


            const itemInfo = `
                
                <img src="${items.meals[item].strMealThumb}">
                <h3>Item Name: ${items.meals[item].strMeal}</h3>
                <p>Category: ${items.meals[item].strCategory}</p>
                <p>Area: ${items.meals[item].strArea}</p>
                `;
            itemDiv.innerHTML = itemInfo;
            subDiv.appendChild(itemDiv);



            })

        }

    }

    
})


    
    
