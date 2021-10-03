import CategoryModel from "./CategoryModel";

export default class ProductModel {
    public id: number
    public title: string
    public description: string
    public quantity: number
    public price: number
    public image: string
    public category: CategoryModel

    constructor(id: number, title: string, description: string, quantity: number, price: number, image: string, category: CategoryModel) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
        this.image = image;
        this.category = category;
    }
}