class Book {
    private _id : number;
    public get id() : number {
        return this._id;
    }
    public set id(v : number) {
        this._id = v;
    }
    
    private _title : string;
    public get title() : string {
        return this._title;
    }
    public set title(v : string) {
        this._title = v;
    }
    
    private _author : string;
    public get author() : string {
        return this._author;
    }
    public set author(v : string) {
        this._author = v;
    }
    
    private _isRead : boolean = false;
    public get isRead() : boolean {
        return this._isRead;
    }
    public set isRead(v : boolean) {
        this._isRead = v;
    }
}