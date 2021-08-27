export default class CartItemModelCustom {
    private _productId: number | undefined
    private _weight: number
    private _filling: string
    private _sculpture: boolean
    private _title: string | null | undefined
    private _description: string | null
    private _price: number | undefined
    private _quantity: number | undefined

    constructor(productId: number | undefined, weight: number, filling: string, sculpture: boolean, title: string | null | undefined, description: string | null, price: number | undefined, quantity: number | undefined) {
        this._productId = productId;
        this._weight = weight;
        this._filling = filling;
        this._sculpture = sculpture;
        this._title = title;
        this._description = description;
        this._price = price;
        this._quantity = quantity;
    }

    get productId(): number | undefined {
        return this._productId;
    }

    set productId(value: number | undefined) {
        this._productId = value;
    }

    get weight(): number{
        return this._weight;
    }

    set weight(value: number) {
        this._weight = value;
    }

    get filling(): string {
        return this._filling;
    }

    set filling(value: string) {
        this._filling = value;
    }

    get sculpture(): boolean {
        return this._sculpture;
    }

    set sculpture(value: boolean) {
        this._sculpture = value;
    }

    get title(): string | null | undefined {
        return this._title;
    }

    set title(value: string | null | undefined) {
        this._title = value;
    }

    get description(): string | null {
        return this._description;
    }

    set description(value: string | null) {
        this._description = value;
    }

    get price(): number | undefined{
        return this._price;
    }

    set price(value: number | undefined) {
        this._price = value;
    }

    get quantity(): number | undefined {
        return this._quantity;
    }

    set quantity(value: number | undefined) {
        this._quantity = value;
    }
}


