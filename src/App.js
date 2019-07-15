import React, {Component} from 'react';
import './App.css';
import RecipeItem from './RecipeItem.js'
import AddItem from './AddItem.js'

const recipes = [
  {
    name: 'Spaghetti',
    ingredients: 'pasta, tomatoes, meatballs'
  }, {
    name: 'Porridge',
    ingredients: 'oatflakes, milk, fruits'
  }
];

localStorage.setItem('recipes', JSON.stringify(recipes));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: JSON.parse(localStorage.getItem('recipes'))
    };

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }
  componentWillMount() {
    const recipes = this.getRecipes();

    this.setState({recipes});
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
    const recipes = this.getRecipes();

    recipes.push({
      name,
      ingredients
    });

    this.setState({ recipes });
  }

  onEditSubmit(name, ingredients, originalName) {
    let recipes = this.getRecipes();

    recipes = recipes.map(recipe => {
      if (recipe.name === originalName) {
        recipe.name = name;
        recipe.inredients = ingredients;
      }
      return recipe;
    });

    this.setState({ recipes })
  }


  render() {
    return (<div className="App">
      <div className="Container">
        <h1>My Recipes</h1>
        {
          this.state.recipes.map(recipe => {
            return (
              <AddItem
                onAdd = {this.onAdd}
                />,
              <RecipeItem
                key={recipe.name}
                {...recipe}
                onDelete = {this.onDelete}
                onEditSubmit = {this.onEditSubmit}
                />);
          })
        }
        <button onClick={() => this.onAdd}>Add Recipe</button>


      </div>
    </div>);
  }
}

export default App;
