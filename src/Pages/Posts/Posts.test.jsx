import { waitFor, render, screen } from "@testing-library/react";
import axios from "axios";
import Posts from "./Posts";

jest.mock("axios");

const dummyTodos = [
  {
    id: 1,
    attributes: {
      title: "What should I be doing as a backend Django developer?",
      duration: "6",
      content:
        "<p>I am working as a backend Django developer for the past year (10 months or so), and mostly specialize in using the django-rest-framework to provide api endpoints for the frontend. My HTML/CSS skills suck, while I'm an absolute newbie in Javascript.</p>",
      slug: "what-should-i-be-doing-as-a-backend-django-developer",
      description:
        "I think you should learn how the frontend works. You don't need to become a pro but don't ignore it either. Caching, channels (WebSockets) and frankly all web backend dev has an impact on the frontend and the experience of the user so you might as well know how that part works 😂",
      createdAt: "2022-11-07T12:21:33.635Z",
      updatedAt: "2022-11-07T12:22:12.322Z",
      publishedAt: "2022-11-07T12:22:12.305Z",
      locale: "fa-IR",
    },
  },
  {
    id: 2,
    attributes: {
      title: "HI Guys should I be doing as a backend Django developer?",
      duration: "7",
      content:
        "<p>I am working as a backend Django developer for the past year (10 months or so), and mostly specialize in using the django-rest-framework to provide api endpoints for the frontend. My HTML/CSS skills suck, while I'm an absolute newbie in Javascript.</p>",
      slug: "what-should-i-be-doing-as-a-backend-django-developer",
      description:
        "I think you should learn how the frontend works. You don't need to become a pro but don't ignore it either. Caching, channels (WebSockets) and frankly all web backend dev has an impact on the frontend and the experience of the user so you might as well know how that part works 😂",
      createdAt: "2022-11-07T12:21:33.635Z",
      updatedAt: "2022-11-07T12:22:12.322Z",
      publishedAt: "2022-11-07T12:22:12.305Z",
      locale: "fa-IR",
    },
  },
];

// axios.get.mockResolvedValue({ data: dummyTodos });

test("get posts and save to state", async () => {
  // axios.get.mockResolvedValue({ data: dummyTodos });
  render(<Posts />);

  const todoList = await waitFor(() => screen.findAllByTestId("post"));

  expect(todoList).toHaveLength(5);
});
