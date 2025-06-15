import React, { useState } from 'react';
import { recipes } from './data/recipes';
import { Recipe } from './types/Recipe';
import './App.css';

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>献立提案アプリ</h1>
        <input
          type="text"
          placeholder="献立を検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </header>

      <main className="App-main">
        <div className="recipe-list">
          {filteredRecipes.map(recipe => (
            <div
              key={recipe.id}
              className="recipe-card"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
              <div className="recipe-tags">
                {recipe.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {selectedRecipe && (
          <div className="recipe-detail">
            <h2>{selectedRecipe.title}</h2>
            <p>{selectedRecipe.description}</p>
            
            <h3>材料（{selectedRecipe.servings}人分）</h3>
            <ul>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>

            <h3>作り方</h3>
            <ol>
              {selectedRecipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>

            <p>調理時間: {selectedRecipe.cookingTime}分</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
