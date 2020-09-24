import fs from "fs-extra"
import path from "path"
import { useEffect, useState } from "react"
import { partitionSteps, StepInfo, u } from "./parser"

async function loadRecipe(name: string): Promise<StepInfo[]> {
    const data = await fs.readFile(
        path.join(__dirname, "..", `recipes/${name}.mdx`)
    )
    const ast = u.parse(data)
    return partitionSteps(ast)
}

export function useRecipe(name: string) {
    const [recipe, setRecipe] = useState<StepInfo[]>()

    useEffect(() => {
        loadRecipe(name).then((steps) => setRecipe(steps))
    }, [name])

    return recipe
}
