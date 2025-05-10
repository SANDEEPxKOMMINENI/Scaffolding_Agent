export const fileTemplates = {
  authProvider: `import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: any | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);

  const login = async (credentials: { email: string; password: string }) => {
    // Implement your login logic here
    setUser({ email: credentials.email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};`,

  postList: `import React from 'react';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  likes: number;
}

export const PostList: React.FC = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    // Fetch posts from your API
  }, []);

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <article key={post.id} className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-gray-600">{post.content}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-gray-500">By {post.author}</span>
            <button className="text-blue-500 hover:text-blue-600">
              Like ({post.likes})
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};`,

  productGrid: `import React from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const ProductGrid: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    // Fetch products from your API
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
          {product?.image && (
            <img 
              src={product.image} 
              alt={product?.name || 'Product'}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold">{product?.name}</h3>
            <p className="text-gray-600 mt-1">{product?.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold">\${product?.price}</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};`
};