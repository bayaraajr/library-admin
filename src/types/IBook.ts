export default interface IUSer {
    isbn: string;
    name: string;
    author: string;
    publicationDate: Date;
    coverUrl: String;
    description: String;
    filePath: String;
    //category: String;
    [key: string]: any;
}
