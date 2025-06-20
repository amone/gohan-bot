export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number;
  servings: number;
  imageUrl?: string;
  tags: string[];
}

export interface AIRecipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number;
  servings: number;
  imageUrl?: string;
  tags: string[];
  isAI: boolean;
} 