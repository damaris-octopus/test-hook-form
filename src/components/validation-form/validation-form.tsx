import useRenderCounter from "@/components/useRenderCount";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface IFormInput {
  firstName: string;
  lastName: string;
  gender: GenderEnum;
}

const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    gender: yup
      .mixed<GenderEnum>()
      .oneOf(Object.values(GenderEnum))
      .required("Gender is required"),
  })
  .required();

export default function ValidationForm() {
  const renderCounter = useRenderCounter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  console.log(watch("firstName"));

  return (
    <>
      <h1>Validation Form with Yup</h1>
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
        <p> {errors.gender?.message} </p>

        <button onClick={() => reset()} disabled={!isDirty || isSubmitting}>
          Reset
        </button>
        <input type="submit" />
      </form>
    </>
  );
}
