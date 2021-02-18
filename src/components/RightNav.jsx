import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const RightNav = ({ currentUser }) => {
  const [searchInput, setSearchInput] = useState();
  const [keywordPosts, setKeywordPosts] = useState();
  const [searchInputUser, setSearchInputUser] = useState();
  const [keywordUsers, setKeywordUsers] = useState();

  const fetchSearch = () => {
    fetch(
      `https://thp-strapi-social-network.herokuapp.com/posts?_sort=created_at:DESC&text_contains=${searchInput}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          console.log(response);
          setKeywordPosts(response);
        }
      });
  };

  const fetchUsers = () => {
    fetch(
      `https://thp-strapi-social-network.herokuapp.com/users?_sort=created_at:DESC&username_contains=${searchInputUser}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          console.log(response);
          setKeywordUsers(response);
        }
      });
  };

  useEffect(() => {
    if (searchInput && searchInput.length < 1) {
      setKeywordPosts([]);
    } else {
      fetchSearch();
    }
  }, [searchInput]);

  useEffect(() => {
    if (searchInputUser && currentUser) {
      fetchUsers();
      return;
    }
    setKeywordUsers([]);
  }, [searchInputUser]);

  return (
    <div className="RightNav ">
      <form>
        <div className="mb-5 mt-5">
          Looking for something?
          <input
            onChange={(event) => setSearchInput(event.target.value)}
            type="text"
          />
          <ul className="m-0 p-0">
            {keywordPosts &&
              keywordPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
          </ul>
        </div>
        {currentUser && (
          <div>
            Looking for someone?
            <input
              onChange={(event) => setSearchInputUser(event.target.value)}
              type="text"
            />
            <ul className="m-0 p-0">
              {keywordUsers &&
                keywordUsers.map((user) => (
                  <p>
                    <Link to={"/users/" + user.slug}>@{user.username}</Link>
                  </p>
                ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default RightNav;
