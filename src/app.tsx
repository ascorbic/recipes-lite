import React, { useState } from "react"
import { Text, useApp, useInput, Box } from "ink"
import { useRecipe } from "./use-recipe"
import { RecipeStep } from "./components/recipe-step"

export function App() {
    const recipe = useRecipe("wordpress")

    const [currentStep, setCurrentStep] = useState(0)

    const { exit } = useApp()

    const hasNext = recipe && currentStep + 1 < recipe.length

    useInput((_, key) => {
        if (!key.return || !recipe.length) {
            return
        }
        if (hasNext) {
            setCurrentStep((step) => step + 1)
        } else {
            exit()
        }
    })

    return (
        <>
            <Box justifyContent="center">
                <Text>
                    <Text color="green">Recipe</Text>
                </Text>
            </Box>

            {recipe ? (
                <RecipeStep step={recipe[currentStep]} />
            ) : (
                <Text>Loading</Text>
            )}

            {hasNext ? (
                <Text backgroundColor="red">Next</Text>
            ) : (
                <Text backgroundColor="red">Done</Text>
            )}
        </>
    )
}
