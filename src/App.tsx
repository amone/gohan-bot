import React, { useState } from 'react';
import { recipes } from './data/recipes';
import { Recipe } from './types/Recipe';
import './App.css';

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // すべてのタグを取得（重複を除去）
  const allTags = Array.from(new Set(recipes.flatMap(recipe => recipe.tags)));

  // タグボタンのクリック処理
  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // レシピのフィルタリング
  const filteredRecipes = recipes.filter(recipe => {
    // テキスト検索
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // タグフィルタリング
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => recipe.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>献立提案アプリ</h1>
        
        {/* タグボタン */}
        <div className="tag-buttons">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

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
              style={{
                backgroundImage: recipe.imageUrl ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${recipe.imageUrl})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
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
