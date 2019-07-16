import React, {Component} from 'react';
import './App.css';
import RecipeItem from './RecipeItem.js';
import AddItem from './AddItem.js';

const recipes = (localStorage.getItem('recipes')) ? JSON.parse(localStorage.getItem('recipes')) : [ ];

localStorage.setItem('recipes', JSON.stringify(recipes));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: JSON.parse(localStorage.getItem('recipes'))
    };

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }
  componentWillMount() {
    const recipes = this.getRecipes();

    this.setState({ recipes });
  }

  getRecipes() {
    return JSON.parse(localStorage.getItem('recipes'))
  }


  onDelete(name) {
    const recipes = this.getRecipes();

    const filteredRecipes = recipes.filter(recipe => {
      return recipe.name !== name;
    });

    this.setState({recipes: filteredRecipes})
  }

  onAdd(name, ingredients) {
    let recipes = this.getRecipes();

    recipes.push({
      name,
      ingredients
    });


    this.onSave(recipes)

  }

  onSave(recipes) {
    this.setState({ recipes });
    localStorage.setItem('recipes', JSON.stringify(recipes));

  }

  onEditSubmit(name, ingredients, originalName) {
    let recipes = this.getRecipes();

    recipes = recipes.map(recipe => {
      if (recipe.name === originalName) {
        recipe.name = name;
        recipe.ingredients = ingredients;
      }
      return recipe
    });

    this.onSave(recipes)

  }


  render() {
    return (<div className="App">
      <div className="Container">
        <h1>My Recipes</h1>
        <AddItem onAdd = {this.onAdd}
          />
        {
          this.state.recipes.map(recipe => {
            return (
              <RecipeItem
                key={recipe.name}
                {...recipe}
                onDelete = {this.onDelete}
                onEditSubmit = {this.onEditSubmit}
                onAdd = {this.onAdd}
                />);
          })
        }



      </div>
    </div>);
  }
}

export default App;
