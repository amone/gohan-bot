import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIRecipe } from '../types/Recipe';

// Gemini APIキー（環境変数から取得）
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || '';

// Gemini AIの初期化
const genAI = new GoogleGenerativeAI(API_KEY);

// レシピ提案のプロンプト
const RECIPE_SUGGESTION_PROMPT = `
あなたは料理の専門家です。以下の条件に基づいて、4人分のレシピ名を3つ提案してください。

条件：
- 材料や調理法に関するキーワード
- 子供が食べやすい料理
- 家庭で簡単に作れる料理
- 栄養バランスの良い料理

提案するレシピ名は以下の形式で返してください：
1. [レシピ名1]
2. [レシピ名2]
3. [レシピ名3]

各レシピ名は簡潔で分かりやすく、日本語で記述してください。
`;

// レシピ詳細生成のプロンプト
const RECIPE_DETAIL_PROMPT = `
あなたは料理の専門家です。以下のレシピ名について、4人分の詳細なレシピを作成してください。

レシピ名: {recipeName}

以下のJSON形式で返してください：
{
  "title": "レシピ名",
  "description": "レシピの簡単な説明",
  "ingredients": [
    "材料1",
    "材料2",
    "材料3"
  ],
  "instructions": [
    "手順1",
    "手順2",
    "手順3"
  ],
  "cookingTime": 調理時間（分）,
  "servings": 4,
  "tags": ["簡単", "子供が好き"]
}

注意：
- 材料は4人分の分量で記載
- 手順は具体的で分かりやすく
- 調理時間は実際の調理時間
- タグは適切なものを2-3個
`;

export const suggestRecipes = async (searchTerm: string): Promise<string[]> => {
  try {
    if (!API_KEY) {
      throw new Error('Gemini APIキーが設定されていません');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `${RECIPE_SUGGESTION_PROMPT}

検索キーワード: ${searchTerm}

上記のキーワードを参考に、3つのレシピ名を提案してください。`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // レスポンスからレシピ名を抽出
    const lines = text.split('\n').filter(line => line.trim());
    const recipes = lines
      .filter(line => /^\d+\./.test(line.trim()))
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(recipe => recipe.length > 0);

    return recipes.slice(0, 3); // 最大3つまで
  } catch (error) {
    console.error('レシピ提案エラー:', error);
    return [];
  }
};

export const generateRecipeDetail = async (recipeName: string): Promise<AIRecipe | null> => {
  try {
    if (!API_KEY) {
      throw new Error('Gemini APIキーが設定されていません');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = RECIPE_DETAIL_PROMPT.replace('{recipeName}', recipeName);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // JSONを抽出してパース
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('JSONレスポンスが見つかりません');
    }

    const recipeData = JSON.parse(jsonMatch[0]);
    
    return {
      ...recipeData,
      id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
      isAI: true
    };
  } catch (error) {
    console.error('レシピ詳細生成エラー:', error);
    return null;
  }
}; 