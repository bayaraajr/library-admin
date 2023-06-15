export default interface IUSer {
    lastname: string;
    firstname: string;
    email: string;
    phone?: string;
    gender: "F" | "M";
    [key: string]: any;
}
