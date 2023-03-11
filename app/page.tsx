import Card from './Card';
import { Category, Post } from './types';
import { getPostCategoryNames } from './utils';

const url = `http://${process.env.HOST || 'localhost'}:${
  process.env.PORT ?? '3000'
}`;

const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${url}/api/posts`);

  return response.json();
};

const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${url}/api/categories`);

  return response.json();
};

export default async function Home() {
  const posts = await getPosts();
  const categories = await getCategories();

  const categoryNames = (categoryIds: number[]) =>
    getPostCategoryNames(categoryIds, categories);

  return (
    <div className="grid grid-rows-1">
      <div className="mb-4 flex flex-col items-center">
        <h1>From the blog</h1>
        <h4 className="max-w-xl text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          numquam tempora magnam.
        </h4>
      </div>
      <div className="grid w-full grid-cols-3 items-center justify-center gap-8">
        {posts.map((post) => (
          <Card
            {...post}
            key={post.id}
            categoryNames={categoryNames(post.categories)}
          />
        ))}
      </div>
    </div>
  );
}
