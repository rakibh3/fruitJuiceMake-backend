/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../error/AppError'
import { Recipe } from '../modules/Recipe/recipe.model'
import { ClientSession } from 'mongoose'

// Utility function to fetch recipe details
export const getRecipeDetails = async (
  recipeId: string,
  session?: ClientSession,
): Promise<any> => {
  const query = session
    ? Recipe.findById(recipeId).session(session)
    : Recipe.findById(recipeId)

  const recipeDetails = await query
  if (!recipeDetails) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found')
  }
  return recipeDetails
}
