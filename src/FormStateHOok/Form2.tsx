import { useFormState } from "react-dom";
import Button from "../Components/Button";

const Form2 = ({
  itemId,
  itemTitle,
}: {
  itemId: number;
  itemTitle: string;
}) => {
  // takes in a function and an initial state
  const addToCart = (prevState, queryData: FormData) => {
    const itemId = queryData.get("itemId")?.toString();
    if (itemId === "1") {
      return "Added to cart";
    } else {
      return "Could not add to cart. Item is not available.";
    }
  };
  const [message, formAction] = useFormState(addToCart, null);
  return (
    <div>
      <form action={formAction}>
        <h2>{itemTitle}</h2>
        <input type="hidden" name="itemId" value={itemId}></input>
        <Button type="submit">Add to cart</Button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default Form2;
