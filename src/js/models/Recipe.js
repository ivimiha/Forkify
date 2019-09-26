import axios from "axios";

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe(){
        const key = "fcd773eb744ccfeaba30a02650835ea6";
        try{
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients
        }catch(error){
            console.log(error)
            alert("Something went wrong :(")
        }
    }

    calcTime(){
        // Assuming that we need 15 min for each 3 ingredients
        const numIng = this.ingredients.length;
        const period = Math.ceil(numIng / 3);
        this.time = period * 15;
    }

    calcServings(){
        this.servings = 4;
    }
}