import { parse } from "json5"
import { Node, Parent } from "unist"
import unified from "unified"
import remarkMdx from "remark-mdx"
import remarkParse from "remark-parse"
import remarkStringify from "remark-stringify"

export const u = unified().use(remarkParse).use(remarkMdx).use(remarkStringify)

function hasChildren(node: Node | Parent): node is Parent {
    return "children" in node
}

export interface MdxAttribute extends Node {
    type: "mdxAttribute"
    name: string
    value: string | MdxValueExpression
}

export interface MdxValueExpression extends Node {
    type: "mdxValueExpression"
    value: string
}
export interface MdxBlockElement extends Node {
    type: "mdxBlockElement"
    name: string
    attributes: Array<MdxAttribute>
}

function extractAttributeValue(node: MdxAttribute): unknown {
    if (typeof node.value === "string") {
        return node.value
    }
    try {
        const value = parse(node.value.value)
        return value
    } catch (e) {
        return node.value.value
    }
}

export interface StepResource {
    name: string
    args: Record<string, unknown>
}

function parseResource(node: MdxBlockElement): StepResource {
    const args: Record<string, unknown> = {}
    node.attributes.forEach((attr) => {
        args[attr.name] = extractAttributeValue(attr)
    })
    return {
        name: node.name,
        args,
    }
}

export interface StepInfo {
    description: string
    resources: Array<StepResource>
}

function makeStepInfo(
    nodes: Array<Node>,
    resources: Array<MdxBlockElement>
): StepInfo {
    return {
        description: u.stringify({ type: "root", children: nodes }),
        resources: resources.map(parseResource),
    }
}

export function partitionSteps(ast: Node | Parent) {
    const steps: Array<StepInfo> = []
    if (!hasChildren(ast)) {
        return steps
    }

    let nodes: Array<Node> = []

    let resources: Array<MdxBlockElement> = []

    ast.children.forEach((node: Node) => {
        switch (node.type) {
            case "thematicBreak":
                steps.push(makeStepInfo(nodes, resources))
                nodes = []
                resources = []
                break

            case "mdxBlockElement":
                resources.push(node as MdxBlockElement)
                break

            default:
                nodes.push(node)
        }
    })
    if (nodes.length || resources.length) {
        steps.push(makeStepInfo(nodes, resources))
    }

    return steps
}
