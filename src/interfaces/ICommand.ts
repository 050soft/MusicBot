import Category from "../enums/Category";

export default interface ICommand {
    data: {
        name: string;
        description: string;
        help?: string;
    };
    cooldown?: number;
    category?: Category;
}