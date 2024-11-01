// app/blog/[id]/page.js
const BlogPost = ({ params}:any) => {
    const { id } = params; 
  
    return (
      <div>
        <h1>Blog Post: {id}</h1>
        <p>This is the content of the blog post with ID: {id}</p>
      </div>
    );
  };
  
  export default BlogPost;
  