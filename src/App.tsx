import React, { useState, useEffect } from 'react';
import { recipes } from './data/recipes';
import { Recipe } from './types/Recipe';
import { suggestRecipes } from './services/gemini';
import './App.css';

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  // デバッグ用：selectedRecipeの状態を確認
  useEffect(() => {
    console.log('selectedRecipe changed:', selectedRecipe);
  }, [selectedRecipe]);

  // すべてのタグを取得（重複を除去）
  const allTags = Array.from(new Set(recipes.flatMap(recipe => recipe.tags)));

  // タグをカテゴリ別に整理
  const categorizedTags = {
    cuisine: ['和食', '洋食'], // 料理ジャンル
    dishType: ['丼物', '麺類', 'パスタ'], // 料理タイプ
    difficulty: ['簡単'], // 難易度
    target: ['子供が好き'], // 対象
    season: ['夏に食べたい'], // 季節
    other: ['定番', '煮込み'] // その他
  };

  // カテゴリ順でタグを並べる
  const orderedTags = [
    ...categorizedTags.cuisine,
    ...categorizedTags.dishType,
    ...categorizedTags.difficulty,
    ...categorizedTags.target,
    ...categorizedTags.season,
    ...categorizedTags.other
  ].filter(tag => allTags.includes(tag));

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
    // タグフィルタリングのみ
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => recipe.tags.includes(tag));
    return matchesTags;
  });

  // レシピ提案機能
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    // APIキーの確認
    if (!process.env.REACT_APP_GEMINI_API_KEY) {
      alert('Gemini APIキーが設定されていません。\n\n設定方法：\n1. .envファイルを作成\n2. REACT_APP_GEMINI_API_KEY=your_api_key を追加\n3. アプリを再起動');
      return;
    }

    setIsLoadingSuggestions(true);
    try {
      const suggestions = await suggestRecipes(searchTerm);
      setSuggestedRecipes(suggestions);
    } catch (error) {
      console.error('レシピ提案エラー:', error);
      setSuggestedRecipes([]);
      alert('レシピ提案中にエラーが発生しました。APIキーを確認してください。');
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>献立提案アプリ</h1>
        
        {/* タグボタン */}
        <div className="tag-buttons">
          {/* 料理ジャンル */}
          <div className="tag-category">
            {orderedTags.filter(tag => categorizedTags.cuisine.includes(tag)).map(tag => (
              <button
                key={tag}
                className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          
          <div className="tag-separator">｜</div>
          
          {/* 料理タイプ */}
          <div className="tag-category">
            {orderedTags.filter(tag => categorizedTags.dishType.includes(tag)).map(tag => (
              <button
                key={tag}
                className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          
          <div className="tag-separator">｜</div>
          
          {/* 難易度・対象・季節・その他 */}
          <div className="tag-category">
            {orderedTags.filter(tag => 
              categorizedTags.difficulty.includes(tag) ||
              categorizedTags.target.includes(tag) ||
              categorizedTags.season.includes(tag) ||
              categorizedTags.other.includes(tag)
            ).map(tag => (
              <button
                key={tag}
                className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="献立を検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button" disabled={isLoadingSuggestions}>
            {isLoadingSuggestions ? '提案中...' : 'レシピ提案'}
          </button>
        </form>
      </header>

      <main className="App-main">
        {/* AI提案レシピセクション */}
        {suggestedRecipes.length > 0 && (
          <div className="ai-suggestions-section">
            <h2 className="section-title">AIが提案したレシピ</h2>
            <div className="ai-suggestions-grid">
              {suggestedRecipes.map((recipe, index) => (
                <div key={index} className="ai-suggestion-card">
                  <div className="ai-badge">AI提案</div>
                  <h3>{recipe}</h3>
                  <p className="ai-description">Gemini AIが提案したレシピです</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 事前登録レシピセクション */}
        <div className="registered-recipes-section">
          <h2 className="section-title">登録済みレシピ</h2>
          <div className={`recipe-list ${selectedRecipe ? 'hidden' : ''}`}>
            {filteredRecipes.map(recipe => (
              <div
                key={recipe.id}
                className="recipe-card"
                style={{
                  backgroundImage: recipe.imageUrl ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${recipe.imageUrl})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                onClick={() => {
                  console.log('Recipe clicked:', recipe.title);
                  setSelectedRecipe(recipe);
                }}
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
        </div>

        {selectedRecipe && (
          <div className="recipe-detail">
            <button 
              className="back-button"
              onClick={() => {
                console.log('Back button clicked');
                setSelectedRecipe(null);
              }}
            >
              ← レシピ一覧に戻る
            </button>
            
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