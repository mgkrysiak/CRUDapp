import React, {Component} from 'react';

class RecipeItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      showIngredients: false
    };

    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  onDelete() {
    const {onDelete, name} = this.props;

    onDelete(name);
  }

  onEdit() {
    this.setState({isEdit: true});
  }

  onEditSubmit(event) {
    event.preventDefault();

    this.props.onEditSubmit(this.nameInput.value, this.ingredientsInput.value, this.props.name);

    this.setState({ isEdit: false });
  }

  showIngredients = () => {
    this.setState({
      showIngredients: !this.state.showIngredients
    })
  }

  Ingredients() {
    const ingredients = this.props.ingredients.split(', ')

    return (
      <div>
        {ingredients.map(ingredient => (
          <div className="Ingredient" key={ingredient}>{ingredient}</div>
        ))}
      </div>
    );
  }

  render() {
    const {name, ingredients} = this.props;

    return (<div>
      {
        this.state.isEdit
          ? (<div>
            <form onSubmit={this.onEditSubmit}>
              <p>
                <label>Recipe</label>
              </p>
              <p>
                <input placeholder='Recipe Name' ref={nameInput => this.nameInput = nameInput} defaultValue={name}></input>
              </p>
              <p>
                <label>Ingredients</label>
              </p>
              <p>
                <input placeholder='Enter ingredients separated by commas' ref={ingredientsInput => this.ingredientsInput = ingredientsInput} defaultValue={ingredients}></input>
              </p>
              <button onClick={this.onEditSubmit}>Save</button>
            </form>
          </div>)
          : (<div>
            <span onClick={this.showIngredients}>{name}</span>
            <button onClick={this.onEdit}>Edit</button>
            <button onClick={this.onDelete}>Delete</button>
            {(this.state.showIngredients) ? this.Ingredients() : null}
          </div>)
      }
    </div>);
  }
}

export default RecipeItem;
