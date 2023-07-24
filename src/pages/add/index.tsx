import Head from "next/head";
import { useForm, Controller, get } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

interface Address {
  city: string;
  street: string;
  alley: string;
}

interface FormData {
  name: string;
  phone: string;
  age: string;
  email: string;
  address: Address;
}

export default function Home() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post("/api/users", data);
      console.log(res);
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Beautiful Form</h1>
        <form
          className="bg-white shadow-md rounded px-4 sm:px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <input
                  type="text"
                  id="name"
                  {...field}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    get(errors, "name") ? "border-red-500" : ""
                  }`}
                />
              )}
            />
            {get(errors, "name") && (
              <p className="text-red-500 text-xs italic">
                {get(errors, "name")?.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Age:
            </label>
            <Controller
              name="age"
              control={control}
              defaultValue=""
              rules={{
                required: "Age is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter a valid age",
                },
              }}
              render={({ field }) => (
                <input
                  type="text"
                  id="age"
                  {...field}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    get(errors, "age") ? "border-red-500" : ""
                  }`}
                />
              )}
            />
            {get(errors, "age") && (
              <p className="text-red-500 text-xs italic">
                {get(errors, "age")?.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone:
            </label>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              rules={{ required: "Phone is required" }}
              render={({ field }) => (
                <input
                  type="tel"
                  id="phone"
                  {...field}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    get(errors, "phone") ? "border-red-500" : ""
                  }`}
                />
              )}
            />
            {get(errors, "phone") && (
              <p className="text-red-500 text-xs italic">
                {get(errors, "phone")?.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              }}
              render={({ field }) => (
                <input
                  type="email"
                  id="email"
                  {...field}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    get(errors, "email") ? "border-red-500" : ""
                  }`}
                />
              )}
            />
            {get(errors, "email") && (
              <p className="text-red-500 text-xs italic">
                {get(errors, "email")?.message}
              </p>
            )}
          </div>

          <div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="city"
              >
                City:
              </label>
              <Controller
                name="address.city"
                control={control}
                defaultValue=""
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <input
                    type="text"
                    id="city"
                    {...field}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      get(errors, "address.city") ? "border-red-500" : ""
                    }`}
                  />
                )}
              />
              {get(errors, "address.city") && (
                <p className="text-red-500 text-xs italic">
                  {get(errors, "address.city")?.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="street"
              >
                Street:
              </label>
              <Controller
                name="address.street"
                control={control}
                defaultValue=""
                rules={{ required: "Street is required" }}
                render={({ field }) => (
                  <input
                    type="text"
                    id="street"
                    {...field}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      get(errors, "address.street") ? "border-red-500" : ""
                    }`}
                  />
                )}
              />
              {get(errors, "address.street") && (
                <p className="text-red-500 text-xs italic">
                  {get(errors, "address.street")?.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="alley"
              >
                Alley:
              </label>
              <Controller
                name="address.alley"
                control={control}
                defaultValue=""
                rules={{ required: "Alley is required" }}
                render={({ field }) => (
                  <input
                    type="text"
                    id="alley"
                    {...field}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      get(errors, "address.alley") ? "border-red-500" : ""
                    }`}
                  />
                )}
              />
              {get(errors, "address.alley") && (
                <p className="text-red-500 text-xs italic">
                  {get(errors, "address.alley")?.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
