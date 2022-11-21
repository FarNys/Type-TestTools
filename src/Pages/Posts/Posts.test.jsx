import { waitFor, render, screen } from "@testing-library/react";
import Posts from "./Posts";

// axios.get.mockResolvedValue({ data: dummyTodos });
describe("Test Post & Functionality", () => {
  //CHECK THE POST PARENT (DIV) BE IN THE DOCUMENT
  test("Check Post Parent", () => {
    render(<Posts />);
    const postParent = screen.getByTestId("postParent");
    expect(postParent).toBeInTheDocument();
  });

  //CHECK THE POST PARENT HAVE CERTAIN CLASS NAME
  test("Check Post Parents CLASS NAME", () => {
    render(<Posts />);
    const postParent = screen.getByTestId("postParent");
    expect(postParent).toHaveClass("post-parent");
  });

  //CHECK LIST OF ITEM RENDERED AND HAS LENGTH
  test("Get posts and save to state", async () => {
    render(<Posts />);
    const todoList = await waitFor(() => screen.findAllByTestId("post"));
    expect(todoList).toHaveLength(5);
  });
});
