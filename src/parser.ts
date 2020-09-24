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

export interface StepAction {
    name: string
    args: Record<string, unknown>
}

function parseAction(node: MdxBlockElement): StepAction {
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
    actions: Array<StepAction>
}

function makeStepInfo(
    nodes: Array<Node>,
    actions: Array<MdxBlockElement>
): StepInfo {
    return {
        description: u.stringify({ type: "root", children: nodes }),
        actions: actions.map(parseAction),
    }
}

export function partitionSteps(ast: Node | Parent) {
    const steps: Array<StepInfo> = []
    if (!hasChildren(ast)) {
        return steps
    }

    let nodes: Array<Node> = []

    let actions: Array<MdxBlockElement> = []

    ast.children.forEach((node: Node) => {
        switch (node.type) {
            case "thematicBreak":
                steps.push(makeStepInfo(nodes, actions))
                nodes = []
                actions = []
                break

            case "mdxBlockElement":
                actions.push(node as MdxBlockElement)
                break

            default:
                nodes.push(node)
        }
    })
    if (nodes.length || actions.length) {
        steps.push(makeStepInfo(nodes, actions))
    }

    return steps
}
