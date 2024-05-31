import { useState } from "react";
import { useFormStatus } from "react-dom";
import Button from "../Components/Button";

const PostFormButton = () => {
  // this will only work for parents components, so it should only be called in a child component that is passed on to parent components
  const { pending } = useFormStatus();

  return (
    <Button
      onClick={() => {}}
      classname={`${
        pending ? "opacity-60 cursor-wait" : "opacity-100 cursor-pointer"
      } text-white`}
      disabled={pending}>
      {pending ? "Submitting" : "Submit"}
    </Button>
  );
};

// this is for client only
const ActionsForm = () => {
  const [posts, setPosts] = useState<{ title: string; message: string }[]>([
    { title: "", message: "" },
  ]);
  const formAction = async (formData: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const newPost = {
      title: formData?.get("email")?.toString() ?? "",
      message: formData?.get("message")?.toString() ?? "",
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };
  return (
    <div className="text-black">
      <form
        action={formAction}
        className="h-auto w-auto flex flex-col items-center justify-center gap-5">
        <input type="email" name="email" placeholder="Enter email" />
        <input type="text" name="message" placeholder="Your message" />
        <PostFormButton />
      </form>
      <div>
        {posts &&
          posts.map((post, index) => {
            return (
              <div className="text-white my-5 " key={index}>
                <p>Title:{post.title}</p>
                <p>Message:{post.message}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ActionsForm;
