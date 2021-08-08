import CategoryModel from "./CategoryModel";

export default class ProductModelCustom {
    public id: number
    public title: string
    public description: string
    public quantity: number
    public price: number
    public category: CategoryModel
    public image: string
    constructor(id: number, title: string, description: string, quantity: number, price: number, category: CategoryModel, image: string) {
        this.id = id
        this.title = title
        this.description = description
        this.quantity = quantity
        this.price = price
        this.category = category
        this.image = image
    }
}