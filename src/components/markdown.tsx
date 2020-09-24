import React, { PropsWithChildren } from "react"
import ReactMarkdown, { NodeType } from "react-markdown"
import { Text, Box, BoxProps, TextProps } from "ink"
import Link from "ink-link"
import hicat from "hicat"
import { onlyText } from "react-children-utilities"
import chalk from "chalk"

function Div(props: PropsWithChildren<BoxProps>) {
    return <Box flexDirection="column" marginBottom={1} {...props} />
}

const renderers = {
    inlineCode: ({ children }: TextProps) => (
        <Text color="green">{children}</Text>
    ),
    code: ({ code, language }: { code: string; language: string }) => {
        const { ansi } = hicat(code, { lang: language })

        const text = `\`\`\`${language}\n${ansi}\n\`\`\``

        return (
            <Div marginBottom={1}>
                <Text>{text}</Text>
            </Div>
        )
    },
    heading: ({ level, ...props }: TextProps & { level: number }) => {
        switch (level) {
            case 1:
                return (
                    <Box marginBottom={1}>
                        <Text bold underline {...props} />
                    </Box>
                )
            case 2:
                return <Text bold {...props} />

            case 3:
                return <Text bold italic {...props} />

            default:
                return <Text bold {...props} />
        }
    },

    link: ({
        href,
        children,
        ...props
    }: PropsWithChildren<{ href: string }>) => {
        return <Link url={href}>{children}</Link>
    },
    strong: (props: TextProps) => <Text bold {...props} />,
    emphasis: (props: TextProps) => <Text italic {...props} />,
    paragraph: ({ children }: TextProps) => (
        <Div>
            <Text>{children}</Text>
        </Div>
    ),
    text: ({ children }: TextProps) => (
        <>{onlyText(children).replace(/(\r\n|\n|\r)/gm, ` `)}</>
    ),
    list: (props: TextProps) => <Div marginBottom={1}>{props.children}</Div>,
    listItem: (props: TextProps) => <Text>* {props.children}</Text>,
}

export interface IProps {
    source: string
}

export function Markdown({ source }: PropsWithChildren<IProps>) {
    return (
        <ReactMarkdown
            renderers={renderers}
            source={source}
            // unwrapDisallowed={true}
            allowedTypes={Object.keys(renderers) as Array<NodeType>}
        />
    )
}
