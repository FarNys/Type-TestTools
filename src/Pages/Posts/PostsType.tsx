export type PostsType = [{ id: number; attributes: AttributeType }] | [];
export type AttributeType = {
  title: string;
  duration: string;
  content: string;
  slug: string;
  createdAt: string;
  publishedAt: string;
  locale: string;
};
