import { Box, Text } from "ink"
import React, { FunctionComponent } from "react"
import { StepResource } from "../../parser"
import { DefaultResource } from "./default-resource"
import { File } from "./file"
import { GatsbyPlugin } from "./gatsby-plugin"
import { NPMPackage } from "./npm-package"

interface Props {
    resource: StepResource
}

const components = {
    NPMPackage,
    GatsbyPlugin,
    File,
}

function getComponent(resource: StepResource): FunctionComponent<Props> {
    if (resource.name in components) {
        return components[resource.name]
    }
    return DefaultResource
}

export function ResourceBox({ resource }: Props) {
    const Component = getComponent(resource)
    return <Component resource={resource} />
}
