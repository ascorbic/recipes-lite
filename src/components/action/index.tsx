import { Box, Text } from "ink"
import React, { FunctionComponent } from "react"
import { StepAction } from "../../parser"
import { DefaultAction } from "./default-action"
import { File } from "./file"
import { GatsbyPlugin } from "./gatsby-plugin"
import { NPMPackage } from "./npm-package"

interface Props {
    action: StepAction
}

const components = {
    NPMPackage,
    GatsbyPlugin,
    File,
}

function getComponent(action: StepAction): FunctionComponent<Props> {
    if (action.name in components) {
        return components[action.name]
    }
    return DefaultAction
}

export function ActionBox({ action }: Props) {
    const Component = getComponent(action)
    return <Component action={action} />
}
