import { Box, Text } from "ink"
import React from "react"
import { StepInfo } from "../parser"
import { ActionBox } from "./action"
import { Markdown } from "./markdown"

interface Props {
    step: StepInfo
}

export function RecipeStep({ step }: Props) {
    return (
        <Box
            borderStyle="round"
            flexDirection="column"
            paddingX={2}
            paddingTop={1}
            flexBasis="100%"
        >
            <Markdown source={step.description} />
            {!!step.actions.length && (
                <Box flexDirection="column">
                    <Text bold underline>
                        Actions
                    </Text>
                    {step.actions.map((action, index) => (
                        <ActionBox
                            action={action}
                            key={`${action.name}-${index}`}
                        />
                    ))}
                </Box>
            )}
        </Box>
    )
}
