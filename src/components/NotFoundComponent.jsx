import notFoundImage from "../assets/notFound.svg";

export default function NotFoundComponent() {
  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={notFoundImage}
        alt="Not found image"
        className="w-[241px] h-[200px] object-contain"
      />
      <h1 className="mb-6 text-5xl font-semibold">There is nothing here</h1>
      <p className="text-lg">
        Create an invoice by clicking the New Invoice button and get started
      </p>
    </div>
  );
}
