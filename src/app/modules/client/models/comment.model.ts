export class CommentModel {
    id: string;
    updated_at: string;
    account:
        {
            id: string,
            name: string,
            avatar: string,
            email: string
        };
    content: string;
    parent: string;

    constructor(init?: Partial<CommentModel>) {
        Object.assign(this, init);
    }
  }
