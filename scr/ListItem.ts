export class ListItem {
    constructor(name: string, info: string, tags: string[]) {
        this._name = name;
        this._info = info;
        this._tags = tags;
    }

    get name(): string {
        return this._name;
    }

    get info(): string {
        return this._info;
    }

    get tags(): string[] {
        return this._tags;
    }

    private _name:string
    private _info: string
    private _tags: string[]
}