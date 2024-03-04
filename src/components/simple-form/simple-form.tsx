import useRenderCounter from "@/components/useRenderCount";
import { SubmitHandler, useForm } from "react-hook-form";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface IFormInput {
  firstName: string;
  lastName: string;
  gender: GenderEnum | undefined;
}

export default function SimpleForm() {
  const renderCounter = useRenderCounter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: undefined,
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <>
      <h1>Simple Form</h1>
      <p> Rendercount {renderCounter}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <input
          {...register("firstName", { required: "This is required" })}
          placeholder="First Name"
        />
        <p> {errors.firstName?.message} </p>
        <label>Last Name</label>
        <input
          {...register("lastName", {
            required: "This is required",
            minLength: { value: 4, message: "Min length is 4" },
          })}
          placeholder="Last Name"
        />
        <p> {errors.lastName?.message} </p>
        <label>Gender Selection</label>
        <select {...register("gender")}>
          <option value="" disabled selected hidden>
            Select a gender
          </option>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
        <button onClick={() => reset()} disabled={!isDirty || isSubmitting}>
          Reset
        </button>
        <input type="submit" />
      </form>
    </>
  );
}
