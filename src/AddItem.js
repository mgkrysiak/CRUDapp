import React,  {Component}  from 'react';

class AddItem extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

   this.props.onAdd(this.nameInput.value, this.ingredientsInput.value);
  }

  render() {

    return(
            <div>
              <h3>Add Recipe</h3>
              <form onSubmit = {this.onSubmit}>
                <p>
                  <label>Recipe</label>
                </p>
                <p>
                  <input placeholder='Recipe Name' ref={nameInput => this.nameInput = nameInput}></input>
                </p>
                <p>
                  <label>Ingredients</label>
                </p>
                <p>
                  <input placeholder='Enter ingredients separated by commas' ref={ingredientsInput => this.ingredientsInput = ingredientsInput}></input>
                </p>
                <button>Add</button>
              </form>
            </div>
          )
      }

  }

export default AddItem;
