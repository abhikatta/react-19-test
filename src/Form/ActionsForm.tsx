import { useFormStatus } from "react-dom";
import Button from "../Components/Button";
import { useDispatch } from "react-redux";
import { clearInputs, setInputs } from "../Redux/Input/Input";
import { AppDispatch } from "../Redux/store";

const Form = ({ formAction }: { formAction: (formData: FormData) => void }) => {
  return (
    <form
      action={formAction}
      className="h-auto w-auto flex flex-col items-center justify-center gap-5">
      <input
        className="border-none outline-none px-4 py-2 bg-slate-100 text-black rounded-md"
        type="text"
        name="topText"
        placeholder="Enter Top text"
      />
      <input
        className="border-none outline-none px-4 py-2 bg-slate-100 text-black rounded-md"
        type="text"
        name="bottomText"
        placeholder="Enter Bottom text"
      />
      <div>
        <PostFormButton />
        <Button onClick={clearInputs}>Clear</Button>
      </div>
    </form>
  );
};
const PostFormButton = () => {
  // this will only work for parents components, so it should only be called in a child component that is passed on to parent components
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      classname={`${
        pending ? "opacity-60 cursor-wait" : "opacity-100 cursor-pointer"
      }`}
      disabled={pending}>
      {pending ? "Submitting" : "Submit"}
    </Button>
  );
};

// this is for client only
const ActionsForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formAction = (formData: FormData) => {
    const memeTexts = {
      topText: formData?.get("topText")?.toString() ?? "",
      bottomText: formData?.get("bottomText")?.toString() ?? "",
    };
    dispatch(setInputs(memeTexts));
  };

  return (
    <div>
      <Form formAction={formAction} />
    </div>
  );
};

export default ActionsForm;
