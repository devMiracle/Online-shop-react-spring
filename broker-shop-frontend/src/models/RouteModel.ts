import React from "react"

export default class RouteModel {
    public path: string
    public name: string
    public visible: boolean
    public Component: (() => JSX.Element) | React.ComponentType<Readonly<any>>
    constructor (path: string, name: string,visible: boolean, Component: (() => JSX.Element) | React.ComponentType<Readonly<any>>) {
        this.path = path
        this.name = name
        this.visible = visible
        this.Component = Component
    }
}