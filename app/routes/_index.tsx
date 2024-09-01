import { redirect, type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "GPU Monitor" },
    { name: "description", content: "Monitor GPU usage in real-time" },
  ];
};

export const loader = async () => {
  return redirect("/dashboard");
};
