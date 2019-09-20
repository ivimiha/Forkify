//https://www.food2fork.com/api/search
//fcd773eb744ccfeaba30a02650835ea6
import axios from "axios";

async function getResults(query) {
    const key = "fcd773eb744ccfeaba30a02650835ea6";
    try {
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`);
        const recipes = res.data.recipes;
        console.log(recipes);
    } catch (error) {
        alert(error);
    }
    
}

getResults("tomato pasta");