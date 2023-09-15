import { useFetch } from "../hooks/useFetch";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Blog = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   // http://localhost:3000/blog?nombre=juan
  //   setSearchParams({ filter: "ignacio" });
  //   // setSearchParams({ nombre: "juan" });
  // }, [searchParams]);

  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error...</p>;

  const handleChange = (e) => {
    let filter = e.target.value;
    if (filter) {
      setSearchParams({ filter });
    } else {
      setSearchParams({});
    }
  };
  return (
    <>
      <h1>Blog</h1>
      <input
        type=""
        className="form-control my-3"
        name=""
        onChange={handleChange}
        value={searchParams.get("filter") || ""}
      />
      <ul className="list-group">
        {data
          .filter((item) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = item.title.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((item) => (
            <Link
              className="list-group-item"
              to={`/blog/${item.id}`}
              key={item.id}
            >
              {item.id} - {item.title}
            </Link>
          ))}
      </ul>
    </>
  );
};

export default Blog;
