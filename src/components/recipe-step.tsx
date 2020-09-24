import { Box, Text } from "ink"
import React from "react"
import { StepInfo } from "../parser"
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
                        <Box
                            borderStyle="single"
                            flexDirection="column"
                            paddingX={1}
                            key={`${action.name}-${index}`}
                        >
                            <Box paddingBottom={1}>
                                <Text bold underline>
                                    {action.name}
                                </Text>
                            </Box>
                            {Object.entries(action.args).map(([key, value]) => (
                                <Box key={key}>
                                    <Text bold>{key}: </Text>
                                    <Box paddingLeft={1}>
                                        <Text wrap="truncate-end">{value}</Text>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    )
}
